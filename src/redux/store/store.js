import { configureStore } from '@reduxjs/toolkit'
import todoListReducer from "../reducers/todoList";

export const store = configureStore({
  reducer: {
    todoList: todoListReducer,
  },
});
