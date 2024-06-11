import type { PayloadAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit';
import { MTOStore } from '../../../VectorFlow/types/MTO';
import { SAVE_ANALYTICS_DATA } from '../../actions/MTO';


/*const toggleDailyDataGraphModal=(state:any,action:PayloadAction<boolean>)=>{
    state.showDailyDataGraphModal = action.payload
}

const toggleNormChangeHistoryTable = (state:any,action:PayloadAction<boolean>)=>{
    state.showNormChangeHistoryTable = action.payload
}

const setDailyData = (state:any,action:PayloadAction<DailyDataGraph>)=>{
    state.dailyData = action.payload;
}

const updateGridState = (state:any,action:PayloadAction<any>)=>{
    state.currentGridState = action.payload
}

const updatePlanningdata = (state:any,action:PayloadAction<any>)=>{
    state.planning = action.payload
}
*/

const setAnalyticsData = (state: any, action: PayloadAction<any>) => {
    state.AnalyticsData = action.payload
}

const mtoReducer = (initialState: MTOStore) => createReducer(initialState, (builder) => {
    builder.addCase(SAVE_ANALYTICS_DATA, setAnalyticsData)
})

export default mtoReducer;
//const mtaReducer = (initialState: MTAStore) => createReducer(initialState, (builder) => {
    // builder
    //   .addCase(TOGGLE_GRAPH_MODAL,toggleDailyDataGraphModal)
    //   .addCase(TOGGLE_NORM_CHANGE_HISTORY_TABLE,toggleNormChangeHistoryTable)
    //   .addCase(UPDATE_DAILY_DATA,setDailyData)
    //   .addCase(UPDATE_GRID_STATE,updateGridState)
    //   .addCase(UPDATE_PLANNING_DATA,updatePlanningdata)

//})

//export default mtaReducer;