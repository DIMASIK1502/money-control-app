import { createSlice } from "@reduxjs/toolkit";

interface CommonState {
  categoryModal: boolean;
}

const initialState: CommonState = {
  categoryModal: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleCategoryModal: (state) => {
      state.categoryModal = !state.categoryModal;
    },
  },
});

export const { toggleCategoryModal } = commonSlice.actions;

export default commonSlice.reducer;
