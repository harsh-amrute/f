import { configureStore } from '@reduxjs/toolkit';
import mdmReducer from '../reducers/MDM';

export const store = configureStore({
    reducer: {
        mdm:mdmReducer
    },
});

export type RootState = ReturnType<typeof store.getState>