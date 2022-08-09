import React, { FC } from "react";
import Logo from "shared/Logo/Logo";
import MenuBar from "shared/MenuBar/MenuBar";
import SwitchDarkMode from "shared/SwitchDarkMode/SwitchDarkMode";
import LangDropdown from "./LangDropdown";
import NotifyDropdown from "./NotifyDropdown";
import AvatarDropdown from "./AvatarDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import DropdownTravelers from "./DropdownTravelers";
import { Link } from "react-router-dom";

export interface MainNav2Props {
  isTop: boolean;
}

const MainNav2: FC<MainNav2Props> = ({ isTop }) => {
  return (
    <div
      className={`nc-MainNav1 nc-MainNav2 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container relative flex items-center justify-between py-5 space-x-4 xl:space-x-8">
        <div className="flex items-center justify-start flex-grow space-x-3 sm:space-x-8 lg:space-x-10">
          <Logo />
          <div className="hidden h-10 border-l sm:block border-neutral-300 dark:border-neutral-500"></div>
          <div className="hidden sm:block">
            <DropdownTravelers />
          </div>
        </div>
        <div className="flex items-center justify-end flex-shrink-0 space-x-1 text-neutral-700 dark:text-neutral-100">
          <div className="items-center hidden space-x-1 xl:flex">
            <CurrencyDropdown />
            <LangDropdown />
            <Link
              to="/add-listing-1"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 border rounded-full text-opacity-90 group border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:text-neutral-300 hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              List your property
            </Link>

            <div></div>
            <SwitchDarkMode />
            <NotifyDropdown />
            <div></div>
            <AvatarDropdown />
          </div>
          <div className="flex items-center space-x-4 xl:hidden">
            <NotifyDropdown />
            <AvatarDropdown />
            <MenuBar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav2;
