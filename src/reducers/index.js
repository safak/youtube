import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeReducer';

export const store = configureStore({

    reducer: {
        app: homeReducer
    }

});