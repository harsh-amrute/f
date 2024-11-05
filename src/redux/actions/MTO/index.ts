import { createAction } from '@reduxjs/toolkit';
//import { type DailyDataGraph } from '../../../VectorFlow/types/MTA';

const actions = {
    SAVE_ANALYTICS_DATA: createAction<object>("SAVE_ANALYTICS_DATA"),
    DAYWISE_COVERAGE_ANALYTICS: createAction<object>("DAYWISE_COVERAGE_ANALYTICS"),
    PROCPLANNING_ANALYTICS: createAction<object>("PROCPLANNING_ANALYTICS"),
    RESOURCE_UTIL_ANALYTICS: createAction<object>("RESOURCE_UTIL_ANALYTICS"),
    APPLIED_FILTERS: createAction<object>("APPLIED_FILTERS"),
    BM_REPORT_ANALYTICS: createAction<object>("BM_REPORT_ANALYTICS"),
    SET_TASK_PENDING_SELECTED: createAction<any>("SET_TASK_PENDING_SELECTED"),
    SET_EDITABLE_ROW: createAction<any>("SET_EDITABLE_ROW"),
    SET_POOGI_INITIAL_DATA: createAction<any>("SET_POOGI_INITIAL_DATA"),
    // UPDATE_DAILY_DATA: createAction<DailyDataGraph>("UPDATE_DAILY_DATA"),
    // TOGGLE_GRAPH_MODAL: createAction<boolean>("TOGGLE_GRAPH_MODAL"),
    // TOGGLE_NORM_CHANGE_HISTORY_TABLE: createAction<boolean>("TOGGLE_NORM_CHANGE_HISTORY_TABLE"),
    // UPDATE_GRID_STATE:createAction<any>(" UPDATE_GRID_STATE"),
    // UPDATE_PLANNING_DATA:createAction<any>("UPDATE_PLANNING_DATA")
}


export const {
    SAVE_ANALYTICS_DATA,
    DAYWISE_COVERAGE_ANALYTICS,
    PROCPLANNING_ANALYTICS,
    RESOURCE_UTIL_ANALYTICS,
    BM_REPORT_ANALYTICS,
    SET_TASK_PENDING_SELECTED,
    APPLIED_FILTERS,
    SET_EDITABLE_ROW,
    SET_POOGI_INITIAL_DATA
} = actions;
//console.log('action=',actions.SAVE_ANALYTICS_DATA)