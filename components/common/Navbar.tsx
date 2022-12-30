/* eslint-disable @next/next/no-html-link-for-pages */
import { AppBar } from "@mui/material";
import { t } from "i18next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState } from "../../store/auth/authSlice";

const Navbar = () => {
  const { t } = useTranslation("common");

  const authState = useSelector(selectAuthState);

  return (
    <AppBar position="static" color="inherit">
      <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl py-2">
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-thin lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a
                href="/#"
                className="block py-2 pr-4 pl-3 text-gray-200 hover:text-gray-100 transition rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 group-hover:opacity-100"
                aria-current="page"
              >
                {t("navbar.home")}
              </a>
            </li>
            <li>
              <a
                href="/#about"
                className="block py-2 pr-4 pl-3 text-gray-200 hover:text-gray-100 transition border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
              >
                {t("navbar.about")}
              </a>
            </li>
            {/* <li>
              <a
                href="#features"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
              >
                {t("navbar.features")}
              </a>
            </li> */}
            <li>
              <a
                href="/#pricing"
                className="block py-2 pr-4 pl-3 text-gray-200 hover:text-gray-100 transition border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
              >
                {t("navbar.pricing")}
              </a>
            </li>
            <li>
              {authState ? (
                <Link
                  href="/dashboard"
                  className="block py-2 pr-4 pl-3 text-gray-200 hover:text-gray-100 transition border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  {t("navbar.dashboard")}
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="block py-2 pr-4 pl-3 text-gray-200 hover:text-gray-100 transition border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  {t("navbar.login")}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </AppBar>
  );
};

export default Navbar;
