import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all',
};

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        filtersFetching: state => {
            state.filtersLoadingStatus = 'loading';
        },
        filtersFetched: (state, action) => {
            state.heroesLoadfiltersLoadingStatusingStatus = 'idle';
            state.filters = action.payload;
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { filtersFetching, filtersFetched, filtersFetchingError, activeFilterChanged } =
    actions;
