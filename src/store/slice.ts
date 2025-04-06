import { createSlice } from '@reduxjs/toolkit';

type InitialState = { value: number, loading: boolean }

const initialState: InitialState = { value: 0, loading: false }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    fetchCounterRequest: (state) => {
      state.loading = true;
    },
    fetchCounterSuccess: (state, action) => {
      state.value = action.payload;
      state.loading = false;
    },
    fetchCounterFailure: (state) => {
      state.loading = false;
    }
  }
});

export const {
  increment,
  decrement,
  fetchCounterRequest,
  fetchCounterSuccess,
  fetchCounterFailure,
} = counterSlice.actions;

export const counterReducer = counterSlice.reducer;
