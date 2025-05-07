import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection, ImageTextSection, ExpandableCard  } from "../components/PageComponent";
import { FaMapMarkerAlt, FaMosque, FaKaaba, FaLandmark, FaStarOfDavid } from 'react-icons/fa';
const API_URL = import.meta.env.VITE_API_URL;

const menuItems = [
  { label: 'History', icon: <FaMapMarkerAlt /> },
  { label: 'Cultural & Spiritual Significance', icon: <FaMosque /> },
  { label: 'Grand Mosque', icon: <FaKaaba /> },
  { label: 'Attractions', icon: <FaLandmark /> },
  { label: 'Holy Sites', icon: <FaStarOfDavid /> },
];

const MakkahPage = () => {
  const [selected, setSelected] = useState('History');

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Welcome to Makkah!"
        subtitle="The sacred heart of Islam, home to the Kaaba"
        hadithText="By Allah, you are the best and most beloved land to Allah. Had I not been driven away from you, I would not have left you."
        hadithSource="Sunan al-Tirmidhī 3925"
        backgroundImage="/images/makkah/masjid_al_jharam-nightview.jpg" // Updated path
      />

      {/* Sticky Secondary Nav */}
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


      {/* Animated Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-6 bg-white shadow-inner max-w-screen-xl mx-auto"
        >
          {selected === 'History' && (
            <ImageTextSection
              title="History of Makkah"
              image="/images/makkah/oldmakkah.webp" // Updated path
              description={ [
                "Makkah’s religious significance dates back to Prophet Ibrahim and his son Ismail, who are believed to have built the Kaaba as a house of monotheistic worship.",
                "The Zamzam Well was discovered by Hajar when she searched for water in the desert, and it continues to provide water near the Kaaba.",
                "Prophet Muhammad (PBUH) was born in Makkah in 570 CE, and the city is central to Islamic history as the site of early Quranic revelations.",
                "After years of conflict, Prophet Muhammad (PBUH) peacefully conquered Makkah in 630 CE."
              ]}
              colorScheme="alt"
            />
          )}

          {selected === 'Cultural & Spiritual Significance' && (
            <ImageTextSection
              title="Cultural and Spiritual Influence"
              image="/images/makkah/clock_tower.jpg" // Updated path
              description={[
                "Makkah hosts Hajj and Umrah, drawing millions annually and serving as a symbol of Islamic unity and shared rituals.",
                "Both Makkah and Madina have helped preserve classical Arabic, the language of the Qur'an, and spread Islamic customs globally.",
                "The Kaaba in Makkah is the qibla for all Muslims, reinforcing a universal direction of prayer and unity.",
                "Masjid an-Nabawi in Madina acts as a spiritual sanctuary and a model for community living in Islam.",
                "The Prophet’s life in Madina laid the foundation for Islamic governance, ethics, and justice, still reflected in modern Muslim societies.",
                "Visiting these cities strengthens Islamic identity and creates deep emotional and cultural bonds for Muslims worldwide."
              ]}
              reverse={true}
            />
          )}

          {selected === 'Grand Mosque' && (
            <section className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-center mb-4">The Grand Mosque of Makkah</h2>
              <p className="text-center mb-4">
                The Grand Mosque (Masjid al-Haram) is the largest mosque in the world and the holiest site in Islam...
              </p>
              <ImageTextSection
                image="/images/makkah/masjid_al_jharam-nightview.jpg" // Updated path
                description={
                  <div className="text-left mb-6">
                    <h3 className="text-xl font-semibold">Quick Facts</h3>
                    <ul className="list-disc list-inside mt-2">
                    <li className="pl-2 -indent-2">Makkah is the holiest city in Islam, located in present-day Saudi Arabia.</li>
                    <li className="pl-[2.5ch] -indent-[2.5ch]">The sacred Zamzam Well is located near the Kaaba and provides water to pilgrims.</li>
                    <li className="pl-2 -indent-2">Prophet Muhammad ﷺ was born in Makkah in 570 CE.</li>
                    <li className="pl-[2.5ch] -indent-[2.5ch]">Muslims around the world face the Kaaba in Makkah during their daily prayers (qibla).</li>
                    <li className="pl-2 -indent-2">Non-Muslims are not permitted to enter the city of Makkah.</li>
                    </ul>
                  </div>
                }
              />
              <ExpandableCard title="Explore Masjid Al Haram" file="masjid-e-haram" />
            </section>
          )}

          {selected === 'Attractions' && (
            <ExpandableCard title="Attractions in Makkah" file="makkah_at" />
          )}

          {selected === 'Holy Sites' && (
            <ExpandableCard title="Holy Places in Makkah" file="makkah_hp" />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MakkahPage;
