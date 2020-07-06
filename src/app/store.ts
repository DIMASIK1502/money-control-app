import {
  configureStore,
  combineReducers,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import category from "./reducers/category";
import common from "./reducers/common";
import expenses from "./reducers/expenses";

export const store = configureStore({
  reducer: combineReducers({
    common,
    category,
    expenses,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
