import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../redux/User/User.js";

export const store = configureStore({
  reducer: { user: UserReducer },
});
