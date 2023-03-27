import Queries from "../services/queries.service";
import { ACCESS_TOKEN } from "./consts";
import { REFRESH_TOKEN } from "./consts";

export async function checkActualAccessToken(fn) {
    if (Math.trunc(Date.now() / 1000) - localStorage.getItem("timeTokensUpdated") > 10) {
        console.log("updating tokens");
        const body = {
            access_token: localStorage.getItem(ACCESS_TOKEN),
            refresh_token: localStorage.getItem(REFRESH_TOKEN),
        };

        Queries.postUpdateTokens(body)
            .then((response) => {
                const timeTokensUpdated = Math.trunc(Date.now() / 1000);
                localStorage.setItem("timeTokensUpdated", timeTokensUpdated);

                localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);
            })
            .then(() => {
                return fn;
            });
    } else {
        console.log("without updating tokens");
        return fn;
    }
}
