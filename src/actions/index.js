import { createAction } from '@reduxjs/toolkit';

export const heroesFetching = createAction('HEROES_FETCHING');
export const heroesFetched = createAction('HEROES_FETCHED');
export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
export const heroDeleted = createAction('HERO_DELETED');
export const heroCreated = createAction('HERO_CREATED');
export const filtersFetching = createAction('FILTERS_FETCHING');
export const filtersFetched = createAction('FILTERS_FETCHED');
export const filtersFetchingError = createAction('FILTERS_FETCHING_ERROR');
export const activeFilterChanged = createAction('ACTIVE_FILTER_CHANGED');
