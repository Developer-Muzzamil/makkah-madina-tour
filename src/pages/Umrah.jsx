import React, { useState, useEffect,useRef} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from "../components/PageComponent";
import { ChevronLeft, ChevronRight } from 'lucide-react';

const umrahSteps = [
  {
    title: "Ihram & Niyyah",
    image: "/images/umrah/IhramNiyyah.webp",
    content: [
      "Wear the special white clothing (Ihram) at the Miqat.",
      "Make the Niyyah (intention) for Umrah by saying:'Labbayk Allahumma Umrah' (Here I am, O Allah, to perform Umrah).",
      "Recite Talbiyah:'Labbayk Allahumma labbayk...'"
    ]
  },
  {
    title: "Enter Masjid al-Haram",
    image: "/images/umrah/MasjidalHaram.webp",
    content: [
      "Enter with your right foot and recite the Du’a for entering a mosque.",
      "Maintain a humble heart and respect for the sanctity of the holy place."
    ]
  },
  {
    title: "Tawaf around the Kaaba",
    image: "/images/umrah/tawaf.webp",
    content: [
      "Perform 7 anti-clockwise circuits (Tawaf) around the Kaaba starting from the Black Stone (Hajr al-Aswad).",
      "Touch or kiss the Black Stone if possible; otherwise, point towards it.",
      "Say Duas or Dhikr while walking, and raise your hands toward the Black Stone each time."
    ]
  },
  {
    title: "Pray Two Rakats at Maqam Ibrahim",
    image: "/images/umrah/MaqaIbrahim.webp",
    content: [
      "After Tawaf, offer 2 Rakats of prayer behind Maqam Ibrahim or anywhere in Masjid al-Haram."
    ]
  },
  {
    title: "Sa’i between Safa and Marwah",
    image: "/images/umrah/SafaMarwah.webp",
    content: [
      "Walk 7 times between the hills of Safa and Marwah.",
      "Begin at Safa, walk to Marwah (1), then back to Safa (2), and continue until you complete 7 circuits.."
    ]
  },
  {
    title: "Hair Cutting (Tahalul)",
    image: "/images/umrah/HalqorTaqsir.webp",
    content: [
      "Men: shave head (Halq) or shorten hair.",
      "Women: cut a small portion (tip) of their hair.",
      "After this, you exit Ihram and Umrah is complete.",
    ]
  },
  {
    title: "Dua at the Kaaba",
    image: "/images/umrah/DuaattheKaaba.webp",
    content: [
      "Stand near the Kaaba and make personal supplications (Dua).",
      "It is recommended to pray for yourself, family, and the Ummah."
    ]
  },
  {
    title: "Drinking Zamzam Water",
    image: "/images/umrah/DrinkingZamzamWater.webp",
    content: [
      "Drink Zamzam water after performing Tawaf and Sa'i.",
      "It is a sacred and blessed drink, providing spiritual nourishment."
    ]
  },
  {
    title: "Visit to Medina (Optional)",
    image: "/images/umrah/VisittoMedina.webp",
    content: [
      "A visit to the Prophet’s Mosque (Masjid an-Nabawi) is optional but highly recommended.",
      "Offer prayers and seek blessings at the tomb of Prophet Muhammad (PBUH)."
    ]
  }
];


function TimelineSection1() {
  const steps = [
    "Ihram & Niyyah",
    "Masjid al-Haram",
    "Tawaf around the Kaaba",
    "Pray at Maqam Ibrahim",
    "Sa’i between Safa and Marwah",
    "Hair Cutting (Tahalul)",
    "Dua at the Kaaba",
    "Drinking Zamzam Water",
    "Visit to Madina (Optional)",
  ];

  return (
    <div className="relative w-full overflow-x-auto py-16">
      <h2 className="text-3xl font-bold mb-12 text-center">Umrah Timeline</h2>
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



// Main Component
  // return (
  //   <div className="relative w-full overflow-x-auto py-16">
  //     <h2 className="text-3xl font-bold mb-12 text-center">Umrah Timeline</h2>
  //     <div className="relative flex w-max mx-auto items-center justify-between px-8">
  //       <div className="absolute left-0 right-0 top-1/2 h-1 bg-amber-900 z-0" />

  //       {steps.map((step, index) => (
  //         <div key={index} className="relative z-10 flex flex-col items-center w-40 mx-4">
  //           {index % 2 === 0 ? (
  //             <>
  //               <div className="mb-2 text-center">
  //                 <div className="font-semibold text-purple-800">Step {index + 1}</div>
  //                 <div className="text-xs text-amber-700 mt-1">{step}</div>
  //               </div>
  //               <div className="w-0.5 h-6 bg-gray-400 mb-2"></div>
  //               <div className="w-16 h-6 bg-amber-400 rounded-md"></div>
  //             </>
  //           ) : (
  //             <>
  //               <div className="w-16 h-6 bg-amber-400 rounded-md"></div>
  //               <div className="w-0.5 h-6 bg-gray-400 mt-2"></div>
  //               <div className="mt-2 text-center">
  //                 <div className="font-semibold text-purple-800">Step {index + 1}</div>
  //                 <div className="text-xs text-amber-700 mt-1">{step}</div>
  //               </div>
  //             </>
  //           )}
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );


const UmrahStepSlider = ({ umrahSteps, autoPlayInterval = 5000 }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const sliderRef = useRef(null);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % umrahSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + umrahSteps.length) % umrahSteps.length);
  };

  useEffect(() => {
    const interval = setInterval(nextStep, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval]);

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-10 py-8 w-full bg-white">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
        Steps to Perform Umrah
      </h1>

      <div className="relative w-full max-w-4xl">
        <div ref={sliderRef} className="h-[520px] overflow-hidden rounded-2xl shadow-xl bg-white">
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
                src={umrahSteps[currentStep].image}
                alt={umrahSteps[currentStep].title}
                className="w-full h-[260px] object-cover rounded-lg mb-4 bg-white shadow-md"
              />

              <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">
                {umrahSteps[currentStep].title}
              </h2>

              <ul className="list-disc text-gray-600 text-base space-y-1 px-4">
                {umrahSteps[currentStep].content.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={prevStep}
            className="p-2 rounded-full bg-white shadow hover:bg-amber-200 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
        </div>
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={nextStep}
            className="p-2 rounded-full bg-white shadow hover:bg-amber-200 transition"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Optional Step indicators */}
      <div className="flex gap-2 mt-6">
        {umrahSteps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentStep ? "bg-amber-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};





// Main Component
const Umrah = () => {

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Hero Section */}
            <HeroSection
              title="Umrah"
              subtitle="Purify Your Soul, Strengthen Your Faith, and Seek Divine Mercy"
              backgroundImage="/images/umrah/mecca-umrah.webp" // Updated path
              hadithText="The Prophet ﷺ said: 'Whoever performs Umrah and visits the Sacred House of Allah (the Ka'bah) and performs Tawaf, will have his sins forgiven.'"
              hadithSource="Sunan Ibn Majah 2870"
            />
            <TimelineSection1 />

      <UmrahStepSlider umrahSteps={umrahSteps} />



    </div>
  );
};

export default Umrah;
