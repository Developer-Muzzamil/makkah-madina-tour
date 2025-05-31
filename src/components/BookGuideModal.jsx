import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Theme colors matching GuideCard/IDCard theme
const GOLD = "#ffb400";
const GOLD_BORDER = "#ffe680";
const DARK = "#0d2235";
const GREEN = "#279c10";
const SIDEBAR_BG = "linear-gradient(135deg, #fff9e5 0%, #f5f7fa 100%)";
const MSG_BG = "linear-gradient(120deg, #f7e5b2 0%, #f1e4c6 100%)";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

// Validation schema
const bookingSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-() ]+$/, "Invalid phone number")
    .required("Phone is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  dateFrom: Yup.date()
    .required("Start date is required")
    .min(new Date(Date.now() - 8.64e7), "Start date cannot be in the past"),
  dateTo: Yup.date()
    .required("End date is required")
    .when("dateFrom", (dateFrom, schema) =>
      dateFrom
        ? schema.min(dateFrom, "End date must be after start date")
        : schema
    ),
  timeFrom: Yup.string().required("Start time is required"),
  timeTo: Yup.string().required("End time is required"),
  message: Yup.string(),
});

const initialForm = (guide) => ({
  name: "",
  phone: "",
  email: "",
  guideId: guide?._id || guide?.id || "",
  dateFrom: "",
  dateTo: "",
  timeFrom: "",
  timeTo: "",
  message: "",
});

const shimmerStyle = {
  background:
    "linear-gradient(90deg, rgba(255,245,219,0.7) 0%, rgba(255,255,255,0.7) 45%, rgba(255,245,219,0.7) 100%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.6s infinite linear",
};

