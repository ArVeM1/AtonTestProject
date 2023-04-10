import React from 'react';
import {Route, Routes} from "react-router-dom";
import Auth from "../page/Auth";
import {authRoutes, publicRoutes} from "../routes";
import {useSelector} from "react-redux";

// У нас есть страницы доступные только авторизированным пользователям
// Также есть страницы доступные всем
const AppRouter = () => {
    const {isAuth} = useSelector(state => state.auth)
    return (
        <div>
            <Routes>
                {isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} />
                )}

                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} />
                )}

                <Route path="*" element={<Auth />} />
            </Routes>
        </div>
    );
};

export default AppRouter;