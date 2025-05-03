import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from "../components/PageComponent.jsx";
import hajjBanner from "../assets/makkah/rp/kaaba.jpg";
import meccaUmrah from '../assets/umrah/mecca-umrah.webp';

const hajjSteps = [
  {
    title: "Ihram & Niyyah",
    image: meccaUmrah,
    content: [
      "Enter the state of Ihram before reaching the Miqat.",
      "Make a sincere intention to perform Umrah.",
      "Men wear unstitched white garments, women wear modest dress."
    ]
  },
  {
    title: "Tawaf",
    image: meccaUmrah,
    content: [
      "Perform 7 circuits around the Kaaba starting from the Black Stone.",
      "Ensure you remain in a state of Wudu (ablution)."
    ]
  },
  {
    title: "Pray at Maqam Ibrahim",
    image: meccaUmrah,
    content: [
      "Offer 2 Rak’ahs behind Maqam Ibrahim.",
      "Drink Zamzam water after prayer."
    ]
  },
  {
    title: "Sa’i between Safa & Marwah",
    image: meccaUmrah,
    content: [
      "Walk 7 times between the hills of Safa and Marwah.",
      "Begin at Safa and end at Marwah, remembering Hajar’s devotion."
    ]
  },
  {
    title: "Halq or Taqsir",
    image: meccaUmrah,
    content: [
      "Men shave their heads (Halq) or shorten their hair (Taqsir).",
      "Women cut a small portion of their hair.",
      "This marks the end of Umrah."
    ]
  },
  {
    title: "Arrival at Masjid al-Haram",
    image: meccaUmrah,
    content: [
      "Arrive at the Masjid al-Haram and stand in awe of the Kaaba.",
      "Make Du'a for peace and blessings during your stay."
    ]
  },
  {
    title: "Dua at the Kaaba",
    image: meccaUmrah,
    content: [
      "Stand near the Kaaba and make personal supplications (Dua).",
      "It is recommended to pray for yourself, family, and the Ummah."
    ]
  },
  {
    title: "Drinking Zamzam Water",
    image: meccaUmrah,
    content: [
      "Drink Zamzam water after performing Tawaf and Sa'i.",
      "It is a sacred and blessed drink, providing spiritual nourishment."
    ]
  },
  {
    title: "Visit to Medina (Optional)",
    image: meccaUmrah,
    content: [
      "A visit to the Prophet’s Mosque (Masjid an-Nabawi) is optional but highly recommended.",
      "Offer prayers and seek blessings at the tomb of Prophet Muhammad (PBUH)."
    ]
  }
];

// --- Timeline Section ---

function TimelineSection1() {
  const steps = [
    "Enter Ihram & Travel to Mina",
    "Stand at Arafat",
    "Night in Muzdalifah",
    "Stoning & Sacrifice",
    "Tawaf & Sa’i",
    "Final Days in Mina",
  ];

  return (
    <div className="relative w-full overflow-x-auto py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">Pilgrimage Journey Timeline</h2>
      <div className="relative flex w-max mx-auto items-center justify-between px-8">
        {/* Horizontal line */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-amber-900 z-100" />
  
        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center w-40 mx-4">
            {/* When on top (even) */}
            {index % 2 === 0 && (
              <>
                <div className="mb-2 text-center">
                  <div className="font-semibold text-purple-800">Step {index + 1}</div>
                  <div className="text-xs text-amber-700 mt-1">{step}</div>
                </div>
                <div className="w-0.5 h-6 bg-gray-400 mb-2"></div>
                <div
                  className={`w-16 h-6 ${
                    index === 0
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500 border-4 border-white shadow-lg"
                      : "bg-amber-400"
                  } rounded-md`}
                ></div>
              </>
            )}

  {window.scrollTo(0, 0)}

  
            {/* When on bottom (odd) */}
            {index % 2 !== 0 && (
              <>
                <div
                  className={`w-16 h-6 ${
                    index === steps.length - 1
                      ? "bg-amber-500 relative after:content-[''] after:absolute after:right-[-12px] after:top-1/2 after:-translate-y-1/2 after:border-y-[6px] after:border-l-[10px] after:border-l-amber-500 after:border-y-transparent"
                      : "bg-amber-400"
                  } rounded-md`}
                ></div>
                <div className="w-0.5 h-6 bg-gray-400 mt-2"></div>
                <div className="mt-2 text-center">
                  <div className="font-semibold text-purple-800">Step {index + 1}</div>
                  <div className="text-xs text-amber-700 mt-1">{step}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
}


const HajjPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % hajjSteps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextStep = () => setCurrentStep((prev) => (prev + 1) % hajjSteps.length);
  const prevStep = () => setCurrentStep((prev) => (prev - 1 + hajjSteps.length) % hajjSteps.length);

  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection
        title="Hajj – The Journey of a Lifetime"
        subtitle="Experience the sacred pilgrimage to the House of Allah"
        backgroundImage={hajjBanner}
      />

      <TimelineSection1 />

      <div className="flex flex-col items-center justify-center p-6 w-full">
        <div className="relative w-full max-w-3xl h-[450px] overflow-hidden rounded-2xl shadow-2xl bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(event, info) => {
                if (info.offset.x < -100) nextStep();
                else if (info.offset.x > 100) prevStep();
              }}
              className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-6 cursor-grab"
            >
              <img
                src={hajjSteps[currentStep].image}
                alt={hajjSteps[currentStep].title}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-center">{hajjSteps[currentStep].title}</h2>
              <ul className="text-gray-700 text-sm list-disc list-inside space-y-1">
                {hajjSteps[currentStep].content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between w-full max-w-3xl mt-4 px-8">
          <button onClick={prevStep} className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition">
            Previous
          </button>
          <button onClick={nextStep} className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition">
            Next
          </button>
        </div>

        <div className="flex overflow-x-auto w-full max-w-4xl mt-6 space-x-3 px-4 pb-2">
          {hajjSteps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(index)}
              className={`cursor-pointer flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                currentStep === index ? 'border-blue-500' : 'border-transparent'
              }`}
            >
              <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HajjPage;