const BookGuideModal = ({ guide, onClose }) => {
  const [submitMsg, setSubmitMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);
  useEffect(() => {
    setSubmitMsg("");
    setSuccess(false);
    if (formRef.current) formRef.current.resetForm();
  }, [guide]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitMsg("");
    try {
      const res = await fetch(`${API_BASE}/bookings/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setSubmitMsg(data.message || "Booking request sent! We'll contact you soon.");
        resetForm();
      } else {
        setSubmitMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitMsg("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  // Use guide.profilePic?.url or guide.image, fallback to default
  const profileImg =
    (guide?.profilePic?.url || guide?.image) ?? "/default-avatar.png";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[2100] flex items-center justify-center bg-black/40 backdrop-blur-md p-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ overflow: "auto" }}
      >
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-visible flex flex-col w-full max-w-3xl mx-auto"
          style={{
            margin: "auto",
            height: "auto",
            maxHeight: "96vh",
            background: "linear-gradient(120deg,#fff9e5 0%,#fafbfc 100%)",
            boxShadow: "0 8px 32px 0 rgba(255,180,0,0.12)",
          }}
          initial={{ scale: 0.97, opacity: 0, y: 32 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.97, opacity: 0, y: 32 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* ABSOLUTE CLOSE BUTTON AT TOP RIGHT */}
          <button
            type="button"
            onClick={onClose}
            style={{
              position: "absolute",
              top: 3,
              right: 5,
              width: 38,
              height: 38,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              background: "#f5f7fa",
              border: `1.5px solid ${GOLD_BORDER}`,
              color: GOLD,
              boxShadow: "0 2px 8px 0 rgba(255,180,0,0.09)",
              transition: "background 0.2s",
              cursor: "pointer",
              zIndex: 20,
            }}
            aria-label="Close booking modal"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
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
          {/* COLORED TOPBAR */}
          <div
            className="w-full flex items-center justify-between"
            style={{
              background: MSG_BG,
              padding: "0.35rem 0.8rem 0.35rem 1rem",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
              borderBottom: "1.5px solid #ffe680",
              boxShadow: "0 3px 12px 0 rgba(255,180,0,0.06)",
              minHeight: "48px" // Ensures the ribbon stays tall enough
            }}
          >
            {/* You may put header/title here if desired */}
          </div>
          <div className="flex flex-col md:flex-row">
            {/* Sidebar (Desktop) */}
            <div
              className="hidden md:flex flex-col items-center w-1/3 border-r border-[rgba(255,180,0,0.18)] px-6"
              style={{
                background: SIDEBAR_BG,
                minHeight: 420,
                borderBottomLeftRadius: "1rem",
                paddingTop: "60px",
                boxShadow: "inset -6px 0 16px -10px rgba(255,180,0,0.07)"
              }}
            >
              <div className="flex flex-col items-center w-full" style={{ marginTop: "12px" }}>
                <motion.div
                  className="mx-auto rounded-[13px] border-2 border-[rgba(255,180,0,0.54)] bg-[#f5f7fa] w-[160px] h-[200px] flex items-center justify-center overflow-hidden shadow-sm"
                  style={{
                    marginBottom: 18,
                    ...shimmerStyle
                  }}
                  initial={{ y: 24, opacity: 0.8 }} // Move image slightly further down (was y: 12)
                  animate={{ y: 12, opacity: 1 }}    // End position: slightly down (was y: 0)
                  transition={{ type: "spring", stiffness: 210, damping: 30 }}
                >
                  <img
                    src={profileImg}
                    alt={guide?.name}
                    className="w-[155px] h-[190px] object-cover rounded-[7px] object-center bg-white"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                      boxShadow: "0 4px 16px 0 rgba(255,180,0,0.13)"
                    }}
                  />
                </motion.div>
                <div className="font-extrabold text-2xl text-[#0d2235] text-center mt-5 mb-2 break-words tracking-tight drop-shadow">
                  {guide?.name}
                </div>
              </div>
              <div className="mt-4 text-[15px] text-[#ad7a00] text-center font-medium"></div>
            </div>

            {/* Form Panel */}
            <div className="flex-1 mt-8 md:mt-0 px-2 sm:px-8 py-7 overflow-y-auto">
              {/* Mobile layout: image + name */}
              <div className="md:hidden mb-6 flex flex-col items-center">
                <motion.div
                  className="flex flex-col items-center justify-center"
                  initial={{ y: 16, opacity: 0.8 }} // Move image slightly further down (was y: 12)
                  animate={{ y: 8, opacity: 1 }}    // End position: slightly down (was y: 0)
                  transition={{ type: "spring", stiffness: 210, damping: 30 }}
                >
                  <div
                    className="mx-auto rounded-[9px] border-2 border-[rgba(255,180,0,0.54)] bg-[#f5f7fa] w-[86px] h-[108px] flex items-center justify-center overflow-hidden shadow-sm"
                    style={{ marginBottom: 10, ...shimmerStyle, marginTop: "16px" }}
                  >
                    <img
                      src={profileImg}
                      alt={guide?.name}
                      className="w-[78px] h-[98px] object-cover rounded-[4px] object-center bg-white"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        boxShadow: "0 2px 8px 0 rgba(255,180,0,0.11)"
                      }}
                    />
                  </div>
                  <div className="font-extrabold text-xl text-[#0d2235] text-center mb-1 break-words tracking-tight drop-shadow">{guide?.name}</div>
                </motion.div>
              </div>
              {!success ? (
                <Formik
                  innerRef={formRef}
                  initialValues={initialForm(guide)}
                  validationSchema={bookingSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4" autoComplete="off">
                      {/* Name - full width */}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold mb-1" htmlFor="name" style={{ color: DARK }}>
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <Field
                          className="w-full rounded-lg border border-[#ffe680] px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb400] text-[#0d2235] font-semibold"
                          id="name"
                          name="name"
                          required
                          disabled={isSubmitting}
                        />
                        <ErrorMessage name="name" component="div" className="text-xs text-red-500 mt-0.5" />
                      </div>
                      {/* Phone */}
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold mb-1" htmlFor="phone" style={{ color: DARK }}>
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <Field
                          className="w-full rounded-lg border border-[#ffe680] px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb400] text-[#0d2235] font-semibold"
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          disabled={isSubmitting}
                        />
                        <ErrorMessage name="phone" component="div" className="text-xs text-red-500 mt-0.5" />
                      </div>
                      {/* Email */}
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold mb-1" htmlFor="email" style={{ color: DARK }}>
                          Email <span className="text-red-500">*</span>
                        </label>
                        <Field
                          className="w-full rounded-lg border border-[#ffe680] px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb400] text-[#0d2235] font-semibold"
                          id="email"
                          name="email"
                          type="email"
                          required
                          disabled={isSubmitting}
                        />
                        <ErrorMessage name="email" component="div" className="text-xs text-red-500 mt-0.5" />
                      </div>
                      {/* Date From */}
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold mb-1" htmlFor="dateFrom" style={{ color: DARK }}>
                          Date From <span className="text-red-500">*</span>
                        </label>
                        <Field
                          className="w-full rounded-lg border border-[#ffe680] px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb400] text-[#0d2235] font-semibold"
                          id="dateFrom"
                          name="dateFrom"
                          type="date"
                          required
                          disabled={isSubmitting}
                        />
                        <ErrorMessage name="dateFrom" component="div" className="text-xs text-red-500 mt-0.5" />
                      </div>
                      {/* Date To */}
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold mb-1" htmlFor="dateTo" style={{ color: DARK }}>
                          Date To <span className="text-red-500">*</span>
                        </label>
                        <Field
                          className="w-full rounded-lg border border-[#ffe680] px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb400] text-[#0d2235] font-semibold"
                          id="dateTo"
                          name="dateTo"
                          type="date"
                          required
                          disabled={isSubmitting}
                        />
                        <ErrorMessage name="dateTo" component="div" className="text-xs text-red-500 mt-0.5" />
                      </div>
                      {/* Time From */}
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold mb-1" htmlFor="timeFrom" style={{ color: DARK }}>
                          Time From <span className="text-red-500">*</span>
                        </label>
                        <Field
                          className="w-full rounded-lg border border-[#ffe680] px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb400] text-[#0d2235] font-semibold"
                          id="timeFrom"
                          name="timeFrom"
                          type="time"
                          required
                          disabled={isSubmitting}
                        />
                        <ErrorMessage name="timeFrom" component="div" className="text-xs text-red-500 mt-0.5" />
                      </div>
                      {/* Time To */}
                      <div className="col-span-1">
                        <label className="block text-sm font-semibold mb-1" htmlFor="timeTo" style={{ color: DARK }}>
                          Time To <span className="text-red-500">*</span>
                        </label>
                        <Field
                          className="w-full rounded-lg border border-[#ffe680] px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb400] text-[#0d2235] font-semibold"
                          id="timeTo"
                          name="timeTo"
                          type="time"
                          required
                          disabled={isSubmitting}
                        />
                        <ErrorMessage name="timeTo" component="div" className="text-xs text-red-500 mt-0.5" />
                      </div>
                      {/* Message (spans both columns) */}
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-semibold mb-1" htmlFor="message" style={{ color: DARK }}>
                          Message (optional)
                        </label>
                        <Field
                          as="textarea"
                          className="w-full rounded-lg border border-[#ffe680] px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#ffb400] text-[#0d2235] font-semibold"
                          id="message"
                          name="message"
                          rows={3}
                          placeholder="Write your message or preferred details..."
                          disabled={isSubmitting}
                        />
                        <ErrorMessage name="message" component="div" className="text-xs text-red-500 mt-0.5" />
                      </div>
                      {/* Submit/Error Message (spans both columns) */}
                      <div className="col-span-1 md:col-span-2 mt-1">
                        {submitMsg && (
                          <div className={`text-center text-sm ${success ? "text-green-600" : "text-red-500"}`}>
                            {submitMsg}
                          </div>
                        )}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full py-2 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#279c10] to-[#1bc768] shadow-lg transition-all ${
                            isSubmitting ? "opacity-60 pointer-events-none" : "hover:scale-105"
                          }`}
                        >
                          {isSubmitting ? "Sending..." : "Book Guide"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              ) : (
                <div className="py-8 flex flex-col items-center">
                  <span className="text-5xl mb-2">🎉</span>
                  <div className="text-xl font-bold" style={{ color: GREEN }}>
                    Thank you!
                  </div>
                  <div className="text-[#0d2235] font-medium text-center mb-2">{submitMsg}</div>
                  <button
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-[#279c10] to-[#1bc768] rounded-xl text-white font-semibold shadow hover:scale-105 transition"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookGuideModal;