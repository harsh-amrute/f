import type { PayloadAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit';
import { MTOStore } from '../../../VectorFlow/types/MTO';
import { SAVE_ANALYTICS_DATA, DAYWISE_COVERAGE_ANALYTICS } from '../../actions/MTO';




const setAnalyticsData = (state: any, action: PayloadAction<any>) => {
    state.AnalyticsData = action.payload
}

const setDayWiseCoverageAnalytics = (state: any, action: PayloadAction<any>) => {
    state.DaywiseCoverageAnalytics = action.payload
}



const mtoReducer = (initialState: MTOStore) => createReducer(initialState, (builder) => {
    builder.addCase(SAVE_ANALYTICS_DATA, setAnalyticsData)
    builder.addCase(DAYWISE_COVERAGE_ANALYTICS, setDayWiseCoverageAnalytics)
})

export default mtoReducer;
