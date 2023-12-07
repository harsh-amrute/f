import type { PayloadAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit';
import {type Option, type MDMMasterState, type MDMStore, type Filter} from '../../../VectorFlow/types/MDM'; 
import { generateRandomId } from '../../../helpers/utils';
import {FILL_MASTERS, FILL_SELECTED_OPTIONS, REMOVE_MASTER, FILTER_MASTER, ADD_MASTER, FILL_OPTIONS, UPDATE_ACTIVE_MASTER, TOGGLE_SELECT_MASTER_SCREEN, UPDATE_COLDEFS, STORE_ALL_MASTERS, ADD_FILTER, REMOVE_FILTER, UPDATE_FILTER, SYNC_ACTIVE_MASTER_TO_MASTER, UPDATE_ROW_DATA, UPDATE_PROGRESS_STATE, RESET_STATE} from '../../actions/MDM';


const initialState:MDMStore = {
    allMasters:[],
    masters:[],
    options:[],
    selectedOptions:[],
    activeMaster:{id:0,fields:[],filters:[],progress:'default',name:'',colDefs:[],rowData:[]},
    isSelectMasterOpen:true,
}


const setMasters = (state:any,action:PayloadAction<MDMMasterState[]>|PayloadAction<any>) => {
    switch(action.type){
        case STORE_ALL_MASTERS.type:
            state.allMasters = action.payload;
            break;
        case FILL_MASTERS.type:
            state.masters = action.payload;
            break;
        case REMOVE_MASTER.type:
            state.masters = state.masters.filter(((selectedMaster:MDMMasterState)=>selectedMaster.id !== action.payload));
            break;
        case FILTER_MASTER.type:
            state.masters = state.masters.filter(((selectedMaster:MDMMasterState)=>selectedMaster.id === action.payload));
            break;
        case ADD_MASTER.type:
            state.masters = [...state.masters,action.payload];
            break;
        case SYNC_ACTIVE_MASTER_TO_MASTER.type:
            state.masters = state.masters.map((master:MDMMasterState)=>{
                if(master.id===state.activeMaster.id){
                    return {...state.activeMaster}
                }
                return master
            })
            break;

        case UPDATE_COLDEFS.type:
            state.masters = state.masters.map((master:MDMMasterState)=>{
                if(master.id === action.payload.id){
                    return {...master,colDefs:action.payload.colDefs}
                }
                return master;
            });
            break;
        case ADD_FILTER.type:
            state.activeMaster.filters = [
                ...state.activeMaster.filters,
                {
                  id:generateRandomId(),
                  masterId:state.activeMaster.id,
                  field:'',
                  operator:'',
                  text:''
                }
            ]

            state.masters = state.masters.map((master:MDMMasterState)=>{
                if(master.id===state.activeMaster.id){
                    return {...state.activeMaster}
                }
                return master
            })
            break;
        case REMOVE_FILTER.type:
            state.activeMaster.filters = state.activeMaster.filters.filter((filter:Filter)=>filter.id !== action.payload)
            state.masters = state.masters.map((master:MDMMasterState)=>{
                if(master.id===state.activeMaster.id){
                    return {...state.activeMaster}
                }
                return master
            })
            break;
        case UPDATE_FILTER.type:
            state.activeMaster.filters = state.activeMaster.filters.map((filter:Filter) => {
                if(filter.id === action.payload.filterId){
                    return {...filter,[action.payload.property]:action.payload.value}
                }
                return filter;
            })
            break;
        case UPDATE_ROW_DATA.type:
            state.activeMaster = {...state.activeMaster,rowData:action.payload};
            break;
        case UPDATE_PROGRESS_STATE.type:
            state.activeMaster = {...state.activeMaster, progress:action.payload};
            break;    
        default:
            return
    }
  }

const setOptions = (state:any,action: PayloadAction<Array<Option>>) => {
     state.options = action.payload;
}
  
const setSelectedOptions = (state:any,action: PayloadAction<Array<Option>>) => {
    state.selectedOptions = action.payload;
}

const setActiveMaster =  (state:any) => {
    state.activeMaster = {...state.masters[0]};
}
   
const setIsSelectMasterOpen = (state:any,action:PayloadAction<boolean>)=>{
    state.isSelectMasterOpen = action.payload;
}

const resetState = (state:any) => {
    state.align = [];
    state.masters=[];
    state.options=[];
    state.selectedOptions=[];
    state.activeMaster={id:0,fields:[],filters:[],progress:'default',name:'',colDefs:[],rowData:[]};
    state.isSelectMasterOpen = true;
}



const mdmReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(STORE_ALL_MASTERS,setMasters)
      .addCase(FILL_MASTERS,setMasters)
      .addCase(ADD_MASTER,setMasters)
      .addCase(REMOVE_MASTER,setMasters)
      .addCase(FILTER_MASTER,setMasters)
      .addCase(SYNC_ACTIVE_MASTER_TO_MASTER,setMasters)
      .addCase(UPDATE_COLDEFS,setMasters)
      .addCase(ADD_FILTER,setMasters)
      .addCase(REMOVE_FILTER,setMasters)
      .addCase(UPDATE_FILTER,setMasters)
      .addCase(UPDATE_ROW_DATA,setMasters)
      .addCase(UPDATE_PROGRESS_STATE,setMasters)
      .addCase(FILL_OPTIONS,setOptions)
      .addCase(FILL_SELECTED_OPTIONS,setSelectedOptions)
      .addCase(UPDATE_ACTIVE_MASTER,setActiveMaster)
      .addCase(TOGGLE_SELECT_MASTER_SCREEN,setIsSelectMasterOpen)
      .addCase(RESET_STATE,resetState)
  })

export default mdmReducer;