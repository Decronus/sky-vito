import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "../components/protected-route/ProtectedRoute";
import ProtectedRouteIsLogin from "../components/protected-route/ProtectedRouteIsLogin";
import Home from "../pages/home/Home";
import NotFound from "../pages/not-found/NotFound";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, ADV_ROUTE, ACCOUNT } from "../utils/consts";
import Login from "../pages/auth/Login";
import Profile from "../pages/profile/profile";
import AdvPage from "../pages/adv/AdvPage";
import RootLayout from "../components/root-layout/RootLayout";
import LoaderFunctions from "./loader.functions";
import Registration from "../pages/auth/Registration";
import Account from "../pages/profile/account";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />} loader={LoaderFunctions.getAllAds}>
            <Route
                index
                path={HOME_ROUTE}
                element={<Home />}
                loader={LoaderFunctions.getAllAds}
                errorElement={<NotFound />}
            />

            <Route
                path={`${PROFILE_ROUTE}/:id`}
                element={<Profile />}
                loader={({ params }) => LoaderFunctions.getUserAndUserAds(params.id)}
                errorElement={<NotFound />}
            />
            <Route
                path={`${ADV_ROUTE}/:id`}
                element={<AdvPage />}
                loader={({ params }) => LoaderFunctions.getAdvAndComments(params.id)}
                errorElement={<NotFound />}
            />

            <Route element={<ProtectedRouteIsLogin />}>
                <Route path={REGISTRATION_ROUTE} element={<Registration />} errorElement={<NotFound />} />
                <Route path={LOGIN_ROUTE} element={<Login />} errorElement={<NotFound />} />
            </Route>

            <Route element={<ProtectedRoute redirectPath={LOGIN_ROUTE} />}>
                <Route
                    path={`${ACCOUNT}/:id`}
                    element={<Account />}
                    loader={({ params }) => LoaderFunctions.getUserAds(params.id)}
                    errorElement={<NotFound />}
                />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default router;
