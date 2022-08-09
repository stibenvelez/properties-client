import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";

const SubMenu = ({ item, showSidebar }) => {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const { role } = useSelector(({ auth }) => auth.user); 
    return (
        <>
            <NavLink
                className={`w-full flex items-center justify-between p-5 text-base text-white cursor-pointer hover:bg-indigo-700 hover:border-l-4 hover:pl-4`}
                to={item.path}
                onClick={item.subNav && showSubnav}
            >
                <div>
                    {item.icon}
                    <span className="ml-2">{item.title}</span>
                </div>
                <div>
                    {item.subNav && subnav ? (
                        <ChevronUpIcon
                            className="w-5 h-5 ml-2 -mr-1"
                            aria-hidden="true"
                        />
                    ) : item.subNav ? (
                        <ChevronDownIcon
                            className="w-5 h-5 ml-2 -mr-1"
                            aria-hidden="true"
                        />
                    ) : null}
                </div>
            </NavLink>
            {subnav &&
                item.subNav.map((item, index) => {
                    if (item.onlyAdmin && role !== "admin") return null;
                    return (
                        <Link
                            className="flex items-center p-5 pl-5 text-white bg-slate-900 hover:bg-slate-600"
                            to={item.path}
                            key={index}
                            onClick={showSidebar}
                        >
                            {item.icon} <span>{item.title}</span>
                        </Link> 
                    );
                })}
            
        </>
    );
};

export default SubMenu;
