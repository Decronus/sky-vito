import React, { useEffect } from "react";
import { GlobalStyle } from "../../global-styles";
import Header from "../../components/header";
import Search from "../../components/search";
import { Outlet } from "react-router-dom";
import Queries from "../../services/queries.service";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/consts";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/actions/creators/main";
import { ScrollRestoration } from "react-router-dom";

function RootLayout() {
    const dispatch = useDispatch();

    function checkCurrentUser() {
        Queries.getCurrentUser()
            .then((user) => {
                dispatch(logIn(user.data));
                localStorage.setItem("user", JSON.stringify(user.data));
            })
            .catch((error) => {
                if (error.response.status === 401) {
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
                        .then(() =>
                            Queries.getCurrentUser().then((user) => {
                                dispatch(logIn(user.data));
                                localStorage.setItem("user", JSON.stringify(user.data));
                            })
                        );
                }
            });
    }

    useEffect(() => {
        checkCurrentUser();

        // const interval = setInterval(() => {
        //     checkCurrentUser();
        //     console.log("updateUser");
        // }, 30 * 1000);

        // return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="root-layout">
            <GlobalStyle />
            <Header />

            <div style={{ padding: "0 20px" }}>
                <Search />
                <Outlet />
            </div>

            <ScrollRestoration />
        </div>
    );
}

export default RootLayout;
