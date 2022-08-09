import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";

import { useState } from "react";
import { ChevronRightIcon, MenuIcon, XIcon } from "@heroicons/react/solid";

const SidebarAdmin = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    

    return (
        <div className=" bg-slate-800">
            {!sidebar && (
                <button
                    className="fixed left-0 z-50 flex items-center justify-center w-12 h-12 shadow-sm rounded-r-md bg-slate-800 hover:bg-slate-700 top-3 button-3 sm:hidden"
                    onClick={showSidebar}
                >
                    <Link className="text-white" to="#">
                        <ChevronRightIcon className="w-5 h-5" />
                    </Link>
                </button>
            )}
            <nav
                className={`bg-slate-800 h-screen sm:w-56 w-full overflow-y-auto flex justify-center transition-all duration-300 sm:relative sm:left-0 fixed ease-in-out ${
                    sidebar ? "left-0" : "-left-full "
                }`}
            >
                <div className="w-full ">
                    <div className="flex justify-end p-4 sm:hidden">
                        <XIcon
                            className="h-5 text-white w- hover:text-indigo-500 hover:cursor-pointer "
                            onClick={showSidebar}
                        />
                    </div>
                    <Link
                        className="absolute items-center justify-end text-xl font-bold text-white right-2 top-3 sm:hidden"
                        to="#"
                    >
                        <XIcon onClick={showSidebar} />
                    </Link>
                   
                    {SidebarData.map((item, index) => {
                        return (
                            <SubMenu
                                item={item}
                                key={index}
                                showSidebar={showSidebar}
                            />
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default SidebarAdmin;
