import {CREATE_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, USER_ROUTE, USERS_ROUTE} from "./utils/consts";
import Auth from "./page/Auth";
import UserPage from "./page/UserPage";
import Home from "./page/Home";
import CreatePage from "./page/CreatePage";

// Пути для авторизированных
export const authRoutes = [
    {
        path: USERS_ROUTE,
        Component: <Home />
    },
    {
        path: USER_ROUTE + '/:id',
        Component: <UserPage />
    },
    {
        path: CREATE_ROUTE,
        Component: <CreatePage />
    },
];
// Пути для неавторизованного
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Auth />
    },
    {
        path: REGISTER_ROUTE,
        Component: <Auth />
    },

]