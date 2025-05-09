import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HeroSection,
    ImageTextSection,
    Card,
    PlacesCards,
    ContactUs,
    EnquiryForm,
    CardE,
    ExpandableCard
  } from "../components/PageComponent";

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
          image:"/images/umrah/7.webp"
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
    <div className="bg-gray-100 py-12 px-4 md:px-12 flex flex-col items-center space-y-12">
  <div className="text-center w-full max-w-7xl">
    <CardE title="Umrah Packages" places={umrahPackages} />
  </div>

  <div className="text-center w-full max-w-7xl">
    <CardE title="Hajj Packages" places={hajjPackages} description />
  </div>
</div>
  )
}

export default Packages
