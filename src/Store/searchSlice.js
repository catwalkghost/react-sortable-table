import { createSlice } from '@reduxjs/toolkit';

const initialSearchState = {
    searchValue: ''
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialSearchState,
    reducers: {
        setSearch(state, action) {
            const { payload: { searchValue } } = action;
            state.searchValue = searchValue;
        }
    }
});

const { reducer } = searchSlice;
export const searchActions = searchSlice.actions;

export default reducer;
