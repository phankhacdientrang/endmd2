import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem("jobs")) || [];

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addJob: (state, action) => {
      const newJob = {
        id: generateId(),
        name: action.payload.name,
        status: action.payload.status,
      };
      state.push(newJob);
      localStorage.setItem('jobs', JSON.stringify(state));
    },
    deleteJob: (state, action) => {
      state.splice(action.payload, 1);
      localStorage.setItem('jobs', JSON.stringify(state));
    },
    changeStatus: (state, action) => {
      const index = state.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state[index].status = !state[index].status;
        localStorage.setItem('jobs', JSON.stringify(state));
      }
    },
    filterData: (state) => {
      state.sort((a, b) => {
        if (a.status === false && b.status === true) {
          return -1;
        }
        if (a.status === true && b.status === false) {
          return 1;
        }
        return 0;
      });
      localStorage.setItem('jobs', JSON.stringify(state)); 
    },
  },
});

export const { addJob, deleteJob, changeStatus, filterData } = todoListSlice.actions;
export default todoListSlice.reducer;
