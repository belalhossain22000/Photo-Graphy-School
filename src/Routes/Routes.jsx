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
import CheckoutForm from "../components/CheckoutForm/CheckoutForm";
import CheckOutModal from "../components/CheckoutForm/CheckOutModal";
import InstructorPrivetRout from "./InstructorPrivetRout";
import InstructorPrivateRoute from "./InstructorPrivetRout";
import AdminPrivetRout from "./AdminPrivetRout";


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
            },
            {
                path: "/pv",
                element: <InstructorPrivetRout></InstructorPrivetRout>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: "/dashboard/allusers",
                element: <AdminPrivetRout><AllUsers></AllUsers></AdminPrivetRout>
            },
            {
                path: "/dashboard/manage-classes",
                element: <AdminPrivetRout><ManageClasses></ManageClasses></AdminPrivetRout>
            },
            {
                path: "/dashboard/add-a-class",
                element: <InstructorPrivateRoute><AddClasses></AddClasses></InstructorPrivateRoute>
            },
            {
                path: "/dashboard/my-classes",
                element: <InstructorPrivetRout><MyClasses></MyClasses></InstructorPrivetRout>
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
                path: "/dashboard/checkout/:id",
                element: <CheckOutModal></CheckOutModal>
            },

            {
                path: "/dashboard/update-classes/:id",
                element: <InstructorPrivateRoute><UpdateClasses></UpdateClasses></InstructorPrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/classes/${params.id}`)
            },


        ]
    }
]);