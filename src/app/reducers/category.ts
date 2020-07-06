import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toHex } from "../../utils/stringToHex";

interface CategoryState {
  list: Category[];
}

const initialState: CategoryState = {
  list: [
    {
      id: 1,
      text: "Бытовая техника",
      color: "#5ee81b",
    },
    {
      id: 2,
      text: "Продукты",
      color: "#d7d2dd",
    },
    {
      id: 3,
      text: "Отдых",
      color: "#2a9204",
    },
  ],
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<string>) => {
      const id =
        state.list.length > 0 ? state.list[state.list.length - 1].id + 1 : 1;
      state.list.push({
        id,
        text: action.payload,
        color: toHex(action.payload),
      });
    },
    setCategoryList: (state, action: PayloadAction<Category[]>) => {
      state.list = action.payload;
    },
  },
});

export const { setCategoryList, addCategory } = categorySlice.actions;

export default categorySlice.reducer;
