import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRef } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const SUPPORTED_IMAGE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const MAX_IMAGE_SIZE = 300 * 1024; // 300kb
const SUPPORTED_DOC_FORMATS = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/jpg'
];
const MAX_DOC_SIZE = 2 * 1024 * 1024; // 2MB per file

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  gender: Yup.string().required('Gender is required'),
  profilePic: Yup.mixed()
    .required('Profile picture is required')
    .test(
      'fileFormat',
      'Only JPG or PNG files are allowed',
      value => value && (value.type === 'image/jpeg' || value.type === 'image/png')
    )
    .test(
      'fileSize',
      'Profile picture must be less than 300kb',
      value => value && value.size <= MAX_IMAGE_SIZE
    ),
  idProof: Yup.mixed()
    .required('ID Proof is required')
    .test(
      'fileSize',
      'ID Proof must be less than 2MB',
      value => value && value.size <= MAX_DOC_SIZE
    )
    .test(
      'fileFormat',
      'Only PDF, DOC, DOCX, JPG, PNG files are allowed',
      value => value && SUPPORTED_DOC_FORMATS.includes(value.type)
    ),
  contact: Yup.string()
    .required('Contact is required')
    .matches(/^[0-9]{10}$/, 'Contact must be exactly 10 digits'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  location: Yup.string().required('Location is required'),
  languages: Yup.string().required('Languages are required'),
  age: Yup.number().typeError('Age must be a number').required('Age is required').min(18, 'Must be at least 18'),
  charges: Yup.number().typeError('Charges must be a number').required('Charges are required').min(0, 'Cannot be negative'),
  experience: Yup.string().required('Experience is required'),
  areas: Yup.string().required('Areas of expertise are required'),
  availability: Yup.string().required('Availability is required'),
  description: Yup.string().required('Description is required'),
  social: Yup.string().url('Must be a valid URL').nullable(),
  license: Yup.string(),
  certificationsFiles: Yup.mixed()
    .test(
      'fileSize',
      'Each file must be less than 2MB',
      value =>
        !value ||
        (value.length > 0 &&
          Array.from(value).every(file => file.size <= MAX_DOC_SIZE))
    )
    .test(
      'fileFormat',
      'Only PDF, DOC, DOCX, JPG, PNG files are allowed',
      value =>
        !value ||
        (value.length > 0 &&
          Array.from(value).every(file => SUPPORTED_DOC_FORMATS.includes(file.type)))
    ),
});

