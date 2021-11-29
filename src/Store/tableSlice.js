import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    TABLE_DATA_URL,
    TABLE_DATA_ERROR,
    STATUS_IDLE,
    STATUS_FAILED,
    STATUS_SUCCEEDED,
    STATUS_LOADING
} from '../lib/constants';

const initialTableState = {
    data: [],
    status: STATUS_IDLE,
    rowsLimit: 10,
    currentPage: 1,
    sort: null,
    sortField: 'firstName',
    error: ''
}

export const fetchTableData = createAsyncThunk('table/fetchTableData', async () => {
    const response = await fetch(TABLE_DATA_URL);
    return response.json();
});

const tableSlice = createSlice({
    name: 'table',
    initialState: initialTableState,
    reducers: {
        setTableData(state, action) {
            const { payload: { data } } = action;
            state.data = data;
        },
        changeRowsLimit(state, action) {
            const { payload: { rowsLimit } } = action;
            state.rowsLimit = rowsLimit;

        },
        changePage(state, action) {
            const { payload } = action;
            state.currentPage = payload;

        },
        changeTableSorting(state, action) {
            const { payload: { sort, sortField } } = action;
            state.sort = sort;
            state.sortField = sortField;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTableData.pending, (state) => {
                state.status = STATUS_LOADING;
            })
            .addCase(fetchTableData.fulfilled, (state, action) => {
                state.status = STATUS_SUCCEEDED;
                state.data = state.data.concat(action.payload);
            })
            .addCase(fetchTableData.rejected, (state) => {
                state.status = STATUS_FAILED;
                state.error = TABLE_DATA_ERROR;
            })
    }
});

const { reducer } = tableSlice;
export const tableActions = tableSlice.actions;

export default reducer;
