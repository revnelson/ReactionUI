import React from "react";
import { NavLink } from "react-router-dom";

export const SideMenu = () => {
  return (
    <div className="bg-white shadow h-16 fixed pin-b md:relative md:h-screen z-10 w-full md:w-48">
      <div className="md:mt-12 md:w-48 md:fixed md:pin-l md:pin-t content-center md:content-start text-left justify-between">
        <ul className="flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
          <li className="mr-1 flex-1">
            <NavLink
              to="about"
              className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-grey-d3 hover:border-pink"
            >
              <i className="fas fa-tasks pr-0 md:pr-3" />
              <span className="pb-1 md:pb-0 text-xs md:text-base md:text-primary block md:inline-block">
                About
              </span>
            </NavLink>
          </li>
          <li className="mr-3 flex-1">
            <NavLink
              to="login"
              className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-grey-d3 hover:border-violet"
            >
              <i className="fa fa-envelope pr-0 md:pr-3" />
              <span className="pb-1 md:pb-0 text-xs md:text-base text-grey-dark md:text-grey-l1 block md:inline-block">
                Log In
              </span>
            </NavLink>
          </li>
          <li className="mr-3 flex-1">
            <a
              href="#"
              className="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-blue-d1"
            >
              <i className="fas fa-chart-area pr-0 md:pr-3 text-blue-d1" />
              <span className="pb-1 md:pb-0 text-xs md:text-base text-white md:text-white block md:inline-block">
                Analytics
              </span>
            </a>
          </li>
          <li className="mr-3 flex-1">
            <a
              href="#"
              className="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-grey-d3 hover:border-red"
            >
              <i className="fa fa-wallet pr-0 md:pr-3" />
              <span className="pb-1 md:pb-0 text-xs md:text-base text-grey-d1 md:text-grey-l1 block md:inline-block">
                Payments
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
