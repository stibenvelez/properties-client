import { configureStore } from "@reduxjs/toolkit";
//Reducer
import properties from "./slice/properties";
import cities from "./slice/cities";
import auth from "./slice/auth";
import users from "./slice/user";
import contact from "./slice/contact";
import comments from "./slice/comments"

export const store = configureStore({
    reducer: {
        properties,
        cities,
        auth,
        users,
        contact,
        comments
    },
});

