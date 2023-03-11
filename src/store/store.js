import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/main";

export const store = configureStore({
    reducer: {
        main: mainReducer,
    },
});