export default function RegisterGuide() {
  const profilePicRef = useRef(null);
  const idProofRef = useRef(null);
  const certInputRef = useRef(null);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f6f5ee] via-[#f6f5ee] to-[#f0ede6] py-12 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border-t-4 border-[#E5B649] p-8 md:p-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#22996E] mb-1 tracking-tight font-serif text-center">
          Register as a Tour Guide
        </h2>
        <ul className="mb-8 mt-4 text-[#22996E] text-base md:text-lg leading-relaxed list-inside space-y-3 font-medium">
          <li className="flex items-center gap-2">
            <span className="inline-block w-6 text-xl text-[#E5B649]">★</span>
            <span>
              <b>Mandatory:</b> Upload a clear profile photo (JPG or PNG) and a valid ID proof (passport, Iqama, etc.) to verify your identity.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block w-6 text-xl text-[#E5B649]">★</span>
            <span>
              Fill in all required personal and professional details to help us match you with travelers.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block w-6 text-xl text-[#E5B649]">★</span>
            <span>
              <b>Optional:</b> Upload certificates, resume, or other supporting documents to strengthen your profile.
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block w-6 text-xl text-[#E5B649]">★</span>
            <span>
              All your data will be kept secure and used only for verification and matching purposes.
            </span>
          </li>
        </ul>
        <Formik
          initialValues={{
            name: '', gender: '', profilePic: null, idProof: null, contact: '', email: '', location: '', languages: '', age: '', charges: '',
            experience: '', areas: '', availability: '', description: '', social: '', license: '', certificationsFiles: null,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm, setSubmitting, setFieldValue }) => {
            try {
              const formData = new FormData();
              Object.entries(values).forEach(([key, value]) => {
                if (key === 'profilePic' && value) {
                  formData.append('profilePic', value);
                } else if (key === 'idProof' && value) {
                  formData.append('idProof', value);
                } else if (key === 'certificationsFiles' && value) {
                  for (let file of value) {
                    formData.append('certificationsFiles', file);
                  }
                } else if (
                  key !== 'profilePic' &&
                  key !== 'idProof' &&
                  key !== 'certificationsFiles'
                ) {
                  formData.append(key, value);
                }
              });

              await axios.post(`${API_URL}/guides/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
              });
              alert('Guide Registered!');
              resetForm();
              if (profilePicRef.current) profilePicRef.current.value = '';
              if (idProofRef.current) idProofRef.current.value = '';
              if (certInputRef.current) certInputRef.current.value = '';
              setFieldValue('profilePic', null);
              setFieldValue('idProof', null);
              setFieldValue('certificationsFiles', null);
            } catch (err) {
              alert('Registration failed!');
              console.error(err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Field
                    name="name"
                    placeholder="Full Name"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field as="select" name="gender"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              {/* Profile Pic Upload */}
              <div>
                <label className="block text-sm font-medium text-[#22996E] mb-1">
                  Profile Picture (JPG/PNG, max 300kb) <span className="text-red-500">*</span>
                </label>
                <input
                  name="profilePic"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  ref={profilePicRef}
                  className="block w-full text-sm text-gray-700 border border-[#E5B649]/40 rounded-xl cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition py-2 px-3"
                  onChange={event => {
                    setFieldValue('profilePic', event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="profilePic" component="div" className="text-red-500 text-xs mt-1" />
                {values.profilePic && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(values.profilePic)}
                      alt="Profile Preview"
                      className="h-20 w-20 object-cover rounded-full border"
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {(values.profilePic.size / 1024).toFixed(1)} kb
                    </div>
                  </div>
                )}
              </div>
              {/* ID Proof Upload */}
              <div>
                <label className="block text-sm font-medium text-[#22996E] mb-1">
                  ID Proof (Passport / Iqama / etc., PDF/JPG/PNG/DOC, max 2MB) <span className="text-red-500">*</span>
                </label>
                <input
                  name="idProof"
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  ref={idProofRef}
                  className="block w-full text-sm text-gray-700 border border-[#E5B649]/40 rounded-xl cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition py-2 px-3"
                  onChange={event => {
                    setFieldValue('idProof', event.currentTarget.files[0]);
                  }}
                />
                <ErrorMessage name="idProof" component="div" className="text-red-500 text-xs mt-1" />
                {values.idProof && (
                  <div className="mt-2 text-xs text-gray-600">
                    {values.idProof.name} ({(values.idProof.size / 1024).toFixed(1)} kb)
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Field
                    name="contact"
                    placeholder="Contact (10 digits)"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="contact" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="location"
                    placeholder="Location/City"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="location" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="languages"
                    placeholder="Languages Spoken (comma separated)"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="languages" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="age"
                    type="number"
                    placeholder="Age"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="age" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="charges"
                    type="number"
                    placeholder="Charges per day (in $)"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="charges" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="experience"
                    placeholder="Years of Experience"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="experience" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="areas"
                    placeholder="Areas of Expertise (e.g., history, adventure)"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="areas" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field as="select" name="availability"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  >
                    <option value="">Availability</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Seasonal">Seasonal</option>
                  </Field>
                  <ErrorMessage name="availability" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <Field
                    name="license"
                    placeholder="License/Certification (optional)"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="license" component="div" className="text-red-500 text-xs mt-1" />
                </div>
              </div>
              <div>
                <Field
                  name="description"
                  as="textarea"
                  placeholder="Tell us about yourself and your guiding style"
                  className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  rows={3}
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Field
                    name="social"
                    placeholder="Social Media Link (optional)"
                    className="w-full border border-[#E5B649]/40 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition"
                  />
                  <ErrorMessage name="social" component="div" className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  {/* Empty to preserve layout */}
                </div>
              </div>
              {/* Certifications/Resume Upload */}
              <div>
                <label className="block text-sm font-medium text-[#22996E] mb-1">
                  Certificates / Resume / Documents (optional)
                </label>
                <input
                  name="certificationsFiles"
                  type="file"
                  ref={certInputRef}
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  className="block w-full text-sm text-gray-700 border border-[#E5B649]/40 rounded-xl cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#22996E]/60 transition py-2 px-3"
                  onChange={event => {
                    setFieldValue('certificationsFiles', event.currentTarget.files);
                  }}
                />
                <ErrorMessage name="certificationsFiles" component="div" className="text-red-500 text-xs mt-1" />
                {values.certificationsFiles && values.certificationsFiles.length > 0 && (
                  <div className="mt-2 text-xs text-gray-600">
                    {Array.from(values.certificationsFiles).map((file, idx) => (
                      <div key={idx}>
                        {file.name} ({(file.size/1024).toFixed(1)} kb)
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-4 py-2 w-full bg-gradient-to-r from-[#279c10] to-[#1bc768] rounded-xl text-white font-semibold shadow hover:scale-105 transition"
              >
                {isSubmitting ? 'Registering...' : 'Register as Guide'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}