import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/CMLogo.png";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navItems = [
    { path: "/", title: "Start a search" },
    { path: "/my-job", title: "My Jobs" },
    { path: "/salary", title: "Salary Estmate" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
        <Link to={"/"} className="flex items-center gap-2 text-2xl">
          <img src={Logo} alt="Logo" className="h-8 w-auto m-2" />
        </Link>
        {/* Nav items for large devices */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => {
            return (
              <li key={path} className="text-base text-primary">
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            );
          })}
        </ul>

        {/* Signup & Login button */}

        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          <Link to={"/login"} className="py-2 px-5 border rounded">
            Login
          </Link>
          <Link
            to={"/signup"}
            className="py-2 px-5 border rounded bg-blue text-white "
          >
            Signup
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <FaXmark className="w-5 h-5 text-primary " />
            ) : (
              <FaBarsStaggered className="w-5 h-5 text-primary " />
            )}
          </button>
        </div>
      </nav>

      {/*  */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => {
            return (
              <li
                key={path}
                className="text-base text-white first:text-white py-1"
              >
                <NavLink
                  to={path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            );
          })}
          <li className="text-white py-1">
            <Link to={"/login"} className="">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
