import React from "react";
import { HeroSection, ContactUs } from "../components/PageComponent";
import { FaPlaceOfWorship } from "react-icons/fa";

const Aboutus = () => {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* HERO */}
      <HeroSection
        title="Next Stop: Haramain"
        title2="Reconnect with Your Faith, Let Us Guide You"
        subtitle="Begin your sacred journey with confidence, comfort, and care."
        backgroundImage="/images/rp/gibili.webp"
      />

      {/* ABOUT US */}
      <section className="py-16">
        <div className="mx-auto px-4 max-w-7xl">
          <div className="flex items-center gap-3 mb-7 animate-fade-in-up">
            <span className="flex items-center justify-center w-11 h-11 rounded-full bg-yellow-100 shadow">
              <FaPlaceOfWorship size={22} className="text-[#168c5f]" />
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              About Us
            </h2>
          </div>
          <div className="rounded-xl shadow-md p-6 md:p-8 text-base md:text-lg leading-relaxed border border-yellow-100 bg-white transition-all duration-500 animate-fade-in-up group hover:shadow-lg hover:border-yellow-300"
            style={{ maxWidth: "100%", minHeight: 240 }}>
            <p className="mb-4 font-semibold transition-opacity duration-700 group-hover:opacity-90 text-gray-900">
              <span className="font-extrabold text-[#c2973e]">NextStop: Haramain</span> is your trusted partner for spiritually enriching journeys to the sacred cities of <span className="font-extrabold">Makkah</span> and <span className="font-extrabold">Madina</span>. We specialize in organizing Hajj and Umrah tours with a deep commitment to comfort, convenience, and a profound spiritual experience.
            </p>
            <p className="mb-4 font-semibold transition-opacity duration-700 group-hover:opacity-90 text-gray-900">
              Rooted in a passion for serving the guests of Allah, our mission is simple — to make your pilgrimage smooth, memorable, and deeply meaningful. Whether you're embarking on Hajj, performing Umrah, or exploring the rich Islamic heritage of the Haramain, we're here to guide you every step of the way.
            </p>
            <div className="mb-4">
              <span className="font-bold text-[#168c5f] block mb-2">What We Offer:</span>
              <ul className="list-disc list-inside pl-4 space-y-1 text-[#168c5f] font-semibold">
                <li className="transition-all duration-300 hover:pl-4 hover:text-[#c2973e]">Tailored Hajj &amp; Umrah Packages for all budgets and needs</li>
                <li className="transition-all duration-300 hover:pl-4 hover:text-[#c2973e]">Expert Guidance &amp; Support throughout your spiritual journey</li>
                <li className="transition-all duration-300 hover:pl-4 hover:text-[#c2973e]">Detailed Information &amp; Travel Tips for nearby historical and religious sites</li>
                <li className="transition-all duration-300 hover:pl-4 hover:text-[#c2973e]">Seamless Logistics – from visa to accommodations &amp; local transport</li>
              </ul>
            </div>
            <p className="mb-4 font-semibold transition-opacity duration-700 group-hover:opacity-90 text-gray-900">
              With a knowledgeable team and local partnerships, we ensure that you not only fulfill your religious duties but also explore the stories and significance behind the landmarks of Makkah and Madina.
            </p>
            <p className="font-semibold transition-opacity duration-700 group-hover:opacity-90 text-gray-900">
              At NextStop: Haramain, we believe every pilgrim deserves peace of mind and a journey that brings them closer to faith. Let us be your companion on this sacred path.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-900 mb-10 animate-fade-in-up">
            Our Vision &amp; Mission
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
            {/* Vision Card */}
            <div className="flex-1 flex items-stretch min-w-[260px] max-w-sm mx-auto animate-fade-in-up animate-delay-100">
              <div className="w-full h-full rounded-lg border border-yellow-200 shadow bg-white flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-yellow-300 group">
                <img
                  src="/images/umrah/umrahstd.jpg"
                  alt="Vision"
                  className="w-full object-cover h-40 transition duration-500"
                  draggable={false}
                  style={{ filter: "none" }}
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
                  <p className="text-gray-900 font-semibold text-sm">
                    To be the leading provider of spiritually enriching, hassle-free journeys to Makkah and Madinah.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="flex-1 flex items-stretch min-w-[260px] max-w-sm mx-auto animate-fade-in-up animate-delay-200">
              <div className="w-full h-full rounded-lg border border-yellow-200 shadow bg-white flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-yellow-300 group">
                <img
                  src="/images/hajj/dua.png"
                  alt="Mission"
                  className="w-full object-cover h-40 transition duration-500"
                  draggable={false}
                  style={{ filter: "none" }}
                />
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
                  <p className="text-gray-900 font-semibold text-sm">
                    To offer personalized pilgrimage packages with a focus on customer satisfaction, safety, and a transformative spiritual experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact-form">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border-yellow-100 animate-fade-in-up animate-delay-300">
            <ContactUs />
          </div>
        </div>
      </section>

      {/* Animations */}
      <style jsx="true">{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.9s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-delay-100 { animation-delay: 0.1s; }
        .animate-delay-200 { animation-delay: 0.2s; }
        .animate-delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};

export default Aboutus;