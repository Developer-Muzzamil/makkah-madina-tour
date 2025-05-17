import React, { useState, useEffect,useRef  } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HeroSection } from '../components/PageComponent';

const hajjSteps = [
  {
    title: "Ihram & Niyyah (Intention)",
    image: "/images/umrah/IhramNiyyah.webp",
    content: [
      "At the Miqat, wear Ihram garments and make the intention for Hajj by saying: Labbayk Allahumma Hajjan",
      "Begin reciting the Talbiyah: Labbayk Allahumma labbayk…"
    ]
  },
  {
    title: "Tawaf al-Qudum (Arrival Tawaf)",
    image: "/images/umrah/tawaf.webp",
    content: [
      "Upon arriving in Makkah, perform Tawaf around the Kaaba.",
      "Pray 2 Rakats behind Maqam Ibrahim.",
      "Note: Those doing Hajj al-Tamattu' already did Umrah before Hajj and wait in Makkah in regular clothes until 8th Dhul-Hijjah."
    ]
  },
  {
    title: "8th Dhul Hijjah – Day of Tarwiyah (Mina)",
    image: "/images/hajj/minaa.png",
    content: [
      "Re-enter Ihram and proceed to Mina.",
      "Stay the day and night there, offering Dhuhr, Asr, Maghrib, Isha, and Fajr prayers (shortened, but not combined)."
    ]
  },
  {
    title: "9th Dhul Hijjah – Day of Arafah",
    image: "/images/hajj/arafat.jpg",
    content: [
      "After Fajr, go to Mount Arafat.",
      "This is the most important pillar of Hajj.",
      "Spend the day in Dua, Dhikr, and prayer until sunset.",
      "Do not leave before sunset."
    ]
  },
  {
    title: "9th Dhul Hijjah (Evening) – Muzdalifah",
    image: "/images/hajj/muzda.jpg",
    content: [
      "After sunset, travel to Muzdalifah.",
      "Pray Maghrib and Isha (combined).",
      "Collect 49 or 70 pebbles for stoning.",
      "Sleep under the open sky."
    ]
  },
  {
    title: "10th Dhul Hijjah – Eid al-Adha: Jamarat, Sacrifice, Haircut",
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
    title: "Tawaf al-Ifadah (Main Tawaf)",
    image: "/images/hajj/tawaaf.png",
    content: [
      "Return to Makkah and perform this Tawaf, a major part of Hajj.",
      "Follow it with Sa’i between Safa and Marwah (if not already done).",
      "After this, Ihram is fully ended."
    ]
  },
  {
    title: "11th & 12th Dhul Hijjah – Days of Tashreeq (Mina)",
    image: "/images/hajj/stoning.png",
    content: [
      "Stay in Mina.",
      "Each day, throw 7 pebbles at each of the 3 Jamarat (small, medium, large).",
      "You may leave after the 12th, or stay for the 13th for extra reward."
    ]
  },
  {
    title: "Farewell Tawaf (Tawaf al-Wida)",
    image: "/images/hajj/dua.png",
    content: [
      "Before leaving Makkah, perform the Farewell Tawaf.",
      "It is obligatory for non-residents of Makkah."
    ]
  }
];

const HajjStepSlider = ({ hajjSteps, autoPlayInterval = 5000 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const sliderRef = useRef(null);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % hajjSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + hajjSteps.length) % hajjSteps.length);
  };

  useEffect(() => {
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [hajjSteps.length, autoPlayInterval]);

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-8 w-full bg-white">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Steps to Perform Hajj
      </h1>

      <div className="relative w-full max-w-4xl">
        <div
          ref={sliderRef}
          className="h-[520px] overflow-hidden rounded-2xl shadow-xl bg-white"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.7, ease: 'easeInOut' }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) nextStep();
                else if (info.offset.x > 100) prevStep();
              }}
              className="w-full h-full flex flex-col items-center justify-start px-6 pt-6 pb-4 cursor-grab"
            >
              <div className="w-full flex justify-start mb-2">
                <div className="bg-amber-200 text-amber-900 text-sm font-semibold px-3 py-1 rounded-full shadow">
                  Step {currentStep + 1}
                </div>
              </div>

              <img
                src={hajjSteps[currentStep].image}
                alt={hajjSteps[currentStep].title}
                className="w-full h-100 object-cover rounded-lg mb-5 bg-white shadow-md"
              />

              <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
                {hajjSteps[currentStep].title}
              </h2>

              <ul className="text-gray-700 text-lg list-disc list-inside space-y-1 text-left max-w-xl">
                {hajjSteps[currentStep].content.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          onClick={prevStep}
          className={`absolute left-[-48px] top-1/2 transform -translate-y-1/2 bg-amber-100 p-2 rounded-full shadow cursor-pointer transition-opacity
            ${hajjSteps.length <= 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-amber-200'}`}
        >
          <ChevronLeft className="w-6 h-6 text-amber-900" />
        </div>
        <div
          onClick={nextStep}
          className={`absolute right-[-48px] top-1/2 transform -translate-y-1/2 bg-amber-100 p-2 rounded-full shadow cursor-pointer transition-opacity
            ${hajjSteps.length <= 1 ? 'opacity-50 pointer-events-none' : 'hover:bg-amber-200'}`}
        >
          <ChevronRight className="w-6 h-6 text-amber-900" />
        </div>
      </div>

      <div className="flex overflow-x-auto w-full max-w-5xl mt-6 space-x-4 px-4 pb-2">
        {hajjSteps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentStep(index)}
            className={`cursor-pointer flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-4 transition-all duration-300
              ${currentStep === index ? 'border-amber-300 shadow-lg' : 'border-transparent hover:border-amber-100'}`}
          >
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};


const TimelineSection1 = () => {
  const steps = [
    "Ihram & Niyyah (Intention)",
    "Tawaf al-Qudum (Arrival Tawaf)",
    "8th Dhul Hijjah – Day of Tarwiyah (Mina)",
    "9th Dhul Hijjah – Day of Arafah",
    "9th Dhul Hijjah (Evening ) – Muzdalifah",
    "10th Dhul Hijjah – Eid al-Adha: Jamarat, Sacrifice, Haircut",
    "Tawaf al-Ifadah (Main Tawaf)",
    "11th & 12th Dhul Hijjah – Days of Tashreeq (Mina)",
    "Farewell Tawaf (Tawaf al-Wida)",
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
                  <div className="text-xs text-amber-700 mt-1 pb-10">{step}</div>
                </div>
                <div className="w-0.5 h-6 bg-gray-400 mb-2"></div>
                <div className="w-16 h-6 bg-amber-400 rounded-md"></div>
              </>
            ) : (
              <>
                <div className="w-16 h-6 bg-amber-400 rounded-md"></div>
                <div className="w-0.5 h-6 bg-gray-400 mt-2"></div>
                <div className="mt-2 text-center">
                  <div className="font-semibold text-purple-800 pt-10">Step {index + 1}</div>
                  <div className="text-xs text-amber-700 mt-1">{step}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const HajjPage = () => {
  return (
    <div>
      <HeroSection
        title="Hajj"
        subtitle="The Fifth Pillar of Islam — A Journey of Worship, Unity, and Renewal."
        backgroundImage="/images/hajj/kaaba.jpg"
        hadithText="Whoever performs Hajj for the sake of Allah and does not commit any obscenity or evil, he will return as the day his mother bore him (free from sin)."
        hadithSource="Sahih Muslim 1350"
      />
      <TimelineSection1 />
      <HajjStepSlider hajjSteps={hajjSteps} autoPlayInterval={5000} />
    </div>
  );
};

export default HajjPage;
