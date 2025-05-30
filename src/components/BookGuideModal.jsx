import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Theme colors from your card theme
const GOLD = "#ffb400";
const GOLD_BORDER = "#ffe680";
const GREEN = "#279c10";
const GREEN_BG = "#d6f5e7";
const DARK = "#0d2235";
const LIGHT_BG = "#f5f7fa";
const ICON_COLOR = "#279c10";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

// Validation schema (unchanged)
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

const BookGuideModal = ({ guide, onClose }) => {
  const [submitMsg, setSubmitMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const formRef = useRef();

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  // Reset form if guide changes
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
    } catch (e) {
      setSubmitMsg("Network error. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[2100] flex items-center justify-center min-h-screen bg-black/80 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg mx-2 bg-white rounded-3xl shadow-2xl border border-[rgba(255,180,0,0.14)] p-8"
          style={{
            background: "linear-gradient(120deg,#fff9e5 0%,#fafbfc 100%)",
            boxShadow: "0 8px 32px 0 rgba(255,180,0,0.12)",
          }}
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close - Consistent SVG as other modals */}
          <button
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center rounded-full bg-[#f5f7fa] hover:bg-[#fff9e5] transition z-30"
            style={{
              border: `1.5px solid ${GOLD_BORDER}`,
              color: GOLD,
              boxShadow: "0 2px 8px 0 rgba(255,180,0,0.09)",
            }}
            onClick={onClose}
            aria-label="Close booking modal"
            type="button"
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
          <h2
            className="text-2xl font-extrabold mb-2 text-center tracking-tight mt-10"
            style={{
              color: DARK,
              letterSpacing: "0.01em",
            }}
          >
            {/* Book {guide.name} */}
          </h2>
          <div className="text-center mb-4" style={{ color: "#ad7a00" }}>
            For queries or a callback, fill out the form below and our team will reach out!
          </div>
          {!success ? (
            <Formik
              innerRef={formRef}
              initialValues={initialForm(guide)}
              validationSchema={bookingSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5" autoComplete="off">
                  {/* Name */}
                  <div>
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
                  <div>
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
                  <div>
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
                  {/* Dates */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                  </div>
                  {/* Times */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
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
                    <div className="flex-1">
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
                  </div>
                  {/* Message */}
                  <div>
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
                  {/* Submit/Error Message */}
                  {submitMsg && (
                    <div className={`text-center text-sm ${success ? "text-green-600" : "text-red-500"}`}>{submitMsg}</div>
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookGuideModal;