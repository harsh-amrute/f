import { configureStore } from '@reduxjs/toolkit';
import { MTAStore } from '../../VectorFlow/types/MTA';
import { MDMStore } from '../../VectorFlow/types/MDM';
import mdmReducer from '../reducers/MDM';
import mtaReducer from '../reducers/MTA';
import mtoReducer from '../reducers/MTO/index';
import { MTOStore } from '../../VectorFlow/types/MTO';

const mdmState:MDMStore = {
    allMasters:[],
    masters:[],
    options:[],
    selectedOptions:[],
    activeMaster:{id:0,fields:[],filters:[],progress:'default',name:'',colDefs:[],rowData:[],isChecked:true},
    isSelectMasterOpen:true,
    draftId:'',
    isUploadModalOpen:false,
    chunkSize:20000,
    recordCount:0,
    isDataAvailableLocally:false,
    lastRunDate:''
}

const mtaState: MTAStore = {
    showDailyDataGraphModal: false,
    showNormChangeHistoryTable: false,
    dailyData: {
        normChangeData: [],
        chartData: [],
        masterData: [],
        suggestionData: [],
        monitoringData: [],
        rowData: {}
    },
    currentGridState: [],
    planning: {
        currentTab: '',
        currentCategory: '',
        currentView: ''
    }

}

const mtoState: MTOStore = {
    AnalyticsData:{}
}

export const createStore = (mdmState: MDMStore) => configureStore({
    reducer: {
        mdm: mdmReducer(mdmState),
        mta: mtaReducer(mtaState),
        mto: mtoReducer(mtoState)
    },
});

export const store = createStore(mdmState);

export type RootState = ReturnType<typeof store.getState>