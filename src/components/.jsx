// import React from 'react';
// import { useFormik } from 'formik';
// import emailjs from '@emailjs/browser';

// const BookingForm = ({ guide }) => {
//   const formik = useFormik({
//     initialValues: {
//       user_name: '',
//       user_email: '',
//       user_phone: '',
//     },
//     onSubmit: (values, { resetForm }) => {
//       const templateParams = {
//         user_name: values.user_name,
//         user_email: values.user_email,
//         user_phone: values.user_phone,
//         guide_name: guide.name,
//         guide_email: guide.email,
//         guide_phone: guide.phone,
//       };

//       emailjs.send('service_q7xmi7g', 'template_ypwfhdq', templateParams, 'R-vH9f-R8dc_4MmMm')
//         .then((res) => {
//           alert("Booking request sent successfully!");
//           resetForm();
//         })
//         .catch((err) => {
//           alert("Failed to send email. Try again later.");
//           console.error(err);
//         });
//     }
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label className="block text-gray-700 font-medium mb-1">Your Name:</label>
//       <input type="text" name="user_name" onChange={formik.handleChange} value={formik.values.user_name} required />
//       <input type="text" name="user_name" onChange={formik.handleChange} value={formik.values.user_name} required />

//       <label>Your Email:</label>
//       <input className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="email" name="user_email" onChange={formik.handleChange} value={formik.values.user_email} required />

//       <label  className="block text-gray-700 font-medium mb-1">Your Phone:</label>
//       <input className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="text" name="user_phone" onChange={formik.handleChange} value={formik.values.user_phone} required />

//       <button type="submit">Submit Booking</button>

//     </form>
//   );
// };

// export default BookingForm;


import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const BookingForm = ({ guide }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const templateParams = {
//       user_name: formData.name,
//       user_email: formData.email,
//       user_phone: formData.phone,
//       guide_name: guide.name,
//       guide_email: guide.email,
//       guide_email: guide.phone,
//       to_email: guide.email   
//     };

    
//     emailjs
//       .send('service_q7xmi7g', 'template_ypwfhdq', templateParams, 'R-vH9f-R8dc_4MmMm')
//       .then((result) => {
//         alert('Booking sent successfully!');
//         console.log(result.text);
//       })
//       .catch((error) => {
//         alert('Failed to send booking.');
//         console.error(error);
//       });
//   };

const handleSubmit = async (e) => {
  e.preventDefault();

  const guideParams = {
    user_name: formData.name,
    user_email: formData.email,
    user_phone: formData.phone,
    guide_name: guide.name,
    to_email: guide.email // send to guide
  };

  const userParams = {
    user_name: formData.name,
    to_email: formData.email, // send to user
    guide_name: guide.name,
    guide_email: guide.email,
    guide_phone: guide.phone,
    guide_experience: guide.experience,
    guide_rate: guide.rate
  };

  try {
    // 1. Send email to guide
    await emailjs.send('service_q7xmi7g', 'template_ypwfhdq', guideParams, 'R-vH9f-R8dc_4MmMm');

    // 2. Send email to user
    await emailjs.send('service_q7xmi7g', 'template_2utoyat', userParams, 'R-vH9f-R8dc_4MmMm');

    alert(`Booking confirmed with ${guide.name}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    alert('Failed to send booking. Please try again later.');
  }
};


  return (
    <div style={{
      maxWidth: '500px',
      margin: '0 auto',
      padding: '30px',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontWeight: 'bold',
      }}>
        Booking for {guide.name}
      </h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Your Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Submit Booking
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '12px 15px',
  fontSize: '16px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  outline: 'none'
};

const buttonStyle = {
  padding: '12px',
  backgroundColor: '#2563eb',
  color: '#fff',
  fontSize: '16px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease'
};

export default BookingForm;
