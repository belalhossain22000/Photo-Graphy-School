import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import LoginPage from "../components/LoginPage/LoginPage";
import RegistrationPage from "../components/RegistrationPage/RegistrationPage";
import Home from "../components/Home/Home/Home";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main> </Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"/login",
                element:<LoginPage></LoginPage>
            },
            {
                path:"/register",
                element:<RegistrationPage></RegistrationPage>
            }
        ]
    },
]);