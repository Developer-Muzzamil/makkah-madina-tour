import React from "react";
import { motion } from "framer-motion";
import { Card, HeroSection, PopupAd } from "../components/PageComponent";

const HeroSections = () => {

  return (
    <HeroSection
      backgroundImage="/images/makkah/masjid_al_jharam-nightview2.jpg"
      title="Explore the beauty and spirituality"
      subtitle="Your comprehensive guide to exploring Makkah and Madinah, the two holiest cities in Islam."
      hadithText= "“(The performance of) Umra is an expiation for the sins committed (between it and the previous one). And the reward of Hajj Mabrur(the one accepted by Allah) is nothing except Paradise.”"
      hadithSource="Prophet Muhammad (صلى الله عليه وسلم)"
    />
  );
};

//   return (
//     <section className="py-12 px-4 md:px-12 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center mb-10">Explore Our Site</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
//         <Card
//           image="/images/makkah/masjid_al_jharam-nightview2.jpg"
//           title="Makkah"
//           description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
//           link="/makkah"
//         />
//         <Card
//           image="/images/madina.jpeg"
//           title="Madina"
//           description="City of the Prophet (PBUH), home to Masjid al-Nabawi and rich Islamic history."
//           link="/madina"
//         />
//         <Card
//           image="/images/makkah/masjid_al_jharam-nightview2.jpg"
//           title="Umrah"
//           description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
//           link="/makkah"
//         />
//         <Card
//           image="/images/makkah/masjid_al_jharam-nightview2.jpg"
//           title="Hajj"
//           description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
//           link="/makkah"
//         />
//       </div>
//     </section>
//   );
// };

const ExploreSection = () => {
  return (
    <section className="py-12 px-4  md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Explore Our Site</h2>
      <div className="flex  justify-between gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-4">
        <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
          <Card
            image="/images/makkah/masjid_al_jharam-nightview2.jpg"
            title="Makkah"
            description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
            link="/makkah"
          />
        </div>
        <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
          <Card
            image="/images/madina.jpeg"
            title="Madina"
            description="City of the Prophet (PBUH), home to Masjid al-Nabawi and rich Islamic history."
            link="/madina"
          />
        </div>
        <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
          <Card
            image="/images/umrah/homeumrah.avif"
            title="Umrah"
            description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
            link="/umrah"
          />
        </div>
        <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
          <Card
            image="/images/hajj/homehajj.png"
            title="Hajj"
            description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
            link="/hajj"
          />
        </div>
      </div>
    </section>
  );
};


const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const HeartSoulSection = () => {
  return (
    <section className="bg-gradient-to-br from-white to-gray-100 py-16 px-4">
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 className="text-4xl font-bold text-gray-800 mb-6">
          Makkah & Madina — The Heart and Soul of Islam
        </motion.h2>

        <motion.p
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          If <span className="font-semibold text-gray-800">Makkah</span> is the{" "}
          <span className="italic text-red-600">Heart</span> of Islam, where the
          message began, then{" "}
          <span className="font-semibold text-gray-800">Madina</span> is the{" "}
          <span className="italic text-green-600">Soul</span>, where it blossomed with peace, love, and unity.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {[
            {
              title: "Makkah – The Heart",
              items: [
                "✨ Birthplace of Prophet Muhammad (PBUH)",
                "📖 Where the first revelation was received",
                "🏛️ Home of the Kaaba – Qibla for all Muslims",
                "🕋 Center of Hajj and Tawheed",
              ],
            },
            {
              title: "Madina – The Soul",
              items: [
                "🌇 City of the Prophet’s Hijrah (migration)",
                "🕌 Home of Masjid an-Nabawi",
                "❤️ Symbol of peace, mercy, and unity",
                "🌹 Final resting place of Prophet Muhammad (PBUH)",
              ],
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-2xl shadow p-6 border border-gray-200 w-full max-w-md text-left cursor-pointer"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{
                scale: 1.05,
                y: -8,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              }}
              viewport={{ once: true }}
              custom={index}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {card.title}
              </h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                {card.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <div>
      <PopupAd />
      <HeroSections />
      <ExploreSection />
      <HeartSoulSection />
    </div>
  );
};
