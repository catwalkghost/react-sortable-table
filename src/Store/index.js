import { configureStore } from '@reduxjs/toolkit';

import tableReducer from './tableSlice';
import chartReducer from './chartSlice';
import searchReducer from './searchSlice';

const store = configureStore({
    reducer: {
        table: tableReducer,
        chart: chartReducer,
        search: searchReducer
    }
});

export default store;
