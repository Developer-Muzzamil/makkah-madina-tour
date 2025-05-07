import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from '../components/PageComponent';
const hajjSteps = [
  {
    title: "🕋 1. Ihram & Niyyah (Intention)",
    image: "/images/umrah/IhramNiyyah.webp",
    content: [
      "At the Miqat, wear Ihram garments and make the intention for Hajj by saying:Labbayk Allahumma Hajjan",
      "Begin reciting the Talbiyah:Labbayk Allahumma labbayk…"
    ]
  },
  {
    title: "🕋 2. Tawaf al-Qudum (Arrival Tawaf) (for those not doing Hajj al-Tamattu’)",
    image: "/images/umrah/tawaf.webp",
    content: [
      "Upon arriving in Makkah, perform Tawaf around the Kaaba.",
      "Pray 2 Rakats behind Maqam Ibrahim.",
      "Note : Those doing Hajj al-Tamattu' already did Umrah before Hajj and wait in Makkah in regular clothes until 8th Dhul-Hijjah."
    ]
  },
  {
    title: "🏕️ 3. 8th Dhul Hijjah – Day of Tarwiyah (Mina)",
    image: "/public/images/hajj/minaa.png",
    content: [
      "Re-enter Ihram and proceed to Mina.",
      "Stay the day and night there, offering Dhuhr, Asr, Maghrib, Isha, and Fajr prayers (shortened, but not combined)."
    ]
  },
  {
    title: "🏞️ 4. 9th Dhul Hijjah – Day of Arafah",
    image: "/public/images/hajj/arafat.jpg",
    content: [
      "After Fajr, go to Mount Arafat.",
      "This is the most important pillar of Hajj.",
      "Spend the day in Dua, Dhikr, and prayer until sunset.",
      "Do not leave before sunset."
    ]
  },
  {
    title: "🌙 5. 9th Dhul Hijjah (Evening) – Muzdalifah",
    image: "/images/hajj/muzda.jpg",
    content: [
      "After sunset, travel to Muzdalifah.",
      "Pray Maghrib and Isha (combined).",
      "Collect 49 or 70 pebbles for stoning.",
      "Sleep under the open sky."    
    ]
  },
  {
    title: "🪨 6. 10th Dhul Hijjah – Eid al-Adha: Jamarat, Sacrifice, Haircut",
    image: "/images/hajj/day10.png",
    content: [
      "Go to Jamarat al-Aqaba and throw 7 stones at the largest pillar.",
      "Offer the Qurbani (animal sacrifice).",
      "Men: Shave or shorten hair", 
      "Women: cut a fingertip-length of hair.",
      "Remove Ihram (partial or full exit depending on what is done)."
    ]
  },
  {
    title: "🕋 7. Tawaf al-Ifadah (Main Tawaf)",
    image: "/images/hajj/tawaaf.png",
    content: [
      "Return to Makkah and perform this Tawaf, a major part of Hajj.",
      "Follow it with Sa’i between Safa and Marwah (if not already done).",
      "After this, Ihram is fully ended."
    ]
  },
  {
    title: "🏕️ 8. 11th & 12th Dhul Hijjah – Days of Tashreeq (Mina)",
    image: "/images/hajj/stoning.png",
    content: [
      "Stay in Mina.",
      "Each day, throw 7 pebbles at each of the 3 Jamarat (small, medium, large).",
      "You may leave after the 12th, or stay for the 13th for extra reward."
    ]
  },
  {
    title: "🕋 9. Farewell Tawaf (Tawaf al-Wida)",
    image: "/images/hajj/dua.png",
    content: [
      "Before leaving Makkah, perform the Farewell Tawaf.",
      "It is obligatory for non-residents of Makkah."
    ]
  }
];


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
      <h2 className="text-3xl font-bold mb-12 text-center">Hajj Timeline</h2>
      <div className="relative flex w-max mx-auto items-center justify-between px-8">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-amber-900 z-0" />

        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center w-40 mx-4">
            {index % 2 === 0 ? (
              <>
                <div className="mb-2 text-center">
                  <div className="font-semibold text-purple-800">Step {index + 1}</div>
                  <div className="text-xs text-amber-700 mt-1">{step}</div>
                </div>
                <div className="w-0.5 h-6 bg-gray-400 mb-2"></div>
                <div className="w-16 h-6 bg-amber-400 rounded-md"></div>
              </>
            ) : (
              <>
                <div className="w-16 h-6 bg-amber-400 rounded-md"></div>
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
  const goToStep = (index) => {
    setCurrentStep(index);
  }

  return (
<div>
          <HeroSection
            title="Hajj"
            subtitle="The Fifth Pillar of Islam — A Journey of Worship, Unity, and Renewal."
            backgroundImage="/images/hajj/kaaba.jpg" 
            hadithText='Whoever performs Hajj for the sake of Allah and does not commit any obscenity or evil, he will return as the day his mother bore him (free from sin).'
            hadithSource="Sahih Muslim 1350"
          />
<TimelineSection1 />

    {/* <div className="flex flex-col items-center justify-center">
      <div className="relative w-full h-80 bg-cover bg-center" style={{ backgroundImage: `url()` }}>
        <div className="absolute inset-0 bg-opacity-10 flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl font-bold">Hajj – The Journey of a Lifetime</h1>
          <p className="text-white mt-2">Experience the sacred pilgrimage to the House of Allah</p>
          
        </div>
      </div> */}

      

      <div className="flex flex-col items-center justify-center p-6 w-full">
        <div className="relative w-full max-w-3xl h-[450px] overflow-hidden rounded-2xl shadow-2xl bg-white">
      <p className="text-center text-2xl font-extrabold mb-4">Steps to Perform Hajj</p> 
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
              <span className="absolute top-4 left-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md z-10">
    Step {currentStep + 1}
  </span>
              <img
                src={hajjSteps[currentStep].image}
                alt={hajjSteps[currentStep].title}
                className="w-full h-52 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-2 text-center">{hajjSteps[currentStep].title}</h2>
              <ul className="text-gray-700 text-xl list-disc list-inside space-y-1">
                {hajjSteps[currentStep].content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
        
        
        {/* Navigation Buttons */}
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