import { createSlice } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

// Estado inicial do contador
const initialState: CounterState = {
  value: 0,
};

// Criação do slice
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Exportar as actions para serem usadas nas telas
export const { increment, decrement, reset } = counterSlice.actions;

// Exportar o reducer para adicionar à store
export default counterSlice.reducer;
