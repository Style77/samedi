/* eslint-disable @next/next/no-html-link-for-pages */
import { t } from "i18next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { t } = useTranslation("common");

  const [isLogged, setIsLogged] = useState(false);
  const { getCurrentUser, signOutUser } = useAuth();

  useEffect(() => {
    const checkUser = async () => {
      const user = await getCurrentUser();
      if (user) {
        setIsLogged(true);
      }
    };
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav className="fixed shadow-lg px-4 lg:px-6 py-2.5 w-full bg-white opacity-50 hover:opacity-100 transition duration-500 ease-out lg:block hidden">
      <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl py-2">
        <div
          className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-thin lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a
                href="/#"
                className="block py-2 pr-4 pl-3 text-gray-400 hover:text-gray-900 transition rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 group-hover:opacity-100"
                aria-current="page"
              >
                {t("navbar.home")}
              </a>
            </li>
            <li>
              <a
                href="/#about"
                className="block py-2 pr-4 pl-3 text-gray-400 hover:text-gray-900 transition border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
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
                className="block py-2 pr-4 pl-3 text-gray-400 hover:text-gray-900 transition border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 "
              >
                {t("navbar.pricing")}
              </a>
            </li>
            <li>
              {isLogged ? (
                <Link
                  href="/dashboard"
                  className="block py-2 pr-4 pl-3 text-gray-400 hover:text-gray-900 transition border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  {t("navbar.dashboard")}
                </Link>
              ) : (
                <Link
                  href="/signin"
                  className="block py-2 pr-4 pl-3 text-gray-400 hover:text-gray-900 transition border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0"
                >
                  {t("navbar.login")}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
