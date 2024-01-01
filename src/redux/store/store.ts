import { configureStore } from '@reduxjs/toolkit';
import { MDMStore } from '../../VectorFlow/types/MDM';
import mdmReducer from '../reducers/MDM';

const initialState:MDMStore = {
    allMasters:[],
    masters:[],
    options:[],
    selectedOptions:[],
    activeMaster:{id:0,fields:[],filters:[],progress:'default',name:'',colDefs:[],rowData:[]},
    isSelectMasterOpen:true,
    draftId:'',
    isUploadModalOpen:false
}

export const createStore = (initialState:MDMStore) => configureStore({
    reducer: {
        mdm:mdmReducer(initialState)
    },
});

export const store = createStore(initialState);

export type RootState = ReturnType<typeof store.getState>