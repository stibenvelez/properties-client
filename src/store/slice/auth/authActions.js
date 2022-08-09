import clientAxios from "config/axios";
import tokenAuth from "config/tokenAuth";

import {
    setAuth,
    setAuthError,
    setAuthSuccess,
    setLogin,
    setLoginError,
    setLoginSuccess,
    setNotAuth,
    setSignOut,
    setSignOutError,
    setSignOutSucces,
} from ".";

export const authAction = () => async (dispatch) => {
    dispatch(setAuth());
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("no hay token");
            dispatch(setNotAuth());
            return;
        }
        tokenAuth()
        const { data } = await clientAxios.get("/users/profile");
        dispatch(setAuthSuccess(data));
    } catch (error) {
        dispatch(setAuthError());
    }
};

export const loginAction = (user) => async (dispatch) => {
    dispatch(setLogin());
    try {
        const { data } = await clientAxios.post("/users/login", user);
        localStorage.setItem("token", data.token);
        dispatch(setLoginSuccess(data));
    } catch (error) {
        dispatch(setLoginError(error.response.data.msg));
    }
};

export const forgetPasswordAction = (email) => async (dispatch) => {
    try {
       await clientAxios.post("/users/forget-password", { email });
    } catch (error) {
        console.log(error);
    }
};

export const singOutAction = () => {
    return async (dispatch) => {
        dispatch(setSignOut());
        try {
            localStorage.removeItem("token");
            dispatch(setSignOutSucces());
        } catch (error) {
            dispatch(setSignOutError());
        }
    };
};
