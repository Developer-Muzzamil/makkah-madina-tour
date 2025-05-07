import React, { useEffect, useState } from "react";
import { NavLink , useLocation} from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-yellow-500 underline" : "hover:text-yellow-400";

  const toggleMenu = () => setIsOpen(!isOpen);

const location = useLocation();
useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top on route change
}, [location.pathname]);

  return (
    <nav className="bg-black bg-opacity-80 shadow-md sticky top-0 z-50 py-2">
      <div className="w-full px-6 py-4 flex justify-between items-center">
        {/* Logo on the left */}
        <img src="images/ico/DarkLogocUT.PNG" alt="Logo" className="h-10 w-auto" />

        {/* Desktop Links in center */}
        <ul className="hidden md:flex gap-6 text-white font-medium mx-auto">
          {["Home", "Makkah", "Madina", "Hajj", "Umrah", "About"].map((link) => (
            <motion.li
              key={link}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <NavLink to={`/${link.toLowerCase()}`} className={navLinkClass}>
                {link}
              </NavLink>
            </motion.li>
          ))}
        </ul>

        {/* Contact Us button on the right */}
                  <NavLink
            to="/about#contact-form"
            className="text-white hover:scale-110 transition-transform"
          >
            Contact Us
          </NavLink>


        {/* Mobile Hamburger Icon */}
        <div className="md:hidden text-white">
          <button onClick={toggleMenu}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden px-6 pb-4"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        {isOpen && (
          <ul className="flex flex-col gap-4 text-white font-medium">
            {["Home", "Makkah", "Madina", "Hajj", "Umrah", "About"].map((link) => (
              <motion.li
                key={link}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <NavLink
                  to={`/${link.toLowerCase()}`}
                  className={navLinkClass}
                  onClick={toggleMenu}
                >
                  {link}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;
