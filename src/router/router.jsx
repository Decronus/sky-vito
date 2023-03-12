import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import ProtectedRoute from "../components/protected-route";
import Home from "../pages/home";
import NotFound from "../pages/not-found";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE,
    ADV_ROUTE,
} from "../utils/consts";
import Login from "../pages/auth/Login";
import Profile from "../pages/profile";
import AdvPage from "../pages/adv/AdvPage";
import RootLayout from "../components/root-layout/RootLayout";
import LoaderFunctions from "./loader.functions";
import Registration from "../pages/auth/Registration";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<RootLayout />}
            loader={LoaderFunctions.getAllAds}
        >
            <Route
                index
                path={HOME_ROUTE}
                element={<Home />}
                loader={LoaderFunctions.getAllAds}
            />

            <Route path={LOGIN_ROUTE} element={<Login />} />

            <Route path={REGISTRATION_ROUTE} element={<Registration />} />

            <Route
                path={`${PROFILE_ROUTE}/:id`}
                element={<Profile />}
                loader={({ params }) =>
                    LoaderFunctions.getUserAndUserAds(params.id)
                }
            />
            <Route
                path={`${ADV_ROUTE}/:id`}
                element={<AdvPage />}
                loader={({ params }) => LoaderFunctions.getAdvById(params.id)}
            />

            <Route element={<ProtectedRoute />}>
                <Route path={`${PROFILE_ROUTE}/:id`} element={<Profile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default router;
