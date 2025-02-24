import './App.css'
import myImage from './assets/istockphoto-1480239219-612x612.jpg';
import {LoginPage} from "./pages/LoginPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router";
import React from "react";
import {HomePage} from "./pages/HomePage.tsx";
import {RootLayout} from "./components/RootLayout.tsx";
import {MaterialPage} from "./pages/MaterialPage.tsx";
import {EmployeesPage} from "./pages/EmployeesPage.tsx";
import {MaterialReceivedDetailsPage} from "./pages/MaterialReceivedDetailsPage.tsx";
import {ProjectPage} from "./pages/ProjectPage.tsx";
import {TopMenuBar} from "./components/TopMenuBar.tsx";
import {SuppliersPage} from "./pages/SuppliersPage.tsx";
import {MaterialSendDetails} from "./pages/MaterialSendDetails.tsx";

function App() {


    const routes = createBrowserRouter([
        {
            path:'/',
            element:<LoginPage/>
        },
        {
            path: '/YardSystem',
            element: <RootLayout/>,
            children: [
                {path:'/YardSystem', element:<HomePage/>},
                {path:'Materials', element:<MaterialPage/>},
                {path:'Employees', element:<EmployeesPage/>},
                {path:'Projects', element:<ProjectPage/>},
                {path:'Suppliers', element:<SuppliersPage/>},
                {path:'MaterialSendDetails', element:<MaterialSendDetails/>},
                {path:'MaterialReceivedDetails', element:<MaterialReceivedDetailsPage/>},
            ]
        },


    ])

    return (
        <RouterProvider router={routes}></RouterProvider>
        // <TopMenuBar></TopMenuBar>
    );
};
export default App


