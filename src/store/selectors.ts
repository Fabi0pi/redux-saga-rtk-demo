import { RootState } from '.';
import { createSelector } from '@reduxjs/toolkit';

const selectCounter = ((state: RootState) => state?.counter || {});

export const selectLoading = createSelector([selectCounter], ({loading}) => loading )
export const selectCounterValue = createSelector([selectCounter], ({value}) => value)
