import React from "react";
import { GlobalStyle } from "../../global-styles";
import Header from "../../components/header";
import Search from "../../components/search";
import { Outlet } from "react-router-dom";

function RootLayout() {
    return (
        <div className="root-layout">
            <GlobalStyle />
            <Header />
            <Search />
            <Outlet />
        </div>
    );
}

export default RootLayout;
