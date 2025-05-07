import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection, ImageTextSection, ExpandableCard } from '../components/PageComponent';
import { FaMapMarkerAlt, FaMosque, FaKaaba, FaLandmark } from 'react-icons/fa';

const menuItems = [
  { label: 'History', icon:<FaMapMarkerAlt/> },
  { label: 'Religious & Cultural Significance',icon:<FaMosque/> },
  { label: '🕌Prophet’s Mosque',},
  { label: 'Attractions',icon:<FaLandmark/> },
  { label: 'Holy Sites',icon:<FaMapMarkerAlt/> },
];

const MadinaPage = () => {
  const [selected, setSelected] = useState('History');

  return (
    <div>
      <HeroSection
        title="Welcome to Madina!"
        subtitle="The sacred heart of Islam, The Prophet's City (مدينة النبي)"
        backgroundImage="/images/madina/madina.jpg" // Updated path
        hadithText="Medina is a sanctuary from that place to that. Its trees should not be cut and no heresy should be innovated nor any sin should be committed in it, and whoever innovates in it an heresy or commits sins (bad deeds), then he will incur the curse of Allah, the angels, and all the people."
        hadithSource="Sahih al-Bukhari 1867"
      />

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


          <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="px-4 py-6 bg-white shadow-inner max-w-screen-xl mx-auto"
        >
      {/* Dynamic Content Area */}
      <div className="px-4 py-6 bg-white shadow-inner max-w-screen-xl mx-auto">
        {selected === 'History' && (
          <ImageTextSection
            title="History of Madina"
            image="/images/madina/history.jpg"
            description={[
    "Before Islam, Madinah was known as Yathrib, an oasis city inhabited by Arab and Jewish tribes.",
    "In 622 CE, Prophet Muhammad ﷺ migrated to Yathrib, renamed it Madinah, and established the first Islamic state.",
    "Key events such as the drafting of the Constitution of Madinah and battles like Badr and Uhud shaped the Islamic era.",
    "After the Prophet's death, Madinah remained a symbol of Islamic unity and devotion."
  ]}
  colorScheme="alt"
/>
        )}
        {selected === 'Religious & Cultural Significance' && (
          <ImageTextSection
            title="Religious Significance of Madina"
            image="/images/madina/masjid-al-nabawi.jpg" // Updated path
            description={[
              "Madinah is the second holiest city in Islam, home to Al-Masjid an-Nabawi, where Prophet Muhammad ﷺ is buried.",
              "The city is a spiritual focal point for Muslims, with prayers in the Prophet’s Mosque carrying multiplied rewards.",
              "Prayers in the Prophet’s Mosque carry multiplied rewards, making it a spiritual focal point for Muslims worldwide.",
              "Madinah reflects Islamic brotherhood, peace, and cultural diversity due to the constant flow of pilgrims.",
              "Its architecture blends traditional Islamic motifs with modern elements, and it is a hub of educational and religious institutions."
            ]}
            colorScheme="default"
          />
        )}

        {selected === '🕌Prophet’s Mosque' && (
          <section className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Al-Masjid an-Nabawi (The Prophet’s Mosque)</h2>
            <p className="text-center mb-4">
              Built by the Prophet Muhammad ﷺ himself, it is one of the largest mosques in the world and holds great religious importance. It houses the Green Dome under which lies the tomb of the Prophet and his companions, Abu Bakr and Umar.
            </p>
            <ExpandableCard title="Explore The Prophet’s Mosque" file="masjid_nabawi" />
          </section>
        )}

        {selected === 'Attractions' && (
          <ExpandableCard title="Attractions in Madina" file="madina_at" />
        )}

        {selected === 'Holy Sites' && (
          <ExpandableCard title="Holy Places in Madina" file="madina_hp" />
        )}

      </div>
      </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default MadinaPage;
