import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import LoginPage from "../components/LoginPage/LoginPage";
import RegistrationPage from "../components/RegistrationPage/RegistrationPage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main> </Main>,
        children:[
            {
                path:"/",
                element:<h>hello world</h>
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