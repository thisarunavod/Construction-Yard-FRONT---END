import {Link, useLocation} from "react-router";
import {useEffect, useState} from "react";

export function TopMenuBar() {

    const location = useLocation();
    const [activePath, setActivePath] = useState(location.pathname);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    const menuItems = [
        { name: "Home", path: "/YardSystem" },
        { name: "Projects", path: "/YardSystem/Projects" },
        { name: "Materials", path: "/YardSystem/Materials" },
        { name: "Employees", path: "/YardSystem/Employees" },
        { name: "Suppliers", path: "/YardSystem/Suppliers" },
        { name: "Material Received Details", path: "/YardSystem/MaterialReceivedDetails" },
        { name: "Material Send Details", path: "/YardSystem/MaterialSendDetails" }
    ];

    return (

        <div className=' fixed z-[10] flex w-full justify-between items-center text-black py-6 px-8 md:px-32 bg-slate-200 drop-shadow-md'>
            <h1>Manage Yard</h1>
            <ul className='xl:flex xl:items-center gap-12  text-base'>
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`p-3 rounded cursor-pointer ${
                            activePath === item.path ? "bg-cyan-600 text-white" : "text-cyan-800 hover:bg-cyan-600 hover:text-white hover:scale-[1.1] transition-all duration-200 ease-in-out "
                        }`}
                    >
                        <Link to={item.path} onClick={() => setActivePath(item.path)}>
                            {item.name}
                        </Link>
                    </li>
                ))}
                <li className="cursor-pointer">LOG OUT</li>
            </ul>
        </div>

    );
    /*return (
        /!*<div className='flex flex-row ' >
            <h1>Material Yard System</h1>
            <nav className='w-full flex flex-row bg-slate-200'>
                <ul className='flex flex-row justify-center items-center'>
                    <li><Link to="/YardSystem">Home Page</Link></li>
                    <li><Link to="/YardSystem/Materials">Materials</Link></li>
                    <li><Link to="/YardSystem/Employees">Employees</Link></li>
                    <li><Link to="/YardSystem/Projects">Projects</Link></li>
                    <li><Link to="/YardSystem/MaterialReceivedDetails">Material Received Details</Link></li>
                </ul>
            </nav>
        </div>*!/

    );*/
}