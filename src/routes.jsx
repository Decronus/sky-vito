import React from "react";
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
// import ProtectedRoute from "./components/protected-route";
import Home from "./pages/home";
import NotFound from "./pages/not-found";
import {
    HOME_ROUTE,
    LOGIN_ROUTE,
    PROFILE_ROUTE,
    SIGNUP_ROUTE,
    ADV_ROUTE,
} from "./utils/consts";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import AdvPage from "./pages/adv/AdvPage";
import Queries from "./services/queries.service";
import RootLayout from "./components/root-layout/RootLayout";

class LoaderFunctions {
    async getAllAds(id) {
        const ads = await Queries.getAllAds();

        return ads.data;
    }

    async getUserAds(id) {
        const allAds = await Queries.getAllAds();
        const userAds = allAds.data.filter((el) => {
            return el.user_id === Number(id);
        });

        return userAds;
    }

    async getUser(id) {
        const allUsers = await Queries.getAllUsers();
        const user = allUsers.data.find((el) => {
            return el.id === Number(id);
        });

        return user;
    }

    async getUserAndUserAds(id) {
        const userAds = await this.getUserAds(id);
        const user = await this.getUser(id);

        return [userAds, user];
    }
}

const loader = new LoaderFunctions();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RootLayout />}>
            <Route
                index
                path={HOME_ROUTE}
                element={<Home />}
                loader={loader.getAllAds}
            />

            <Route path={SIGNUP_ROUTE} element={<Auth />} />

            <Route path={LOGIN_ROUTE} element={<Auth />} />

            <Route
                path={`${PROFILE_ROUTE}/:id`}
                element={<Profile />}
                loader={({ params }) => loader.getUserAndUserAds(params.id)}
            />
            <Route path={`${ADV_ROUTE}/:id`} element={<AdvPage />} />

            {/* <Route
         element={
           <ProtectedRoute>
             <Route path={PROFILE_ROUTE} element={<Profile />} />
           </ProtectedRoute>
         }
       /> */}
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

export default router;
