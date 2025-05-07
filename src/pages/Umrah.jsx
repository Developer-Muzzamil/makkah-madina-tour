import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from "../components/PageComponent";

// Image Paths

// const umrahSteps = [
//   {
//     title: "Ihram & Niyyah",
//     image: '/images/umrah/IhramNiyyah.webp',
//     content: [
//       "Enter the state of Ihram before reaching the Miqat. This is a sacred state that helps purify the soul.",
//       "Make a sincere intention (Niyyah) to perform Umrah for the sake of Allah.",
//       "Men wear unstitched white garments, while women wear a simple, modest dress covering the whole body.",
//       "Make sure to recite the Talbiyah upon entering Ihram and maintain it throughout your journey.",
//       "Avoid any sinful actions or behavior while in the state of Ihram, as this will invalidate your Umrah."
//     ]
//   },
//   {
//     title: "Tawaf",
//     image: '/images/umrah/tawaf.webp',
//     content: [
//       "Perform 7 circuits around the Kaaba starting from the Black Stone (Al-Hajar Al-Aswad).",
//       "Ensure you are in a state of Wudu (ablution) before beginning Tawaf.",
//       "Each circuit represents a symbolic act of closeness to Allah. Remember that the Tawaf is a spiritual act, not just a physical one.",
//       "Try to perform Tawaf with deep concentration and humility, focusing on your prayers.",
//       "After completing Tawaf, offer 2 Rak'ahs of prayer behind the Maqam Ibrahim, a place revered for its association with Prophet Ibrahim (AS)."
//     ]
//   },
//   {
//     title: "Pray at Maqam Ibrahim",
//     image: '/images/umrah/MaqaIbrahim.webp',
//     content: [
//       "After Tawaf, head towards Maqam Ibrahim (the Station of Ibrahim) and offer 2 Rak'ahs of prayer.",
//       "This prayer is highly recommended and a chance for personal supplication. Ask Allah for forgiveness and blessings for yourself and your loved ones.",
//       "Drink Zamzam water, a blessed source of water that was miraculously provided to Hajar (the mother of Prophet Isma'il).",
//       "The Maqam Ibrahim is where Prophet Ibrahim (AS) stood while building the Kaaba with his son Isma'il (AS)."
//     ]
//   },
//   {
//     title: "Sa’i between Safa & Marwah",
//     image: '/images/umrah/SafaMarwah.webp',
//     content: [
//       "Walk 7 times between the hills of Safa and Marwah, starting at Safa and ending at Marwah.",
//       "Sa’i commemorates the act of Hajar searching for water for her son Isma'il (AS).",
//       "While walking, remember Hajar's devotion and trust in Allah’s plan.",
//       "It's a highly spiritual part of the pilgrimage, and you should make du'a (supplication) as you walk between the hills.",
//       "After completing the Sa’i, you will feel spiritually renewed, reflecting the faith and resilience of Hajar."
//     ]
//   },
//   {
//     title: "Halq or Taqsir",
//     image: '/images/umrah/HalqorTaqsir.webp',
//     content: [
//       "The final step of Umrah involves the ritual of Halq (shaving the head) or Taqsir (shortening the hair).",
//       "Men who perform Halq shave their heads completely, symbolizing the shedding of sin and a fresh start.",
//       "Women are encouraged to cut a small portion of their hair, signifying the same sense of spiritual renewal.",
//       "This ritual symbolizes the completion of your Umrah and marks a moment of humility before Allah.",
//       "It's a reminder that true spiritual transformation comes from surrendering to the will of Allah."
//     ]
//   },
//   {
//     title: "Arrival at Masjid al-Haram",
//     image: '/images/umrah/MasjidalHaram.webp',
//     content: [
//       "Upon arrival at Masjid al-Haram in Mecca, stand in awe of the Kaaba, the House of Allah.",
//       "Take a moment to offer a prayer of gratitude for your journey and the opportunity to perform Umrah.",
//       "The Masjid al-Haram is the holiest mosque in Islam, and it’s where millions of Muslims gather for prayer daily.",
//       "Make du'a for yourself, your family, and the entire Muslim ummah. Ask for peace, health, and guidance.",
//       "Remember, the experience of seeing the Kaaba is a deeply emotional one, and it's important to take it in with sincerity and awe."
//     ]
//   },
//   {
//     title: "Dua at the Kaaba",
//     image: '/images/umrah/DuaattheKaaba.webp',
//     content: [
//       "Stand near the Kaaba and make personal supplications (Dua).",
//       "This is a powerful moment, as Allah is closest to His servant when they are making sincere supplications in front of the Kaaba.",
//       "Pray for your desires, for the Muslim ummah, and for peace and harmony in the world.",
//       "Remember that this moment is a gift, as it's a rare and blessed opportunity to be in direct proximity to the Kaaba.",
//       "Offer gratitude for the privilege of being there and make heartfelt du'a for yourself and your loved ones."
//     ]
//   },
//   {
//     title: "Drinking Zamzam Water",
//     image: '/images/umrah/DrinkingZamzamWater.webp',
//     content: [
//       "Drink Zamzam water, a source of blessings and purity. It was miraculously provided to Hajar and her son Isma'il (AS).",
//       "The Prophet Muhammad (PBUH) recommended drinking Zamzam water for healing, both physically and spiritually.",
//       "Many pilgrims find strength and peace from drinking Zamzam, and it is often shared among family and friends as a reminder of their journey.",
//       "After drinking Zamzam, make du'a for your health, prosperity, and the well-being of your family and community."
//     ]
//   },
//   {
//     title: "Visit to Medina (Optional)",
//     image: '/images/umrah/VisittoMedina.webp',
//     content: [
//       "A visit to Medina and the Prophet’s Mosque (Masjid an-Nabawi) is optional, but highly recommended for spiritual enrichment.",
//       "In Medina, offer prayers at the Prophet’s Mosque and visit the tomb of Prophet Muhammad (PBUH).",
//       "It is a place of immense blessing, and visiting the grave of the Prophet allows you to offer peace and blessings (Salat) upon him.",
//       "Prayers offered in Masjid an-Nabawi hold immense reward, and visiting the Rawdah (the space between the Prophet’s tomb and his pulpit) is a highly revered act.",
//       "Take time to reflect on the teachings and example of Prophet Muhammad (PBUH) and pray for the guidance to follow his path."
//     ]
//   }
// ];

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
    image: "/public/images/umrah/MasjidalHaram.webp",
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
    "Enter Ihram & Travel to Mina",
    "Stand at Arafat",
    "Night in Muzdalifah",
    "Stoning & Sacrifice",
    "Tawaf & Sa’i",
    "Final Days in Mina",
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
const Umrah = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % umrahSteps.length);
      }, 6000);
      return () => clearInterval(interval);
    }, []);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % umrahSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + umrahSteps.length) % umrahSteps.length);
  };

  const goToStep = (index) => {
    setCurrentStep(index);
  };

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



      {/* Umrah Step Slider */}
      <div className="flex flex-col items-center justify-center p-6 w-full">
      <div className="relative w-full max-w-3xl h-[450px] overflow-hidden rounded-2xl shadow-2xl bg-white">
      <p className="text-center text-2xl font-extrabold mb-4">Steps to Perform Umrah</p> 
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
    src={umrahSteps[currentStep].image}
    alt={umrahSteps[currentStep].title}
    className="w-full h-52 object-cover rounded-lg mb-4 bg-white"
  />
  <h2 className="text-2xl pt-10 font-bold mb-2 text-center">{umrahSteps[currentStep].title}</h2>
  <ul className="text-gray-700 text-xl list-disc list-inside space-y-1">
    {umrahSteps[currentStep].content.map((point, idx) => (
      <li key={idx}>{point}</li>
    ))}
  </ul>
</motion.div>
</AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full max-w-3xl mt-4 px-8">
          <button
            onClick={prevStep}
            className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex overflow-x-auto w-full max-w-4xl mt-6 space-x-3 px-4 pb-2">
          {umrahSteps.map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentStep(index)}
              className={`cursor-pointer flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all
                ${currentStep === index ? 'border-blue-500' : 'border-transparent'}
              `}
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
    </div>
  );
};

export default Umrah;
