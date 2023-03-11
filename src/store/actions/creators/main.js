import { LOG_IN, LOG_OUT } from "../types/main";

export const logIn = (user) => ({
    type: LOG_IN,
    payload: user,
});

export const logOut = () => ({
    type: LOG_OUT,
});
