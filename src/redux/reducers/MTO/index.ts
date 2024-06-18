import type { PayloadAction } from '@reduxjs/toolkit'
import { createReducer } from '@reduxjs/toolkit';
import { MTOStore } from '../../../VectorFlow/types/MTO';
import { SAVE_ANALYTICS_DATA } from '../../actions/MTO';




const setAnalyticsData = (state: any, action: PayloadAction<any>) => {
    state.AnalyticsData = action.payload
}

const mtoReducer = (initialState: MTOStore) => createReducer(initialState, (builder) => {
    builder.addCase(SAVE_ANALYTICS_DATA, setAnalyticsData)
})

export default mtoReducer;
