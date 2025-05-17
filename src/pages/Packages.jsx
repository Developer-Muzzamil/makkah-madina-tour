import React from "react";
import { CardE } from "../components/PageComponent";
import { motion } from "framer-motion";

// Smoother fade animation
const fadeInSection = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
  }
};

const glassBg =
  "bg-white/80 backdrop-blur-sm shadow-xl border border-yellow-100";

const Packages = () => {
  const umrahPackages = [
    {
      id: 1,
      tier: "🥈 Silver Umrah Package",
      name: "Basic Blessings",
      description: "Ideal for budget-conscious pilgrims.",
      duration: "10 Days (5 Makkah + 5 Madinah)",
      makkahHotel: "Al Kiswah Towers or similar (3-star, ~900m from Haram)",
      madinahHotel: "Al Mukhtara International or similar (3-star, ~700m from Prophet’s Mosque)",
      transport: "Shared AC Bus",
      meals: "No meals / optional breakfast add-on",
      ziyarat: "Basic local tour included",
      visaAndInsurance: "Included",
      groupSize: "30–40 people",
      extras: ["Zamzam water (5L)", "Umrah Guidebook"],
      startingPrice: "$950 USD per person",
      image:"/images/umrah/7.webp",
    },
    {
      id: 2,
      tier: "🥇 Gold Umrah Package",
      name: "Comfort & Barakah",
      description: "Balanced experience with comfort and convenience.",
      duration: "12 Days (6 Makkah + 6 Madinah)",
      makkahHotel: "Dar Al Eiman Grand or similar (4-star, ~500m from Haram)",
      madinahHotel: "Al Eiman Taibah or similar (4-star, ~300m from Masjid an-Nabawi)",
      transport: "Semi-private van / luxury bus",
      meals: "Daily Breakfast + Dinner",
      ziyarat: "Guided tours in both cities",
      visaInsuranceSim: "Included",
      groupSize: "15–25 people",
      extras: ["Laundry (3 times)", "Prayer mat gift"],
      startingPrice: "$1,750 USD per person",
      image:"/images/umrah/DuaattheKaaba.webp"
    },
    {
      id: 3,
      tier: "💎 Diamond Umrah Package",
      name: "Premium Serenity",
      description: "Luxury for pilgrims who seek peace and personalized care.",
      duration: "14 Days (7 Makkah + 7 Madinah)",
      makkahHotel: "Swissotel / Hilton Suites (5-star, 100m or less from Haram)",
      madinahHotel: "Anwar Al Madinah Mövenpick / Frontel Al Harithia (5-star, <100m)",
      transport: "Private luxury SUV / chauffeured service",
      meals: "All meals included (5-star buffet)",
      ziyarat: "Private guided tour with historian guide",
      visaInsuranceVIP: "Included",
      groupSize: "Private / Family-based",
      extras: [
        "Complimentary Ihram kit",
        "Gift bag",
        "Laundry service",
        "Zamzam pack",
        "Priority check-in"
      ],
      startingPrice: "$3,200 USD per person",
      image:"/images/umrah/minarets4.jpg"
    }
  ];
  
  const hajjPackages = [
    {
      id: "hajj-silver",
      tier: "🥈 Silver",
      name: "Hajj Package – Essential Journey",
      description: "Affordable option for fulfilling your Hajj with necessary services.",
      duration: "35–40 Days (Long Stay)",
      makkahHotel: "3-star, 1.5–2 km from Haram (e.g., Al Kiswah Towers)",
      madinahHotel: "3-star, 500–800m from Masjid an-Nabawi",
      minaArafat: "Standard tents (shared), mats & basic cooling",
      meals: "Breakfast only in hotels, Maktab-provided meals in Mina/Arafat",
      transport: "Air-conditioned buses (group transport)",
      ziyarat: "Group tours in Makkah & Madinah",
      visaAndInsurance: "Visa, Insurance, and Hajj ID included",
      groupSize: "40–50 pilgrims",
      extras: ["Ihram", "Hajj guidebook", "Zamzam water"],
      startingPrice: "$6,500 – $7,500 USD per person",
      image:"/images/umrah/MasjidalHaram.webp"
    },
    {
      id: "hajj-gold",
      tier: "🥇 Gold",
      name: "Hajj Package – Balanced & Comfortable",
      description: "Comfort-focused Hajj without luxury costs.",
      duration: "20–25 Days",
      makkahHotel: "4-star, 500–700m from Haram (e.g., Dar Al Eiman Grand)",
      madinahHotel: "4-star, 300–400m from Masjid an-Nabawi",
      minaArafat: "Upgraded air-conditioned tents with mattress/sofa beds",
      meals: "Breakfast & Dinner included, buffet meals in Mina/Arafat",
      transport: "Private group van or deluxe bus with fixed slots",
      ziyarat: "Guided with scholars",
      visaInsuranceSim: "Visa, Insurance & SIM included",
      groupSize: "20–30 pilgrims",
      extras: ["Ihram kit", "Prayer rug", "Zamzam", "Laundry x2"],
      startingPrice: "$9,000 – $11,000 USD per person",
      image:"/images/umrah/MaqaIbrahim.webp"
    },
    {
      id: "hajj-diamond",
      tier: "💎 Diamond",
      name: "Hajj Package – VIP Spiritual Excellence",
      description: "Top-tier luxury Hajj with comfort, convenience, and peace of mind.",
      duration: "14–18 Days (Short Stay / Express Hajj)",
      makkahHotel: "5-star (e.g., Swissotel, Conrad), <200m from Haram",
      madinahHotel: "5-star (e.g., Oberoi, Mövenpick), <150m from Masjid",
      minaArafat: "VIP tents with private AC, beds, carpeted floors, buffet meals",
      meals: "All-inclusive gourmet (buffet) meals throughout",
      transport: "Private car / luxury coach / fast-track shuttle",
      ziyarat: "Private guided with multi-lingual scholars",
      visaInsuranceVIP: "Visa, Insurance, VIP Processing, SIM, Porter all included",
      groupSize: "8–15 (Family or elite groups)",
      extras: ["Ihram luxury kit", "Premium gift box", "Concierge", "Zamzam 10L pack"],
      startingPrice: "$13,000 – $18,000+ USD per person",
      image:"/images/umrah/tawaf.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-[#f3f7f4]">
      <img 
      src="/images/DarkLogocUT.PNG" 
      alt="Company Logo"
      className="mt-10 mx-auto border rounded-2xl h-60" />
      {/* Umrah Section */}
      <motion.section
        className={`${glassBg} w-full max-w-6xl  mx-auto px-4 md:px-10 pt-10 pb-20 mt-12 rounded-3xl`}
        variants={fadeInSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight drop-shadow-lg">
            Umrah Packages
          </h2>
          <div className="flex justify-center mb-2">
            <span className="inline-block w-24 h-2 rounded-full bg-gradient-to-r from-yellow-300 via-[#168c5f] to-yellow-300" />
          </div>
          <p className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            Select a package for your sacred journey—budget, comfort, or luxury, we have you covered.
          </p>
        </div>
        <CardE title="" places={umrahPackages} />
      </motion.section>

      {/* Divider */}
      <motion.div
        className="w-full flex justify-center my-12"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="block w-40 h-2 bg-gradient-to-r from-yellow-300 via-[#168c5f] to-yellow-300 rounded-full opacity-80"></span>
      </motion.div>

      {/* Hajj Section */}
      <motion.section
        className={`${glassBg} w-full max-w-6xl mx-auto pt-10 px-4 md:px-10 pb-20 rounded-3xl`}
        variants={fadeInSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight drop-shadow-lg">
            Hajj Packages
          </h2>
          <div className="flex justify-center mb-2">
            <span className="inline-block w-24 h-2 rounded-full bg-gradient-to-r from-yellow-300 via-[#168c5f] to-yellow-300" />
          </div>
          <p className="text-lg md:text-xl text-gray-700 font-medium max-w-2xl mx-auto">
            From essential to VIP, explore Hajj options designed to make your pilgrimage smooth and memorable.
          </p>
        </div>
        <CardE title="" places={hajjPackages} />
      </motion.section>
    </div>
  );
};

export default Packages;