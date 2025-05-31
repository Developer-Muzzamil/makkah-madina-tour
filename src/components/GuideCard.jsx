import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar, FaPhoneAlt, FaEnvelope, FaUserTie, FaDollarSign, FaClock,
  FaCertificate, FaIdCard, FaMapMarkerAlt
} from "react-icons/fa";
import { MdVerified, MdWorkOutline } from "react-icons/md";

// --- COLOR CONSTANTS ---
const GOLD = "#ffb400";
const GOLD_BORDER = "#ffe680";
const GREEN_PILL = "#d6f5e7";
const GREEN_TEXT = "#109c5d";
const LANG_PILL_BG = "#f2f7fd";
const LANG_PILL_TEXT = "#2185d0";
const LANG_PILL_BORDER = "#c0e0ff";
const ICON_COLOR = "#B9D4AA";

// --- UTILS ---
const toCamelCase = (str) =>
  str
    ? str
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ")
    : "";

const formatCurrency = (amount, currency = "USD") => {
  if (!amount) return "—";
  let amt =
    typeof amount === "string"
      ? parseFloat(amount.replace(/[^\d.]/g, ""))
      : amount;
  if (isNaN(amt)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amt);
};

// --- COMPONENTS ---
const LanguagePill = ({ children }) => (
  <span
    className="px-2 py-[2px] text-[11px] font-semibold rounded-full mr-2"
    style={{
      backgroundColor: LANG_PILL_BG,
      color: LANG_PILL_TEXT,
      border: `1.5px solid ${LANG_PILL_BORDER}`,
      fontWeight: 600,
      minWidth: 38,
      textAlign: "center",
      marginBottom: 0,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: "1.1",
    }}
  >
    {children}
  </span>
);

const Pill = ({ children, color = "gold", className = "" }) => {
  const pillTheme = {
    gold: "bg-[#fff9e5] border border-[#ffe680] text-[#ffb400]",
    green: "bg-[#d6f5e7] border border-[#b2ecd7] text-[#109c5d] font-semibold",
  };
  return (
    <span
      className={`rounded-full px-3 py-0.5 text-xs font-bold ${pillTheme[color] || pillTheme.gold} ${className}`}
      style={{
        backgroundColor: color === "gold" ? "#fff9e5" : GREEN_PILL,
        borderColor: color === "gold" ? GOLD_BORDER : "#b2ecd7",
        color: color === "gold" ? GOLD : GREEN_TEXT,
        fontWeight: color === "green" ? 700 : 600,
        letterSpacing: 0.2,
        minWidth: 68,
        textAlign: "center",
        marginBottom: 0,
      }}
    >
      {children}
    </span>
  );
};

const Rating = ({ rating, size = "sm" }) => {
  const starSize = size === "lg" ? 28 : 22;
  const textSize = size === "lg" ? "text-base" : "text-xs";
  return (
    <div className="flex items-center gap-2 my-2">
      <div className="flex items-center gap-[2px]">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`${
              i < Math.round(rating || 0) ? "text-[#ffb400]" : "text-slate-200"
            }`}
            size={starSize}
          />
        ))}
      </div>
      {/* {rating ? (
        <span className={`ml-1 text-[#202940] font-medium ${textSize}`}>
          {rating}/5
        </span>
      ) : null} */}
    </div>
  );
};

