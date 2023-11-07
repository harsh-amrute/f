import { configureStore } from '@reduxjs/toolkit';
import mdmReducer from '../features/MDM';

export const store = configureStore({
    reducer: {
        mdm:mdmReducer
    },
});

export type RootState = ReturnType<typeof store.getState>