import React, { FC } from "react";
import { Helmet } from "react-helmet";
import { useEffect } from "react";
import { useState } from "react";
import MainNav2 from "./MainNav2";

export interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const [isTop, setisTop] = useState(true);

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
  }, []);

  function scrollFunction() {
    const $head = document.getElementById("nc-chifis-header");
    if (!$head) return;
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      !!isTop && setisTop(false);
    } else {
      setisTop(true);
    }
  }

  return (
    <div
      id="nc-chifis-header"
      className="relative z-40 w-full nc-Header lg:sticky lg:top-0 lg:left-0 lg:right-0"
    >
      <Helmet>
        <title>inclub Marketing</title>
      </Helmet>

      {/* NAV */}
      <MainNav2 isTop={isTop} />
    </div>
  );
};

export default Header;
