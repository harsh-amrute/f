import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import {type MDMStore, type Option, type Master, type Tab, type Filter} from '../../../VectorFlow/types/MDM';   
import { ColDef } from 'ag-grid-enterprise';

const initialState:MDMStore = {
    options:[],
    selectedOptions:[],
    selectedMasters:[],
    tabs:[],
    activeMaster:{id:0,name:'',fields:[]},
    filters:[],
    colDefs:[]
}

export const mdmSlice = createSlice({
    name: 'mdm',
    initialState,
    reducers: {
      setOptions: (state,action: PayloadAction<Array<Option>>) => {
        if(state.options.length === 0) state.options.push(...action.payload);
      },
      setSelectedOptions: (state,action: PayloadAction<Array<Option>>) => {
        state.selectedOptions = action.payload;
      },
      setSelectedMasters: (state,action: PayloadAction<Array<Master>>) => {
        state.selectedMasters = action.payload;
      },
      setTabs: (state,action: PayloadAction<Array<Tab>>) => {
        state.tabs = action.payload;
      },
      setActiveMaster: (state,action: PayloadAction<Master>) => {
        state.activeMaster = action.payload;
      },
      setFilters: (state,action: PayloadAction<Array<Filter>>) => {
        state.filters = action.payload;
      },
      setColDefs:(state,action:PayloadAction<Array<ColDef>>)=>{
        state.colDefs = action.payload;
      },
      resetState:(state) => {
        state.options=[];
        state.selectedOptions=[];
        state.selectedMasters=[];
        state.tabs=[];
        state.activeMaster={id:0,name:'',fields:[]};
        state.filters=[];
        state.colDefs=[]
      }
      
    },
  })

  export const { 
    setOptions,
    setSelectedOptions,
    setSelectedMasters,
    setTabs,
    setActiveMaster,
    setFilters,
    setColDefs,
    resetState
} = mdmSlice.actions;

  export default mdmSlice.reducer;