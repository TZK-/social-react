import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import ResetPassword from "./pages/ResetPassword";
import Users from "./pages/Users";

export default [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/me",
        exact: true,
        component: ProfileEdit
    },
    {
        path: "/users/:id",
        exact: true,
        component: Profile
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
    },
    {
        path: '/reset-password',
        exact: true,
        component: ResetPassword,
        unauthenticated: true,
    },
    {
        path: '/members',
        exact: true,
        component: Users,
    }
];
