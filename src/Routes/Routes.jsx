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
import AllUsers from "../components/AllUsers/AllUsers";
import ManageClasses from "../components/ManageClasses/ManageClasses";
import AddClasses from "../components/Instructors/AddClasses";
import MyClasses from "../components/Instructors/MyClasses";
import MySelectedClass from "../components/Student/MySelectedClass";
import MyEnrolledClasses from "../components/Student/MyEnrolledClasses";
import UpdateClasses from "../components/Instructors/UpdateClasses";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main> </Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <LoginPage></LoginPage>
            },
            {
                path: "/register",
                element: <RegistrationPage></RegistrationPage>
            },
            {
                path: "/instructors",
                element: <InstructorsPage></InstructorsPage>
            },
            {
                path: "/classes",
                element: <Classes></Classes>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard/allusers",
                element: <AllUsers></AllUsers>
            },
            {
                path: "/dashboard/manage-classes",
                element: <ManageClasses></ManageClasses>
            },
            {
                path: "/dashboard/add-a-class",
                element: <AddClasses></AddClasses>
            },
            {
                path: "/dashboard/my-classes",
                element: <MyClasses></MyClasses>
            },
            {
                path: "/dashboard/my-selected-classes",
                element: <MySelectedClass></MySelectedClass>
            },
            {
                path: "/dashboard/my-enrolled-classes",
                element: <MyEnrolledClasses></MyEnrolledClasses>
            },
            {
                path: "/dashboard/update-classes/:id",
                element: <UpdateClasses></UpdateClasses>,
                loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`)
            },

        ]
    }
]);