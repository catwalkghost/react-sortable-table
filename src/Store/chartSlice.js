import { createSlice } from '@reduxjs/toolkit';

const initialChartState = {
    filterDatesBy: 'year'
}

const chartSlice = createSlice({
    name: 'chart',
    initialState: initialChartState,
    reducers: {
        changeDatesDisplay(state, action) {
            const { payload: { filterDatesBy } } = action;
            state.filterDatesBy = filterDatesBy;
        }
    }
});

const { reducer } = chartSlice;
export const chartActions = chartSlice.actions;

export default reducer;
