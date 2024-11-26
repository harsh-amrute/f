import type { PayloadAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit';
import { MTOStore } from '../../../VectorFlow/types/MTO';
import { SAVE_ANALYTICS_DATA, DAYWISE_COVERAGE_ANALYTICS, PROCPLANNING_ANALYTICS, RESOURCE_UTIL_ANALYTICS, BM_REPORT_ANALYTICS, SET_TASK_PENDING_SELECTED ,APPLIED_FILTERS, SET_POOGI_INITIAL_DATA, SET_EDITABLE_MAJ_ROW, SET_EDITABLE_MIN_ROW, SET_BUFFER_INITIAL_DATA} from '../../actions/MTO';




const setAnalyticsData = (state: any, action: PayloadAction<any>) => {
    state.AnalyticsData = action.payload
}

const setDayWiseCoverageAnalytics = (state: any, action: PayloadAction<any>) => {
    state.DaywiseCoverageAnalytics = action.payload
}

const setProcPlanningAnalytics = (state: any, action: PayloadAction<any>) => {
    state.ProcPlanningAnalytics = action.payload
}

const setResourceUtilAnalytics = (state: any, action: PayloadAction<any>) => {
    state.ResourceUtilAnalytics = action.payload
}

const setAppliedFilters = (state: any, action: PayloadAction<any>) => {
    state.AppliedFilters = action.payload
}

const setBMReportAnalytics = (state: any, action: PayloadAction<any>) => {
    state.BMReportAnalytics = action.payload;
}

const setTaskPendingSelected = (state: any, action: PayloadAction<any>)=>{
    state.taskPendingSelected = action.payload;
}

const setEditableMajRow = (state: any, action: PayloadAction<any>)=>{
    state.editableMajRow = action.payload;
}
const setEditableMinRow = (state: any, action: PayloadAction<any>)=>{
    state.editableMinRow = action.payload;
}

const setPoogiIntialData = (state: any, action: PayloadAction<any>)=>{
    state.poogiIntialData = action.payload;
}

const setBufferInitialData= (state: any, action: PayloadAction<any>)=>{
    state.bufferInitialData = action.payload;
}



const mtoReducer = (initialState: MTOStore) => createReducer(initialState, (builder) => {
    builder.addCase(SAVE_ANALYTICS_DATA, setAnalyticsData)
    builder.addCase(DAYWISE_COVERAGE_ANALYTICS, setDayWiseCoverageAnalytics)
    builder.addCase(PROCPLANNING_ANALYTICS, setProcPlanningAnalytics)
    builder.addCase(RESOURCE_UTIL_ANALYTICS, setResourceUtilAnalytics)
    builder.addCase(BM_REPORT_ANALYTICS, setBMReportAnalytics)
    builder.addCase(SET_TASK_PENDING_SELECTED, setTaskPendingSelected)
    builder.addCase(APPLIED_FILTERS, setAppliedFilters)
    builder.addCase(SET_EDITABLE_MAJ_ROW, setEditableMajRow)
    builder.addCase(SET_EDITABLE_MIN_ROW, setEditableMinRow)
    builder.addCase(SET_POOGI_INITIAL_DATA, setPoogiIntialData)
    builder.addCase(SET_BUFFER_INITIAL_DATA, setBufferInitialData)
})

export default mtoReducer;
