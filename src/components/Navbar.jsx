import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = ["Home", "Makkah", "Madina", "Hajj", "Umrah", "Packages", "About"];

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "relative text-yellow-500 font-semibold after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-yellow-500"
      : "relative text-white hover:text-yellow-400 transition-all after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-yellow-400 after:transition-all after:duration-300";

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className="bg-black bg-opacity-70 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="w-full px-4 md:px-6 py-5 flex justify-between items-center relative">
        {/* Logo */}
        <div className="flex-none">
          <img
            src="images/ico/DarkLogocUT.PNG"
            alt="Logo"
            className="h-12 w-auto"
          />
        </div>

        {/* Center NavLinks (Desktop) */}
        <ul className="hidden md:flex gap-10 text-white font-medium absolute left-1/2 transform -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link}>
              <NavLink to={`/${link.toLowerCase()}`} className={navLinkClass}>
                {link}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Desktop Contact Us */}
          <NavLink
            to="/about#contact-form"
            className="hidden md:block text-white hover:text-yellow-400 transition-colors"
          >
            Contact Us
          </NavLink>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden text-white">
            <button onClick={toggleMenu}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-black bg-opacity-90 px-6 pt-4 pb-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
          >
            <ul className="flex flex-col gap-4 text-white font-medium">
              {navLinks.map((link) => (
                <li key={link}>
                  <NavLink
                    to={`/${link.toLowerCase()}`}
                    className={navLinkClass}
                    onClick={toggleMenu}
                  >
                    {link}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink
                  to="/about#contact-form"
                  className="text-white hover:text-yellow-400"
                  onClick={toggleMenu}
                >
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
