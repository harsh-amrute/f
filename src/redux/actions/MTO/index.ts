import { createAction } from '@reduxjs/toolkit';
//import { type DailyDataGraph } from '../../../VectorFlow/types/MTA';

const actions = {
    SAVE_ANALYTICS_DATA: createAction<object>("SAVE_ANALYTICS_DATA")
    // UPDATE_DAILY_DATA: createAction<DailyDataGraph>("UPDATE_DAILY_DATA"),
    // TOGGLE_GRAPH_MODAL: createAction<boolean>("TOGGLE_GRAPH_MODAL"),
    // TOGGLE_NORM_CHANGE_HISTORY_TABLE: createAction<boolean>("TOGGLE_NORM_CHANGE_HISTORY_TABLE"),
    // UPDATE_GRID_STATE:createAction<any>(" UPDATE_GRID_STATE"),
    // UPDATE_PLANNING_DATA:createAction<any>("UPDATE_PLANNING_DATA")
}


export const {
    SAVE_ANALYTICS_DATA
} = actions;
//console.log('action=',actions.SAVE_ANALYTICS_DATA)