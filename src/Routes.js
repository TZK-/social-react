import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        component: Login,
        unauthenticated: true,
    },
    {
        path: '/signup',
        exact: true,
        component: Signup,
        unauthenticated: true,
    }
];
