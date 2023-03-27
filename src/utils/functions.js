import Queries from "../services/queries.service";
import { ACCESS_TOKEN } from "./consts";
import { REFRESH_TOKEN } from "./consts";

export async function checkActualAccessToken() {
    if (Math.trunc(Date.now() / 1000) - localStorage.getItem("timeTokensUpdated") > 120) {
        const body = {
            access_token: localStorage.getItem(ACCESS_TOKEN),
            refresh_token: localStorage.getItem(REFRESH_TOKEN),
        };

        const response = await Queries.postUpdateTokens(body);

        const timeTokensUpdated = Math.trunc(Date.now() / 1000);
        localStorage.setItem("timeTokensUpdated", timeTokensUpdated);

        localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
    }
}
