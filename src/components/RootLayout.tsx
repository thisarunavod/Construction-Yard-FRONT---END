import React from "react";
import {Outlet} from "react-router";
import {TopMenuBar} from "./TopMenuBar.tsx";
import {SideMenuBar} from "./SideMenuBar.tsx";

export function RootLayout() {
    return (
        /*    <div className='flex flex-row'>
                <div className=''>
                    <SideMenuBar></SideMenuBar>
                </div>
                <div className=''>
                    <Outlet></Outlet>
                </div>
            </div>*/
        <div className="flex flex-row h-screen">
            <div className="w-64 flex-shrink-0 "> {/* Fixed width, no shrinking */}
                <SideMenuBar/>
            </div>
            <div className="flex-grow overflow-y-auto"> {/* Outlet area, scrollable */}
                <Outlet/>
            </div>
        </div>
    );
}