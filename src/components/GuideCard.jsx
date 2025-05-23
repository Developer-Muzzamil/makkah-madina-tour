import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaStar } from "react-icons/fa";

const Field = ({ label, value }) => (
  <div className="mb-1 flex flex-row items-baseline gap-2">
    <span className="font-semibold text-yellow-700 min-w-[110px]">{label}:</span>
    <span className="text-gray-800 break-all">{value ? value : <span className="text-gray-400">—</span>}</span>
  </div>
);

export const GuideCard = ({ guide, onBookNow }) => {
  const [showModal, setShowModal] = useState(false);

  const profileImg =
    guide.profilePic?.url
      ? import.meta.env.VITE_API_URL
        ? `${import.meta.env.VITE_API_URL}${guide.profilePic.url}`
        : guide.profilePic.url
      : guide.image
        ? guide.image
        : "/default-avatar.png";
  const specializations = guide.areas || guide.specializations || guide.specialisation || "";
  const phone = guide.phone || guide.contact || "";
  const about = guide.about || guide.description || "";
  const rating = guide.rating || "";
  const gender = guide.gender || "";
  const location = guide.location || "";
  const availability = guide.availability || "";
  const license = guide.license || "";
  const social = guide.social || "";
  const experience = guide.experience ? (guide.experience.match(/^\d+$/) ? `${guide.experience} yrs` : guide.experience) : "";
  const languages = guide.languages || "";
  const certifications = Array.isArray(guide.certificationsFiles) ? guide.certificationsFiles : [];

  // If you want to show booking status, you can use guide.isAvailable or similar
  // For now, we assume only available guides are shown
  // If you want to support showing unavailable guides, use guide.isAvailable === false

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return () => (document.body.style.overflow = "");
    }
  }, [showModal]);

  return (
    <>
      <motion.div
        className="relative bg-white/80 border border-yellow-200 rounded-2xl shadow-lg p-6 w-full max-w-xs flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-105 group"
        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px #e9f8f570" }}
        onClick={() => setShowModal(true)}
      >
        {/* Availability badge */}
        {availability && (
          <span className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-bold shadow">
            {availability}
          </span>
        )}
        {/* Location badge */}
        {location && (
          <span className="absolute top-3 left-3 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-bold shadow">
            {location}
          </span>
        )}
        {/* If you want to show unavailable guides, uncomment below */}
        {/* {!guide.isAvailable && (
          <span className="absolute bottom-3 right-3 bg-red-200 text-red-800 text-xs px-3 py-1 rounded-full font-bold shadow">
            Booked
          </span>
        )}
        {guide.isAvailable && (
          <span className="absolute bottom-3 right-3 bg-emerald-200 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold shadow">
            Available
          </span>
        )} */}
        <img
          src={profileImg}
          alt={guide.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-yellow-300 shadow mb-3"
        />
        <h3 className="text-xl font-bold text-yellow-700 mb-1 text-center">{guide.name}</h3>
        {/* <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"} />
          ))}
          <span className="ml-2 text-xs text-gray-500">{rating || "—"}</span>
        </div> */}
        <p className="text-sm text-gray-600 mb-2 text-center">{experience}</p>
        {/* Language pills */}
        <div className="flex flex-wrap gap-1 justify-center mb-2">
          {languages.split(',').filter(Boolean).map(lang => (
            <span key={lang} className="bg-yellow-50 text-yellow-700 text-xs px-2 py-0.5 rounded shadow">
              {lang.trim()}
            </span>
          ))}
        </div>
        <Field label="Specializations" value={specializations} />
        <Field label="Fees" value={guide.charges ? `$${guide.charges}` : ""} />
      </motion.div>

      {/* Modal (can be extended with tabs, gallery, etc.) */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[2000] flex items-center justify-center min-h-screen bg-[rgba(20,24,34,0.68)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative w-full max-w-lg mx-2 bg-white/95 rounded-3xl shadow-2xl overflow-y-auto border border-yellow-100 p-8"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-5 left-5 bg-white/90 border border-gray-200 rounded-lg px-3 py-2 text-gray-700 shadow hover:bg-gray-100 flex items-center gap-2 z-10"
                onClick={() => setShowModal(false)}
              >
                <FaArrowLeft /> Back
              </button>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={profileImg}
                  alt={guide.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-yellow-300 shadow-lg"
                />
                <h2 className="text-2xl font-extrabold text-yellow-700 mb-2 text-center">{guide.name}</h2>
                <div className="w-full max-w-md mx-auto space-y-1">
                  <Field label="Gender" value={gender} />
                  <Field label="Experience" value={experience} />
                  <Field label="Specializations" value={specializations} />
                  <Field label="Fees" value={guide.charges ? `$${guide.charges}` : ""} />
                  <Field label="Age" value={guide.age} />
                  <Field label="Email" value={guide.email} />
                  <Field label="Phone" value={phone} />
                  <Field label="Location" value={location} />
                  <Field label="Availability" value={availability} />
                  {/* <Field label="Rating" value={rating} /> */}
                  <Field label="About" value={about} />
                  <Field label="Languages" value={languages} />
                  <Field label="License" value={license} />
                  <Field label="Social" value={social} />
                  {/* <div className="mb-2 flex flex-row items-baseline gap-2">
                    <span className="font-semibold text-yellow-700 min-w-[110px]">Certifications:</span>
                    {certifications.length > 0 ? (
                      <ul className="list-disc pl-4">
                        {certifications.map((file, idx) => (
                          <li key={idx}>
                            <a
                              href={file.url
                                  ? (import.meta.env.VITE_API_URL
                                      ? `${import.meta.env.VITE_API_URL}${file.url}`
                                      : file.url)
                                  : "#"
                                }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-yellow-700 hover:underline"
                            >
                              {file.filename || file.url?.split("/").pop()}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </div> */}
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    onBookNow && onBookNow();
                  }}
                  className="mt-2 px-6 py-2 bg-gradient-to-r from-yellow-400 via-[#168c5f] to-yellow-400 text-gray-900 font-semibold rounded-lg shadow hover:scale-105 transition w-full"
                >
                  Book Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const GuideGrid = ({ guides, onBookNow, showUnavailable }) => (
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 justify-items-center py-8 px-2">
    {guides.map((guide, idx) => (
      <GuideCard key={guide._id || guide.id || idx} guide={guide} onBookNow={() => onBookNow(guide)} />
    ))}
  </div>
);

export default GuideCard;