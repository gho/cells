import {configureStore} from "@reduxjs/toolkit";
import {boardReducer} from "./ui/board";

export const store = configureStore({
  reducer: {
    board: boardReducer,
  },
});
