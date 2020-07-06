import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CommonState {
  list: Expense[];
  editModal: boolean;
  currentExpesnse: Expense | null;
}

const initialState: CommonState = {
  list: [
    {
      date: '2020-08-29T03:41:37+03:00',
      money: 200,
      category: {
        id: 2,
        text: 'Продукты',
        color: '#d7d2dd'
      },
      id: 7
    },
    {
      date: '2020-08-29T03:41:37+03:00',
      money: 200,
      category: {
        id: 2,
        text: 'Продукты',
        color: '#d7d2dd'
      },
      id: 6
    },
    {
      date: '2020-08-29T03:41:37+03:00',
      money: 200,
      category: {
        id: 2,
        text: 'Продукты',
        color: '#d7d2dd'
      },
      id: 5
    },
    {
      date: '2020-08-29T03:41:37+03:00',
      money: 200,
      category: {
        id: 2,
        text: 'Продукты',
        color: '#d7d2dd'
      },
      id: 4
    },
    {
      date: '2020-07-05T03:41:37+03:00',
      money: 200,
      category: {
        id: 3,
        text: 'Отдых',
        color: '#2a9204'
      },
      id: 3
    },
    {
      date: '2020-07-05T03:41:37+03:00',
      money: 200,
      category: {
        id: 2,
        text: 'Продукты',
        color: '#d7d2dd'
      },
      id: 2
    },
    {
      date: '2020-07-05T03:41:37+03:00',
      money: 200,
      category: {
        id: 1,
        text: 'Бытовая техника',
        color: '#5ee81b'
      },
      id: 1
    }
  ],
  editModal: false,
  currentExpesnse: null,
};

export const commonSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense | any>) => {
      const id = state.list.length ? state.list[0].id + 1 : 1;
      state.list.unshift({ ...action.payload, id });
    },
    removeExpense: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((e) => e.id !== action.payload);
    },
    showEditModal: (state, action: PayloadAction<number>) => {
      if (action.payload) {
        const expesnse = state.list.find((e) => e.id === action.payload);
        if (expesnse) {
          state.editModal = true;
          state.currentExpesnse = expesnse;
        }
      }
    },
    closeEditModal: (state) => {
      state.editModal = false;
      state.currentExpesnse = null;
    },
    editExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.list.findIndex((e) => e.id === action.payload.id);
      if (index > -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const {
  addExpense,
  removeExpense,
  showEditModal,
  closeEditModal,
  editExpense,
} = commonSlice.actions;

export default commonSlice.reducer;
