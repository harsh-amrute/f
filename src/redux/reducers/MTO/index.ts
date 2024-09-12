import type { PayloadAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit';
import { MTOStore } from '../../../VectorFlow/types/MTO';
import { SAVE_ANALYTICS_DATA, DAYWISE_COVERAGE_ANALYTICS, PROCPLANNING_ANALYTICS, RESOURCE_UTIL_ANALYTICS } from '../../actions/MTO';




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



const mtoReducer = (initialState: MTOStore) => createReducer(initialState, (builder) => {
    builder.addCase(SAVE_ANALYTICS_DATA, setAnalyticsData)
    builder.addCase(DAYWISE_COVERAGE_ANALYTICS, setDayWiseCoverageAnalytics)
    builder.addCase(PROCPLANNING_ANALYTICS, setProcPlanningAnalytics)
    builder.addCase(RESOURCE_UTIL_ANALYTICS, setResourceUtilAnalytics)
})

export default mtoReducer;