const Badge = ({ children, className = "", variant = "default" }) => {
  const baseClasses =
    "px-2.5 py-1 text-xs font-semibold rounded-full border transition-all duration-200";
  const variants = {
    default: "bg-[#f5f7fa] text-[#0d2235] border-slate-100",
    language: "bg-[#e7f1fd] text-[#2185d0] border-yellow-700",
    status: "bg-[#fff7e0] text-[#ad7a00] border-[#ffe1a1]",
  };
  return (
    <span
      className={`${baseClasses} ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
};

const Field = ({
  label,
  value,
  icon: Icon,
  className = "",
  textSize = "",
  iconColor,
}) => {
  const sizeClass =
    textSize === "sm"
      ? "text-[0.96rem] sm:text-[1rem]"
      : textSize === "lg"
      ? "text-[1.08rem] md:text-[1.09rem]"
      : "text-xs";
  return (
    <div
      className={`flex items-center gap-2 ${sizeClass} text-[#202940] mb-2 ${className}`}
    >
      {Icon && (
        <div className="flex-shrink-0 w-7 h-7 bg-[#f5f7fa] rounded-lg flex items-center justify-center border border-slate-100">
          <Icon
            className=""
            size={16}
            style={{ color: iconColor || ICON_COLOR }}
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <span className="font-semibold text-[#0d2235] block">
          {toCamelCase(label)}
        </span>
        <span className="text-[#202940] truncate block">
          {value ? value : <span className="text-slate-400">—</span>}
        </span>
      </div>
    </div>
  );
};

// --- GUIDE DETAILS RIBBON COMPONENT ---
const GuideDetailsRibbon = () => (
  <div
    className="w-full flex justify-center items-center"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: 20,
      width: "100%",
      pointerEvents: "none",
    }}
  >
    <div
      className="flex items-center gap-2 px-7 py-1 shadow"
      style={{
        background: "linear-gradient(90deg,#fff9e5 0%,#fafbfc 100%)",
        borderBottom: "2.5px solid #ffe680",
        borderTopLeftRadius: "18px",
        borderTopRightRadius: "18px",
        marginTop: "-26px",
        pointerEvents: "auto",
        fontWeight: 700,
        letterSpacing: "0.5px",
        boxShadow: "0 4px 18px 0 rgba(255,180,0,0.10)",
      }}
    >
      <FaIdCard size={20} style={{ color: ICON_COLOR }} />
      <span className="text-base sm:text-lg font-bold text-[#0d2235] m-0 uppercase tracking-wide" style={{marginTop:2}}>
        Guide Details :
      </span>
    </div>
  </div>
);

// --- MAIN COMPONENT ---
export const ResponsiveIDCardGuideCard = ({ guide, onBookNow }) => {
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const guideData = useMemo(
    () => ({
      name: guide.name || "",
      profileImg:
        !imgError && (guide.profilePic?.url || guide.image)
          ? guide.profilePic?.url || guide.image
          : "/default-avatar.png",
      specializations: guide.areas || "",
      phone: guide.phone || guide.contact || "",
      about: guide.about || guide.description || "",
      rating: parseFloat(guide.rating) || 0,
      gender: guide.gender || "",
      location: guide.location || "",
      availability: guide.availability || "",
      license: guide.license || "",
      social: guide.social || "",
      experience: guide.experience || "",
      languages: guide.languages || "",
      certifications: Array.isArray(guide.certificationsFiles)
        ? guide.certificationsFiles
        : [],
      age: guide.age || "",
      email: guide.email || "",
      charges: guide.charges || "",
      isVerified: !!guide.isVerified,
      totalBookings: guide.totalBookings || 0,
      joinedDate: guide.joinedDate || guide.createdAt,
      workType: guide.workType || guide.type || "Full Time",
    }),
    [guide, imgError]
  );

  const langs =
    typeof guideData.languages === "string"
      ? guideData.languages.split(",").map((l) => l.trim()).filter(Boolean)
      : Array.isArray(guideData.languages)
      ? guideData.languages
      : [];

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  // Patch: Use guideData.availability for the 2nd pill (right-side top)
  const pillData = [
    guideData.location
      ? { content: toCamelCase(guideData.location), color: "gold" }
      : null,
    guideData.availability
      ? { content: toCamelCase(guideData.availability), color: "green" }
      : null,
  ].filter(Boolean);

  return (
    <>
      {/* Small Card */}
      <motion.div
        className={`
          relative
          bg-white
          border border-slate-200
          rounded-2xl
          p-4
          w-full
          max-w-xs
          flex flex-col items-center
          cursor-pointer
          shadow-sm hover:shadow-lg transition group mx-auto
        `}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          minWidth: 0,
        }}
        whileHover={{
          scale: 1.035,
          boxShadow: "0 8px 28px 0 rgba(255,180,0,0.14)",
          borderColor: GOLD,
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowModal(true)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Pills */}
        <div className="flex w-full justify-between mb-3 gap-1 flex-wrap">
          {pillData.map((p, i) => (
            <Pill key={i} color={p.color}>
              {p.content}
            </Pill>
          ))}
        </div>
        {/* Profile */}
        <div className="relative mb-3 flex flex-col items-center w-full">
          <div className="mx-auto rounded-full border-2 border-[rgba(255,180,0,0.54)] bg-[#f5f7fa] w-[72px] h-[72px] sm:w-[95px] sm:h-[95px] flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={guideData.profileImg}
              alt={guideData.name}
              className="w-[62px] h-[62px] sm:w-[85px] sm:h-[85px] object-cover rounded-full object-center bg-white"
              style={{ objectFit: "cover", objectPosition: "center" }}
              onError={() => setImgError(true)}
            />
            {guideData.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#ffb400] rounded-full flex items-center justify-center border-2 border-white shadow">
                <MdVerified className="text-white" size={13} />
              </div>
            )}
          </div>
        </div>
        {/* Name & Specialization */}
        <div className="flex flex-col items-center w-full text-center mt-3">
          <div className="w-full flex flex-col items-center">
            <span
              className="font-bold text-[#0d2235] text-base sm:text-lg mb-0.5 break-words leading-tight"
              style={{
                lineHeight: "1.1",
                wordBreak: "break-word",
                whiteSpace: "normal",
                maxWidth: "260px",
                overflow: "visible",
              }}
            >
              {guideData.name}
            </span>
          </div>
          <p
            className="text-xs sm:text-sm text-yellow-700 mt-1"
            style={{ maxWidth: 240, whiteSpace: "normal" }}
          >
            {toCamelCase(guideData.specializations)}
          </p>
          <Rating rating={guideData.rating} />
        </div>
        {/* Language pills below rating */}
        {langs.length > 0 && (
          <div
            className="flex flex-row flex-wrap gap-0.5 justify-center mt-2"
            style={{ marginBottom: "0.4rem" }}
          >
            {langs.map((l, idx) => (
              <LanguagePill key={idx}>{toCamelCase(l)}</LanguagePill>
            ))}
          </div>
        )}
        {/* Footer stats */}
        <div className="flex gap-2 items-center w-full justify-center mt-4 pt-1 border-t border-slate-100 flex-wrap">
          {guideData.charges && (
            <div className="flex items-center gap-2 text-sm font-bold">
              <span
                className="text-[#ffb400] text-base leading-none"
                style={{ marginTop: 2 }}
              >
                <FaDollarSign size={17} />
              </span>
              <span
                className="text-[#0d2235]"
                style={{ fontWeight: 700, fontSize: "1.1rem" }}
              >
                {formatCurrency(guideData.charges).replace(/^\$/, "")}
              </span>
            </div>
          )}
          {guideData.totalBookings > 0 && (
            <Badge variant="status" className="text-xs">
              {guideData.totalBookings} Booking
              {guideData.totalBookings > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </motion.div>
      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ overflow: "auto" }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-visible flex flex-col md:flex-row w-full max-w-4xl max-h-[96vh]"
              initial={{ scale: 0.96, opacity: 0, y: 32 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 32 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              style={{
                margin: "auto",
                height: "auto",
                maxHeight: "96vh",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* RIBBON AT TOP */}
              <GuideDetailsRibbon />
              {/* Close Button INSIDE the card, top-right */}
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute right-2 top-2 w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f7fa] hover:bg-[#fff9e5] transition z-30"
                style={{
                  border: `1.5px solid ${GOLD_BORDER}`,
                  color: GOLD,
                  boxShadow: "0 2px 8px 0 rgba(255,180,0,0.09)",
                }}
                aria-label="Close"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke={GOLD}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: "block" }}
                >
                  <circle cx="12" cy="12" r="10" stroke={GOLD} fill="#f5f7fa" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </button>
              {/* Left - Profile */}
              <div className="md:w-1/3 w-full bg-gradient-to-br from-[#fff9e5] via-[#f5f7fa] to-[#fafbfc] p-6 sm:p-8 flex flex-col items-center border-b md:border-b-0 md:border-r border-[rgba(255,180,0,0.23)] relative"
                   style={{ minWidth: "220px", maxWidth: "100vw" }}>
                <div className="flex flex-col items-center w-full">
                  <div className="w-full flex justify-center mt-10">
                    <div className="relative rounded-xl border-2 border-[rgba(255,180,0,0.54)] bg-[#f5f7fa] w-[140px] h-[180px] sm:w-[170px] sm:h-[220px] flex items-center justify-center overflow-hidden shadow">
                      <img
                        src={guideData.profileImg}
                        alt={guideData.name}
                        className="w-[120px] h-[160px] sm:w-[150px] sm:h-[200px] object-cover rounded-sm object-center bg-white"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        onError={() => setImgError(true)}
                      />
                      {guideData.isVerified && (
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#ffb400] rounded-full flex items-center justify-center border-2 border-white shadow">
                          <MdVerified className="text-white" size={16} />
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Name & Specialization */}
                  <div className="mt-4 sm:mt-6 w-full flex flex-col items-center">
                    <span
                      className="text-lg font-bold mb-1 text-center text-[#0d2235] break-words"
                      style={{
                        lineHeight: "1.15",
                        wordBreak: "break-word",
                        whiteSpace: "normal",
                        maxWidth: "100%",
                        overflow: "visible",
                      }}
                    >
                      {guideData.name}
                    </span>
                    <p
                      className="text-[#ffb400] font-medium text-center mb-2 text-base"
                      style={{
                        maxWidth: "90%",
                        whiteSpace: "normal",
                      }}
                    >
                      {toCamelCase(guideData.specializations)}
                    </p>
                  </div>
                  {/* Ratings and Languages */}
                  <div className="w-full flex flex-col items-center mt-1">
                    <Rating rating={guideData.rating} size="lg" />
                    {langs.length > 0 && (
                      <div className="flex flex-row gap-1 flex-wrap justify-center mt-3 w-full">
                        {langs.map((l, idx) => (
                          <LanguagePill key={idx}>{toCamelCase(l)}</LanguagePill>
                        ))}
                      </div>
                    )}
                    {/* Price below languages */}
                    {guideData.charges && (
                      <div className="flex items-center gap-2 mt-4 text-base font-bold">
                        <span className="text-[#ffb400]">
                          <FaDollarSign size={17} />
                        </span>
                        <span className="text-[#0d2235] text-2xl">
                          {formatCurrency(guideData.charges).replace(/^\$/, "")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Right - Details */}
              <div className="flex-1 p-5 sm:p-7 flex flex-col h-full overflow-y-auto" style={{ minWidth: 0 }}>
                {/* (Removed old heading, replaced by ribbon) */}

                {/* Responsive Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-3" style={{marginTop: "32px"}}>
                  <Field
                    label="Phone"
                    value={guideData.phone}
                    icon={FaPhoneAlt}
                    textSize="sm"
                    iconColor={ICON_COLOR}
                  />
                  <Field
                    label="Email"
                    value={guideData.email}
                    icon={FaEnvelope}
                    textSize="sm"
                    iconColor={ICON_COLOR}
                  />
                  <Field
                    label="Location"
                    value={guideData.location}
                    icon={FaMapMarkerAlt}
                    textSize="sm"
                    iconColor={ICON_COLOR}
                  />
                  <Field
                    label="Experience"
                    value={guideData.experience}
                    icon={FaUserTie}
                    textSize="sm"
                    iconColor={ICON_COLOR}
                  />
                  <Field
                    label="Availability"
                    value={guideData.availability}
                    icon={FaClock}
                    textSize="sm"
                    iconColor={ICON_COLOR}
                  />
                  {/* <Field
                    label="Rate"
                    value={formatCurrency(guideData.charges)}
                    icon={FaDollarSign}
                    textSize="sm"
                    iconColor={ICON_COLOR}
                  /> */}
                  <Field
                    label="Work Type"
                    value={guideData.workType}
                    icon={MdWorkOutline}
                    textSize="sm"
                    iconColor={ICON_COLOR}
                  />
                  <Field
                    label="License"
                    value={guideData.license}
                    icon={FaIdCard}
                    textSize="sm"
                    iconColor={ICON_COLOR}
                  />
                </div>
                <div>
                  {guideData.about && (
                    <p className="text-[#202940] leading-relaxed mb-4 text-[0.98rem]">
                      {guideData.about}
                    </p>
                  )}
                </div>
                {/* Certifications */}
                {guideData.certifications.length > 0 && (
                  <div className="mb-3">
                    <h4 className="font-semibold text-[#0d2235] mb-1 flex items-center gap-2 text-[1rem]">
                      <FaCertificate style={{ color: ICON_COLOR }} size={13} />
                      Certifications
                    </h4>
                    <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                      {guideData.certifications.slice(0, 3).map((file, idx) => (
                        <a
                          key={idx}
                          href={file.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-xs px-2 py-1 rounded hover:bg-[#fff9e5] transition border border-[#ffe1a1] group"
                        >
                          {/* <FaCertificate style={{ color: ICON_COLOR }} size={11} /> */}
                          <span className="text-[#ad7a00] truncate flex-1">
                            {file.filename || "Certificate"}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
                {/* Footer stats: Bookings */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3 items-start sm:items-center flex-wrap">
                  {guideData.totalBookings > 0 && (
                    <Badge variant="status" className="text-xs">
                      {guideData.totalBookings} Booking
                      {guideData.totalBookings > 1 ? "s" : ""}
                    </Badge>
                  )}
                </div>
                {/* Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    onBookNow && onBookNow(guide);
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-[#279c10] to-[#1bc768] text-white font-bold rounded-xl hover:from-[#1bc768] hover:to-[#109c5d] transition shadow text-base mt-5 border border-[#b2ecd7] max-w-xs mx-auto"
                  style={{ alignSelf: "center" }}
                >
                  Book This Guide Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- GRID COMPONENT ---
export const GuideGrid = ({ guides, onBookNow }) => (
  <div className="bg-[#f5f7fa] py-12 min-h-screen">
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.09,
              delayChildren: 0.07,
            },
          },
        }}
      >
        {guides.map((g, i) => (
          <motion.div
            key={g._id || i}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 250,
                  damping: 22,
                },
              },
            }}
            className="w-full"
            style={{ minWidth: 0 }}
          >
            <ResponsiveIDCardGuideCard guide={g} onBookNow={onBookNow} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </div>
);

export default ResponsiveIDCardGuideCard;