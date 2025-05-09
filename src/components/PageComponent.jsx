import React, { useEffect, useMemo, useState } from "react";
import { Button, FormLabel, TextField, TextareaAutosize, Box, Typography, Paper } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
import { Formik, Form, Field, ErrorMessage,useFormik} from "formik";
import * as Yup from "yup";


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
        <p className="text-lg md:text-xl text-white break-words">
          {subtitle}
        </p>

        {/* Dynamic Hadith Section */}
        {hadithText && (
          <div className="mt-8 mx-auto w-[90%] md:w-[62%] bg-white/30 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg">
            <p className="text-xl md:text italic text-white leading-relaxed">
              “{hadithText}”
              {hadithSource && (
                <span className="text-2xl block mt-2 text-gray-200">– {hadithSource}</span>
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



const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

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

  return (
    <section className="w-full font-[Inter] bg-green-100 py-10 px-4">
      <motion.h2
        className="text-4xl font-extrabold text-center text-indigo-800 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h2>

      <div
        className="grid gap-8 justify-items-center mx-auto"
        style={{
          gridTemplateColumns: `repeat(var(--grid-cols, 1), minmax(0, 1fr))`,
        }}
      >
        {places.map((place, index) => (
          <motion.div
            key={place.id || index}
            className="bg-gradient-to-br from-white via-slate-100 to-gray-50 shadow-xl rounded-2xl overflow-hidden cursor-pointer transform w-full max-w-sm border border-gray-200"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setExpandedIndex(index)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img
              src={place.image}
              alt={place.name}
              className="w-full h-44 object-cover"
            />
            <div className="p-5">
              <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                {place.tier} – {place.name}
              </h3>
              <p className="text-gray-600 text-sm">{place.description}</p>
              <p className="text-md mt-3 font-semibold text-green-700">
                {place.startingPrice}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {expandedPlace && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedIndex(null)}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white via-slate-50 to-gray-100 rounded-2xl shadow-2xl w-[90%] md:w-[80%] max-h-[90vh] overflow-y-auto p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold text-center text-indigo-900 mb-6">
                {expandedPlace.tier} – {expandedPlace.name}
              </h2>

              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Package Details */}
                <div className="md:w-2/3 text-gray-800 space-y-3 text-[15px]">
                  <p className="italic text-gray-600">{expandedPlace.description}</p>
                  <ul className="list-disc list-inside text-left space-y-2">
                    {[
                      ["Duration", expandedPlace.duration],
                      ["Makkah Hotel", expandedPlace.makkahHotel],
                      ["Madinah Hotel", expandedPlace.madinahHotel],
                      ["Transport", expandedPlace.transport],
                      ["Meals", expandedPlace.meals],
                      ["Ziyarat Tour", expandedPlace.ziyarat],
                      expandedPlace.visaAndInsurance && ["Visa & Insurance", expandedPlace.visaAndInsurance],
                      expandedPlace.visaInsuranceSim && ["Visa, Insurance & SIM", expandedPlace.visaInsuranceSim],
                      expandedPlace.visaInsuranceVIP && ["Visa, Insurance, VIP Lounge", expandedPlace.visaInsuranceVIP],
                      ["Group Size", expandedPlace.groupSize],
                      ["Extras", expandedPlace.extras.join(", ")],
                      ["Starting From", expandedPlace.startingPrice],
                    ]
                      .filter(Boolean)
                      .map(([label, value], i) => (
                        <motion.li
                          key={label}
                          custom={i}
                          initial="hidden"
                          animate="visible"
                          variants={listItemVariants}
                          className="text-gray-800"
                        >
                          <strong>{label}:</strong> {value}
                        </motion.li>
                      ))}
                  </ul>
                </div>

                {/* Right: Form */}
                <div className="md:w-1/3 bg-white p-6 rounded-xl shadow-inner border border-slate-200">
                  <h3 className="text-xl font-semibold text-center mb-4">Enquire Now</h3>
                  <EnquiryForm
                    packageId={
                      expandedPlace.id ||
                      expandedPlace.packageId ||
                      `umrah-${expandedIndex}`
                    }
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};




//Json Cards 
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
        console.error("Failed to fetch from API:", err);
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

  if (loading) {
    return <div className="text-center py-12 text-lg">Loading places...</div>;
  }

  return (
    <section className="py-12 px-4 md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
      <div
        className="grid gap-8 justify-items-center"
        style={{
          gridTemplateColumns: `repeat(var(--grid-cols, 1), minmax(0, 1fr))`,
        }}
      >
        {places.map((place, index) => (
          <div
            key={place.id}
            className="bg-white shadow-md rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 duration-300 w-full max-w-sm"
            onClick={() => setExpandedIndex(index)}
          >
            <img src={place.image} alt={place.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{place.title}</h3>
              <p className="text-gray-600 text-sm">{place.shortDescription}</p>
            </div>
          </div>
        ))}
      </div>

      {expandedPlace && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center"
          onClick={() => setExpandedIndex(null)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="relative bg-white w-[90%] md:w-[70%] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Back Button */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setExpandedIndex(null)}
              sx={{
                position: "absolute",
                top: 16,
                left: 16,
                textTransform: "none",
              }}
              startIcon={<FaArrowLeft />}
            >
              Back
            </Button>

            {/* Navigation Buttons */}
            <div className="flex justify-end gap-4 mb-4 mt-2">
              <Button
                onClick={() => setExpandedIndex((prev) => prev - 1)}
                disabled={expandedIndex <= 0}
                startIcon={<FaArrowLeft />}
                variant="outlined"
              >
                Prev
              </Button>
              <Button
                onClick={() => setExpandedIndex((prev) => prev + 1)}
                disabled={expandedIndex >= places.length - 1}
                endIcon={<FaArrowRight />}
                variant="outlined"
              >
                Next
              </Button>
            </div>

            {/* Hero Image */}
            <div className="flex justify-center mb-6">
              <motion.img
                src={expandedPlace.heroImage}
                alt={expandedPlace.title}
                className="rounded-lg object-contain w-full"
                style={{ maxHeight: "320px", maxWidth: "100%" }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Title & Descriptions */}
            <h2 className="text-3xl font-bold mb-4 text-center">{expandedPlace.title}</h2>
            {[...Array(5).keys()].map((i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-6">
                {expandedPlace[`fullDescription${i === 0 ? "" : i + 1}`]}
              </p>
            ))}

            {/* Gallery */}
            {expandedPlace.gallery?.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {expandedPlace.gallery.map((img, idx) => (
                    <motion.img
                      key={idx}
                      src={img}
                      alt={`${expandedPlace.title} ${idx + 1}`}
                      className="rounded-lg object-cover w-full h-40"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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
                className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300"
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
  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      packageId: packageId || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      phone: Yup.string()
        .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
        .required('Phone is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch(`${API_URL}/enquiry`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          alert('Enquiry submitted successfully!');
          resetForm();
        } else {
          alert('Failed to submit enquiry.');
        }
      } catch (error) {
        alert('Something went wrong.');
        console.error(error);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, maxWidth: 400, mx: 'auto' }}>
        {/* <Typography variant="h6" gutterBottom>
          Enquire Now
        </Typography> */}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Your Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone Number"
            margin="normal"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email Address"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            id="package"
            name="package"
            label="Package ID"
            margin="normal"
            value={formik.values.packageId}
            disabled
          />

          <Box mt={2}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </motion.div>
  );
};

//popup ad
export function PopupAd() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem("popup_shown");

    if (!hasShown) {
      const timer = setTimeout(() => {
        setShow(true);
        sessionStorage.setItem("popup_shown", "true");
      }, 6000); // 6 seconds delay

      return () => clearTimeout(timer);
    }
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
