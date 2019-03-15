import React from "react";
import Publication from "./pages/Publication";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default [
    {
        path: "/",
        exact: true,
        component: Publication
    },
    {
        path: '/login',
        exact: true,
        component: Login
    },
    {
        path: '/signup',
        exact: true,
        component: Signup
    }
];
