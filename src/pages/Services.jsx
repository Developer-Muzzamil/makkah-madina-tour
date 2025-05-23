import React , { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddGuide from "../pages/AddGuide";
import GuideList from "./guides";
// import BookingForm from "../components/BookingForm";
import Packages from "../pages/Packages";

const menuItems = [
  { label: 'Packages', icon: '🗓️' },
  { label: 'Guide Registration', icon: '📝' },
  { label: 'Guide List', icon: '📋' },]


const Services = () => {
  const [selected, setSelected] = useState('Packages');
  return (
    <div>
      {/* Sticky Secondary Navigation */}
      
      <motion.nav
          className="bg-yellow-200 w-full py-3 shadow sticky top-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          >
          <div className="max-w-screen-xl mx-auto px-4">
          <ul className="flex flex-wrap justify-between text-gray-800 font-semibold">
          {menuItems.map((item, index) => (
            <motion.li
            key={index}
            className={`cursor-pointer px-2 py-1 flex items-center gap-2 ${
            selected === item.label
            ? 'border-b-4 border-yellow-500 text-yellow-700'
            : 'hover:text-yellow-600'
            }`}
            onClick={() => setSelected(item.label)}
            whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
              {item.icon} {item.label}
              </motion.li>
              ))}
            </ul>
          </div>
          </motion.nav>

          {selected === 'Packages' && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Packages />
            </motion.div>
          )}
          {selected === 'Guide Registration' && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AddGuide />
            </motion.div>
          )}
          {selected === 'Guide List' && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <GuideList />
            </motion.div>
          )}

          {}
    </div>
  )
}

export default Services
