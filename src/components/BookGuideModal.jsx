import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

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
        className="fixed inset-0 z-[2100] flex items-center justify-center min-h-screen bg-[rgba(20,24,34,0.68)] backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative w-full max-w-lg mx-2 bg-white/95 rounded-3xl shadow-2xl border border-yellow-100 p-8"
          initial={{ scale: 0.97, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-5 text-gray-500 hover:text-red-600 text-2xl"
            onClick={onClose}
            aria-label="Close booking modal"
            type="button"
          >
            <FaTimesCircle />
          </button>
          <h2 className="text-2xl font-extrabold text-yellow-700 mb-2 text-center">
            Book {guide.name}
          </h2>
          <div className="text-center text-gray-600 mb-4">
            For queries or a callback, fill out the form below and our team will reach out!
          </div>
          {!success ? (
            <Formik
              innerRef={formRef}
              initialValues={initialForm(guide)}
              validationSchema={bookingSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, resetForm }) => (
                <Form className="space-y-5" autoComplete="off">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="name">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Field
                      className="w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-gray-900"
                      id="name"
                      name="name"
                      required
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="name" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="phone">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <Field
                      className="w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-gray-900"
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="phone" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Field
                      className="w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-gray-900"
                      id="email"
                      name="email"
                      type="email"
                      required
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="email" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="dateFrom">
                        Date From <span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-gray-900"
                        id="dateFrom"
                        name="dateFrom"
                        type="date"
                        required
                        disabled={isSubmitting}
                      />
                      <ErrorMessage name="dateFrom" component="div" className="text-xs text-red-500 mt-0.5" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="dateTo">
                        Date To <span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-gray-900"
                        id="dateTo"
                        name="dateTo"
                        type="date"
                        required
                        disabled={isSubmitting}
                      />
                      <ErrorMessage name="dateTo" component="div" className="text-xs text-red-500 mt-0.5" />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="timeFrom">
                        Time From <span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-gray-900"
                        id="timeFrom"
                        name="timeFrom"
                        type="time"
                        required
                        disabled={isSubmitting}
                      />
                      <ErrorMessage name="timeFrom" component="div" className="text-xs text-red-500 mt-0.5" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="timeTo">
                        Time To <span className="text-red-500">*</span>
                      </label>
                      <Field
                        className="w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-gray-900"
                        id="timeTo"
                        name="timeTo"
                        type="time"
                        required
                        disabled={isSubmitting}
                      />
                      <ErrorMessage name="timeTo" component="div" className="text-xs text-red-500 mt-0.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="message">
                      Message (optional)
                    </label>
                    <Field
                      as="textarea"
                      className="w-full rounded-lg border px-3 py-2 bg-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-200 text-gray-900"
                      id="message"
                      name="message"
                      rows={3}
                      placeholder="Write your message or preferred details..."
                      disabled={isSubmitting}
                    />
                    <ErrorMessage name="message" component="div" className="text-xs text-red-500 mt-0.5" />
                  </div>
                  {submitMsg && (
                    <div className={`text-center text-sm ${success ? "text-green-600" : "text-red-500"}`}>{submitMsg}</div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-lg font-bold text-white bg-gradient-to-r from-yellow-400 via-[#168c5f] to-yellow-400 shadow-lg transition-all ${
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
              <div className="text-xl font-bold text-emerald-700 mb-2">Thank you!</div>
              <div className="text-gray-700 font-medium text-center mb-2">{submitMsg}</div>
              <button
                className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-300 via-[#168c5f] to-yellow-300 rounded-lg text-gray-900 font-semibold shadow hover:scale-105 transition"
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