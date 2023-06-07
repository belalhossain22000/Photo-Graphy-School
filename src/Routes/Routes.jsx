import {
    createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import LoginPage from "../components/LoginPage/LoginPage";
import RegistrationPage from "../components/RegistrationPage/RegistrationPage";
import Home from "../components/Home/Home/Home";
import InstructorsPage from "../components/InstructorsPage/InstructorsPage";
import Classes from "../components/Classes/Classes";
import Dashboard from "../components/Dashboard/Dashboard";


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
            },
            {
                path:"/instructors",
                element:<InstructorsPage></InstructorsPage>
            },
            {
                path:"/classes",
                element:<Classes></Classes>
            }
        ]
    },
    {
        path:"/dashboard",
        element:<Dashboard></Dashboard>
    }
]);