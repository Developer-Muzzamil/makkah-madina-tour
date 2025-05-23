import React, { useEffect, useMemo, useState } from "react";
import { Button, FormLabel, TextField, TextareaAutosize} from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const API_URL = import.meta.env.VITE_API_URL;
import { Formik, Form, Field, ErrorMessage,useFormik} from "formik";
import * as Yup from "yup";
import { FaTimesCircle } from "react-icons/fa";



//herosection
export const HeroSection = ({
  title,
  title2,
  subtitle,
  backgroundImage,
  hadithText,
  hadithSource,
}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const heroHeight = typeof window !== "undefined" ? window.innerHeight * 0.8 : 600;
  const cappedScroll = Math.min(scrollY, heroHeight);
  const translateY = cappedScroll;
  const opacity = 1 - cappedScroll / heroHeight;

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Animated Background Image */}
      <motion.img
        src={backgroundImage}
        alt="Hero Background"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="w-full h-full object-cover"
      />

      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Text Content */}
      <div
        className="absolute top-10 left-1/2 z-10 w-[90%] md:w-[80%] text-center px-4"
        style={{
          transform: `translate(-50%, ${translateY}px)`,
          opacity,
        }}
      >
        <h1 className="text-4xl md:text-7xl font-bold mb-4 text-white break-words">
          {title}
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white break-words">
          {title2}
        </h2>
        <p className="text-lg md:text-2xl text-white break-words">
          {subtitle}
        </p>

        {/* Dynamic Hadith Section */}
        {hadithText && (
          <div className="mt-8 mx-auto w-[90%] md:w-[62%] bg-white/30 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
            <p className="text-sm md:text-xl italic text-white leading-relaxed">
              “{hadithText}”
              {hadithSource && (
                <span className="text-xl block mt-2 text-gray-200">– {hadithSource}</span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


//homepage card
export const Card = ({
  image,
  title,
  description,
  link,
  minHeight = "min-h-[100px]",
}) => {
  return (
    <Link to={link} className="w-full sm:w-[300px] md:w-[350px] lg:w-[400px]">
      <motion.div
        className="bg-white shadow-lg rounded-2xl overflow-hidden transition-all h-[300px]"
        whileHover={{
          scale: 1.05,
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: "12px",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Image at the top */}
        {image && (
          <motion.img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Title and description below image */}
        <div className={`p-4 ${minHeight}`}>
          <motion.h3
            className="text-2xl font-bold mb-2 text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className="text-base text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {description}

          </motion.p>
        </div>
      </motion.div>
    </Link>
  );
};


//section for displaying an image and text side by side
export const ImageTextSection = ({
  image = null,
  title = null,
  description,
  reverse = false,
  colorScheme = "default",
}) => {
  const hasImage = !!image;

  const bgColor =
    colorScheme === "alt"
      ? "bg-gray-900 text-white"
      : "bg-white text-gray-800";

  const textColor = colorScheme === "alt" ? "text-white" : "text-gray-800";

  const flexDirection = hasImage
    ? reverse
      ? "md:flex-row-reverse"
      : "md:flex-row"
    : "flex-col";

  return (
    <motion.section
      className={`px-6 py-10 ${bgColor}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {title && (
        <h2
          className={`text-3xl font-bold mb-6 ${
            hasImage ? "text-center" : "text-left"
          } ${textColor}`}
        >
          {title}
        </h2>
      )}

      <div
        className={`flex flex-col ${hasImage ? flexDirection : ""} items-center gap-8`}
      >
        {hasImage && (
          <motion.div
            className="w-full md:w-2/5"
            initial={{ opacity: 0, x: reverse ? 100 : -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={image}
              alt={title || "Image"}
              className="w-full object-cover rounded-xl shadow-md max-h-[500px]"
            />
          </motion.div>
        )}

        <motion.div
          className={`h-full flex items-center justify-center ${
            hasImage ? "w-full md:w-3/5" : "w-full"
          }`}
          initial={{ opacity: 0, x: reverse ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* <p className={`leading-relaxed text-justify ${textColor} whitespace-normal`}>
            {description}
          </p> */}
          {Array.isArray(description) ? (
            <ul className={`list-disc pl-5 leading-relaxed text-2xl text-justify ${textColor} whitespace-normal`}>
              {description.map((point, index) => (
                <li key={index}>{point}</li>
          ))}
            </ul>
) : (
  <p className={`leading-relaxed text-justify ${textColor} whitespace-normal`}>
    {description}
  </p>
)}
        </motion.div>
      </div>
    </motion.section>
  );
};
  

//placecards used in aboutus page
export const PlacesCards = ({ title, places }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {places.map((place, index) => (
          <Card
            key={index}
            image={place.image}
            title={place.title}
            description={place.description}
            link={place.link || "#"}
          />
        ))}
      </div>
    </div>
  );
};

//expcardabt
export const CardE = ({ title, places = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const root = document.documentElement;
      if (window.innerWidth < 640) root.style.setProperty("--grid-cols", "1");
      else if (window.innerWidth < 1024) root.style.setProperty("--grid-cols", "2");
      else root.style.setProperty("--grid-cols", "3");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const expandedPlace = expandedIndex !== null ? places[expandedIndex] : null;

  // Animation configs
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.7, delay: 0.07, ease: [0.4, 0, 0.2, 1] }
    },
    exit: { opacity: 0, transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } }
  };

  const modalCardVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 60 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.65, delay: 0.18, ease: [0.4, 0, 0.2, 1] }
    },
    exit: { opacity: 0, scale: 0.96, y: 60, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] }
    },
    exit: { opacity: 0, y: 36, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  };

  const gradientBg = "bg-gradient-to-br from-[#f8fafc] via-[#f9efe3] to-[#e9f8f5]";

  // Modal, with only modal scroll on mobile, columns scrollable only on md+
  const Modal = ({ children, onClose }) =>
    ReactDOM.createPortal(
      <AnimatePresence>
        <motion.div
          key="modal-backdrop"
          className="fixed inset-0 z-[2000] flex items-center justify-center min-h-screen bg-[rgba(20,24,34,0.68)] backdrop-blur-md"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={onClose}
        >
          <motion.div
            className={`${gradientBg} relative w-full max-w-3xl md:max-w-4xl max-h-[90vh] my-8 rounded-3xl shadow-2xl flex flex-col md:flex-row border border-yellow-50 overflow-y-auto`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalCardVariants}
            onClick={e => e.stopPropagation()}
            style={{
              maxHeight: "90vh",
              overflowY: "auto"
            }}
          >
            <motion.div className="flex w-full md:flex-row flex-col">
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );

  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
      <div
        className="grid gap-8 justify-items-center mx-auto"
        style={{
          gridTemplateColumns: `repeat(var(--grid-cols, 1), minmax(0, 1fr))`,
          maxWidth: "100%",
        }}
      >
        {places.map((place, index) => (
          <motion.div
            key={place.id || index}
            className="bg-white/80 shadow-md rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 duration-300 w-full max-w-sm border border-yellow-100"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #e9f8f570" }}
            onClick={() => setExpandedIndex(index)}
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {place.tier} – {place.name}
              </h3>
              <p className="text-gray-600 text-sm">{place.description}</p>
              <p className="text-sm mt-2 font-semibold text-green-600">
                {place.startingPrice}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Animated Portal Modal */}
      <AnimatePresence>
        {expandedPlace && (
          <Modal onClose={() => setExpandedIndex(null)}>
            {/* Left Column: Package Details */}
            <motion.div
              className="md:w-2/3 w-full text-left p-8 md:p-10 md:pr-0 flex flex-col justify-center md:overflow-y-auto md:max-h-[85vh]"
              variants={columnVariants}
            >
              <motion.h3
                className="text-3xl md:text-4xl font-extrabold text-[#168c5f] mb-2 tracking-tight drop-shadow-lg"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: 0.38, duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
              >
                {expandedPlace.tier} <span className="text-gray-900">– {expandedPlace.name}</span>
              </motion.h3>
              <motion.p
                className="mb-6 text-gray-700 text-lg italic"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.42, duration: 0.48, ease: [0.4, 0, 0.2, 1] } }}
              >
                {expandedPlace.description}
              </motion.p>
              <motion.ul
                className="list-none space-y-3 text-gray-800"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.5, duration: 0.38, ease: [0.4, 0, 0.2, 1] } }}
              >
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">⏳ Duration:</span>
                  {expandedPlace.duration}
                </li>
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">🏨 Makkah Hotel:</span>
                  {expandedPlace.makkahHotel}
                </li>
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">🏨 Madinah Hotel:</span>
                  {expandedPlace.madinahHotel}
                </li>
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">🚐 Transport:</span>
                  {expandedPlace.transport}
                </li>
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">🍽 Meals:</span>
                  {expandedPlace.meals}
                </li>
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">🕌 Ziyarat Tour:</span>
                  {expandedPlace.ziyarat}
                </li>
                {expandedPlace.visaAndInsurance && (
                  <li>
                    <span className="font-bold text-[#168c5f] mr-2">🛂 Visa & Insurance:</span>
                    {expandedPlace.visaAndInsurance}
                  </li>
                )}
                {expandedPlace.visaInsuranceSim && (
                  <li>
                    <span className="font-bold text-[#168c5f] mr-2">🛂 Visa, Insurance & SIM:</span>
                    {expandedPlace.visaInsuranceSim}
                  </li>
                )}
                {expandedPlace.visaInsuranceVIP && (
                  <li>
                    <span className="font-bold text-[#168c5f] mr-2">🛂 Visa, Insurance, VIP Lounge:</span>
                    {expandedPlace.visaInsuranceVIP}
                  </li>
                )}
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">👥 Group Size:</span>
                  {expandedPlace.groupSize}
                </li>
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">🎁 Extras:</span>
                  {expandedPlace.extras.join(", ")}
                </li>
                <li>
                  <span className="font-bold text-[#168c5f] mr-2">💰 Starting From:</span>
                  {expandedPlace.startingPrice}
                </li>
              </motion.ul>
            </motion.div>
            {/* Right Column: Enquiry Form */}
            <motion.div
              className="md:w-1/3 w-full bg-white/80 p-8 rounded-r-3xl shadow-inner flex flex-col justify-start border-l border-yellow-50 md:overflow-y-auto md:max-h-[85vh]"
              variants={columnVariants}
            >
              <EnquiryForm packageId={expandedPlace.id || expandedPlace.packageId || `umrah-${expandedIndex}`} />
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};
//Json Cards 
const navBtn =
  "rounded-lg px-4 py-2 font-semibold border border-gray-200 bg-white/90 text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed";
const backBtn =
  "rounded-lg px-4 py-2 font-medium border border-gray-200 bg-white/90 text-gray-400 hover:bg-gray-200 absolute top-5 left-5 z-10 flex items-center gap-2 shadow-sm";

export const ExpandableCard = ({ title, file }) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/data/${file}`)
      .then((res) => res.json())
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Failed to fetch from API:`, err);
        setLoading(false);
      });
  }, [file]);

  useEffect(() => {
    const handleResize = () => {
      const root = document.documentElement;
      if (window.innerWidth < 640) root.style.setProperty("--grid-cols", "1");
      else if (window.innerWidth < 768) root.style.setProperty("--grid-cols", "2");
      else root.style.setProperty("--grid-cols", "3");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const expandedPlace = expandedIndex !== null ? places[expandedIndex] : null;

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        type: "spring",
        stiffness: 350,
        damping: 25,
      },
    }),
  };

  // Animation variants for modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.23, ease: [0.4, 0, 0.2, 1] } },
  };

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading places...</div>;
  }

  return (
    <section className="py-12 px-4 md:px-12 bg-gradient-to-b from-white to-gray-50 min-h-screen">
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900 drop-shadow"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {title}
      </motion.h2>
      <div
        className="grid gap-8 justify-items-center"
        style={{
          gridTemplateColumns: `repeat(var(--grid-cols, 1), minmax(0, 1fr))`,
        }}
      >
        {places.map((place, index) => (
          <motion.div
            key={place.id}
            className="bg-white/90 shadow-xl rounded-2xl overflow-hidden cursor-pointer hover:scale-[1.031] transition-transform duration-300 w-full max-w-sm border border-gray-200 group"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{
              y: -4,
              boxShadow: "0 8px 32px 0 rgba(30, 41, 59, 0.10)",
            }}
            onClick={() => setExpandedIndex(index)}
            layout
          >
            <motion.img
              src={place.image}
              alt={place.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{place.title}</h3>
              <p className="text-gray-700 text-sm">{place.shortDescription}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {expandedPlace && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-center"
            onClick={() => setExpandedIndex(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: "rgba(16,18,23,0.84)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          >
            <motion.div
              className="relative w-[98vw] md:w-[75vw] max-h-[93vh] overflow-y-auto rounded-3xl shadow-2xl p-0 border border-gray-200 transition bg-white/95"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              style={{
                boxShadow:
                  "0 4px 32px 0 rgba(30, 41, 59, 0.20), 0 1.5px 6px 0 rgba(253, 230, 138, 0.12)",
                border: "1px solid #fef3c7",
              }}
            >
              {/* Back Button */}
              <motion.button
                onClick={() => setExpandedIndex(null)}
                className={backBtn}
                tabIndex={0}
                aria-label="Close card"
                whileTap={{ scale: 0.94 }}
                whileHover={{ scale: 1.05 }}
              >
                <FaArrowLeft className="mr-1" /> Back
              </motion.button>

              {/* Navigation */}
              <div className="flex justify-end gap-3 mb-2 mt-5 px-6">
                <motion.button
                  onClick={() => setExpandedIndex((prev) => prev - 1)}
                  disabled={expandedIndex <= 0}
                  className={navBtn + " flex items-center gap-2"}
                  tabIndex={0}
                  aria-label="Previous"
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.04 }}
                >
                  <FaArrowLeft />
                  Prev
                </motion.button>
                <motion.button
                  onClick={() => setExpandedIndex((prev) => prev + 1)}
                  disabled={expandedIndex >= places.length - 1}
                  className={navBtn + " flex items-center gap-2"}
                  tabIndex={0}
                  aria-label="Next"
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.04 }}
                >
                  Next
                  <FaArrowRight />
                </motion.button>
              </div>

              {/* Modal Content - HERO IMAGE AND CONTENT FULL WIDTH, ROUNDED CORNERS, REDUCED HEIGHT */}
              <div className="w-full">
                <div className="w-full px-[20px]">
                  <motion.img
                    src={expandedPlace?.heroImage || expandedPlace?.image}
                    alt={expandedPlace?.title || "Image"}
                    className="object-cover w-full max-h-94 rounded-3xl bg-white"
                    style={{ background: "#fefce8" }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.01 }}
                  />
                </div>
                <motion.div
                  className="w-full px-8 pb-10 pt-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 tracking-tight text-center">
                    {expandedPlace.title}
                  </h2>
                  {[...Array(5).keys()].map((i) => {
                    const desc = expandedPlace[`fullDescription${i === 0 ? "" : i + 1}`];
                    return desc ? (
                      <motion.p
                        key={i}
                        className="text-gray-700 leading-relaxed mb-4 text-base rounded-xl bg-white/80 px-4 py-2 shadow-sm border border-yellow-50 mx-auto max-w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.23 + i * 0.08, duration: 0.4 }}
                        style={{ width: "100%" }}
                      >
                        {desc}
                      </motion.p>
                    ) : null;
                  })}

                  {/* Gallery */}
                  {expandedPlace.gallery?.length > 0 && (
                    <div className="mt-7">
                      <h3 className="text-lg font-semibold mb-3 text-yellow-700">Gallery</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {expandedPlace.gallery.map((img, idx) => (
                          <motion.div
                            key={idx}
                            className="rounded-lg overflow-hidden shadow border border-yellow-50 bg-white"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.18 + idx * 0.06, duration: 0.25 }}
                            whileHover={{ scale: 1.04 }}
                          >
                            <img
                              src={img}
                              alt={`${expandedPlace.title} ${idx + 1}`}
                              className="object-cover w-full h-32"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
// Contact Us Form
export const ContactUs = () => {
  const initialValues = {
    name: "",
    phone: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .matches(/^[0-9\-+() ]*$/, "Invalid phone number")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // Use the environment variable for dynamic URL
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || "Your message has been sent successfully!");
        resetForm(); // Clear form
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false); // Enable submit button again
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Contact Us
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              {/* Name */}
              <div className="mb-6">
                <FormLabel htmlFor="name" className="mb-2 block text-gray-800">
                  Your Name
                </FormLabel>
                <Field
                  as={TextField}
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <FormLabel htmlFor="phone" className="mb-2 block text-gray-800">
                  Phone Number
                </FormLabel>
                <Field
                  as={TextField}
                  id="phone"
                  name="phone"
                  placeholder="123-456-7890"
                  type="tel"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <FormLabel htmlFor="email" className="mb-2 block text-gray-800">
                  Your Email
                </FormLabel>
                <Field
                  as={TextField}
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <FormLabel htmlFor="message" className="mb-2 block text-gray-800">
                  Your Message
                </FormLabel>
                <Field
                  as={TextareaAutosize}
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-yellow-500 transition duration-300"
              >
                Send Message
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};



//Enquiry Form
export const EnquiryForm = ({ packageId }) => {
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      packageId: packageId || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await fetch(`${API_URL}/enquiry`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          setSubmitted(true);
          resetForm();
        } else {
          setErrorMsg("Failed to submit enquiry. Please try again later.");
        }
      } catch (error) {
        setErrorMsg("Something went wrong.");
        console.error(error);
      }
      setLoading(false);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
      className="w-full"
    >
      {/* KEY: max-h-[90vh] overflow-y-auto and responsive width */}
      <div className="relative bg-white/80 backdrop-blur-md border border-yellow-100 rounded-2xl shadow-xl
        px-2 py-4 xs:px-3 sm:px-4 md:px-7 md:py-6
        w-full max-w-md mx-auto
        max-h-[90vh] overflow-y-auto"
      >
        <AnimatePresence>
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              className="flex flex-col items-center py-8"
            >
              <span className="text-4xl mb-2">🎉</span>
              <h4 className="text-xl font-bold text-[#168c5f] mb-2">Thank you!</h4>
              <p className="text-gray-700 font-medium text-center mb-2">
                Your enquiry has been submitted.<br />
                We'll contact you soon.
              </p>
              <button
                className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-300 via-[#168c5f] to-yellow-300 rounded-lg text-gray-900 font-semibold shadow hover:scale-105 transition"
                onClick={() => setSubmitted(false)}
              >
                New Enquiry
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
              onSubmit={formik.handleSubmit}
              className="space-y-3"
              autoComplete="off"
            >
              <h3 className="text-2xl font-extrabold text-center text-[#168c5f] mb-2 tracking-tight">
                Enquire Now
              </h3>
              <div>
                <label htmlFor="name" className="block text-sm font-bold mb-1 text-gray-800">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 font-medium text-gray-900 ${formik.touched.name && formik.errors.name ? 'border-red-400' : 'border-yellow-200'}`}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-xs text-red-500 mt-1">{formik.errors.name}</div>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-bold mb-1 text-gray-800">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. 0312345678"
                  className={`w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 font-medium text-gray-900 ${formik.touched.phone && formik.errors.phone ? 'border-red-400' : 'border-yellow-200'}`}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="text-xs text-red-500 mt-1">{formik.errors.phone}</div>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-bold mb-1 text-gray-800">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 font-medium text-gray-900 ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-yellow-200'}`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-xs text-red-500 mt-1">{formik.errors.email}</div>
                )}
              </div>
              <div>
                <label htmlFor="packageId" className="block text-sm font-bold mb-1 text-gray-800">
                  Package ID
                </label>
                <input
                  id="packageId"
                  name="packageId"
                  type="text"
                  className="w-full rounded-lg border border-yellow-200 px-3 py-2 bg-gray-100 text-gray-800 font-medium"
                  value={formik.values.packageId}
                  disabled
                />
              </div>
              {errorMsg && (
                <div className="text-xs text-red-600 text-center mt-1">{errorMsg}</div>
              )}
              <motion.button
                type="submit"
                className={`w-full py-2 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-yellow-400 via-[#168c5f] to-yellow-400 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2 ${
                  loading ? "opacity-60 pointer-events-none" : "hover:scale-105"
                }`}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Submit"
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};



//popup ad
export function PopupAd() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Only show once per page load (not per session)
    const timer = setTimeout(() => {
      setShow(true);
    }, 6000); // 6 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-4xl mx-4 bg-white rounded-3xl shadow-2xl overflow-hidden p-6 md:p-10"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl"
            >
              <FaTimesCircle />
            </button>

            {/* Image */}
            <img
              src="/images/pack.png"
              alt="Umrah Discount"
              className="w-full h-60 object-cover rounded-2xl mb-6"
            />

            {/* Ad Content */}
            <div className="text-center px-2">
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-4">
                ✨ Special Umrah Discount!
              </h2>
              <p className="text-gray-800 mb-6 text-lg">
                Book now and enjoy up to{" "}
                <span className="font-bold text-red-600">15% OFF</span> on all
                Umrah packages. Limited time only!
              </p>
              <a
                href="/packages"
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:scale-105 transition-transform duration-300 inline-block"
              >
                View Packages
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}



// to id 
export const ScrollToHashElement = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        // slight timeout ensures the element is mounted
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100); 
      }
    }
  }, [location]);

  return null;
};