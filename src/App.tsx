import './App.css'
import myImage from './assets/istockphoto-1480239219-612x612.jpg';
import {LoginPage} from "./pages/LoginPage.tsx";
import {createBrowserRouter, Navigate, RouterProvider, useNavigate} from "react-router";
import React from "react";
import {HomePage} from "./pages/HomePage.tsx";
import {RootLayout} from "./components/RootLayout.tsx";
import {MaterialPage} from "./pages/MaterialPage.tsx";
import {EmployeePage} from "./pages/EmployeesPage.tsx";
import {MaterialReceivedDetailsPage} from "./pages/MaterialReceivedDetailsPage.tsx";
import {ProjectPage} from "./pages/ProjectPage.tsx";
import {SuppliersPage} from "./pages/SuppliersPage.tsx";
import {MaterialSendDetailsPage} from "./pages/MaterialSendDetailsPage.tsx";
import {VehiclePage} from "./pages/VehiclePage.tsx";
import {LoaderFunction} from "react-router-dom";
import {UsersPage} from "./pages/UserManagePage.tsx";


function App() {

    const token = localStorage.getItem("accessToken");

    const protectedLoader: LoaderFunction = () => {
        if (!token) {
            return Navigate({ to: "/" });
        }
        return null;
    };

    const routes = createBrowserRouter([
        {
            path:'/',
            element:<LoginPage/>
        },
        {
            path: '/YardSystem',
            element: <RootLayout/>,
            loader:protectedLoader,
            children: [
                {path:'/YardSystem', element:<HomePage/>},
                {path:'Materials', element:<MaterialPage/>},
                {path:'Employees', element:<EmployeePage/>},
                {path:'Projects', element:<ProjectPage/>},
                {path:'Suppliers', element:<SuppliersPage/>},
                {path:'Vehicles', element:<VehiclePage/>},
                {path:'Users', element:<UsersPage/>},
                {path:'MaterialSendDetails', element:<MaterialSendDetailsPage/>},
                {path:'MaterialReceivedDetails', element:<MaterialReceivedDetailsPage/>},
            ],
        },

    ])

    return (
        <RouterProvider router={routes}></RouterProvider>
        // <TopMenuBar></TopMenuBar>
    );
};
export default App


