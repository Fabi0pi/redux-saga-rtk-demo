import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./slice";
import createSagaMiddleware from "redux-saga";
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
    counter: counterReducer,
  }

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export default store;