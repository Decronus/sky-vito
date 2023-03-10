import axios from "axios";
import { ACCESS_TOKEN, API_URL } from "./utils/consts";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 0,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.post["Access-Control-Allow-Methods"] =
    "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axiosInstance.defaults.headers.post["Access-Control-Allow-Credentials"] = true;

export default axiosInstance;

export const auth = () => {
    let accessToken = localStorage.getItem(ACCESS_TOKEN);
    return accessToken ? { Authorization: "Bearer " + accessToken } : {};
};
