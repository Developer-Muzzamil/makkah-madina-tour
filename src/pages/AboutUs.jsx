import React, { useState, useRef, useEffect } from "react";
import {
  HeroSection,
  ImageTextSection,
  Card,
  PlacesCards,
  ContactUs,
  EnquiryForm,
  CardE,
  ExpandableCard
} from "../components/PageComponent";
import { FaPlaceOfWorship } from "react-icons/fa";

const descrin = `
NextStop: Haramain is your trusted partner for spiritually enriching journeys to the sacred cities of Makkah and Madina. We specialize in organizing Hajj and Umrah tours with a deep commitment to comfort, convenience, and a profound spiritual experience.

Rooted in a passion for serving the guests of Allah, our mission is simple — to make your pilgrimage smooth, memorable, and deeply meaningful. Whether you're embarking on Hajj, performing Umrah, or exploring the rich Islamic heritage of the Haramain, we're here to guide you every step of the way.

What We Offer:
• Tailored Hajj & Umrah Packages that suit all budgets and needs
• Expert Guidance & Support throughout your spiritual journey
• Detailed Information & Travel Tips for nearby historical and religious sites
• Seamless Logistics – from visa processing to comfortable accommodations and local transport

With a knowledgeable team and local partnerships, we ensure that you not only fulfill your religious duties but also explore the stories and significance behind the landmarks of Makkah and Madina.

At NextStop: Haramain, we believe that every pilgrim deserves peace of mind and a journey that brings them closer to their faith. Let us be your companion on this sacred path.
`;

const umrahPackages = [
    {
      id: 1,
      tier: "🥈 Silver Umrah Package",
      name: "Basic Blessings",
      description: "Ideal for budget-conscious pilgrims.",
      duration: "10 Days (5 Makkah + 5 Madinah)",
      makkahHotel: "Al Kiswah Towers or similar (3-star, ~900m from Haram)",
      madinahHotel: "Al Mukhtara International or similar (3-star, ~700m from Prophet’s Mosque)",
      transport: "Shared AC Bus",
      meals: "No meals / optional breakfast add-on",
      ziyarat: "Basic local tour included",
      visaAndInsurance: "Included",
      groupSize: "30–40 people",
      extras: ["Zamzam water (5L)", "Umrah Guidebook"],
      startingPrice: "$950 USD per person"
    },
    {
      id: 2,
      tier: "🥇 Gold Umrah Package",
      name: "Comfort & Barakah",
      description: "Balanced experience with comfort and convenience.",
      duration: "12 Days (6 Makkah + 6 Madinah)",
      makkahHotel: "Dar Al Eiman Grand or similar (4-star, ~500m from Haram)",
      madinahHotel: "Al Eiman Taibah or similar (4-star, ~300m from Masjid an-Nabawi)",
      transport: "Semi-private van / luxury bus",
      meals: "Daily Breakfast + Dinner",
      ziyarat: "Guided tours in both cities",
      visaInsuranceSim: "Included",
      groupSize: "15–25 people",
      extras: ["Laundry (3 times)", "Prayer mat gift"],
      startingPrice: "$1,750 USD per person"
    },
    {
      id: 3,
      tier: "💎 Diamond Umrah Package",
      name: "Premium Serenity",
      description: "Luxury for pilgrims who seek peace and personalized care.",
      duration: "14 Days (7 Makkah + 7 Madinah)",
      makkahHotel: "Swissotel / Hilton Suites (5-star, 100m or less from Haram)",
      madinahHotel: "Anwar Al Madinah Mövenpick / Frontel Al Harithia (5-star, <100m)",
      transport: "Private luxury SUV / chauffeured service",
      meals: "All meals included (5-star buffet)",
      ziyarat: "Private guided tour with historian guide",
      visaInsuranceVIP: "Included",
      groupSize: "Private / Family-based",
      extras: [
        "Complimentary Ihram kit",
        "Gift bag",
        "Laundry service",
        "Zamzam pack",
        "Priority check-in"
      ],
      startingPrice: "$3,200 USD per person"
    }
  ];
  
  const hajjPackages = [
    {
      id: "hajj-silver",
      tier: "🥈 Silver",
      name: "Hajj Package – Essential Journey",
      description: "Affordable option for fulfilling your Hajj with necessary services.",
      duration: "35–40 Days (Long Stay)",
      makkahHotel: "3-star, 1.5–2 km from Haram (e.g., Al Kiswah Towers)",
      madinahHotel: "3-star, 500–800m from Masjid an-Nabawi",
      minaArafat: "Standard tents (shared), mats & basic cooling",
      meals: "Breakfast only in hotels, Maktab-provided meals in Mina/Arafat",
      transport: "Air-conditioned buses (group transport)",
      ziyarat: "Group tours in Makkah & Madinah",
      visaAndInsurance: "Visa, Insurance, and Hajj ID included",
      groupSize: "40–50 pilgrims",
      extras: ["Ihram", "Hajj guidebook", "Zamzam water"],
      startingPrice: "$6,500 – $7,500 USD per person"
    },
    {
      id: "hajj-gold",
      tier: "🥇 Gold",
      name: "Hajj Package – Balanced & Comfortable",
      description: "Comfort-focused Hajj without luxury costs.",
      duration: "20–25 Days",
      makkahHotel: "4-star, 500–700m from Haram (e.g., Dar Al Eiman Grand)",
      madinahHotel: "4-star, 300–400m from Masjid an-Nabawi",
      minaArafat: "Upgraded air-conditioned tents with mattress/sofa beds",
      meals: "Breakfast & Dinner included, buffet meals in Mina/Arafat",
      transport: "Private group van or deluxe bus with fixed slots",
      ziyarat: "Guided with scholars",
      visaInsuranceSim: "Visa, Insurance & SIM included",
      groupSize: "20–30 pilgrims",
      extras: ["Ihram kit", "Prayer rug", "Zamzam", "Laundry x2"],
      startingPrice: "$9,000 – $11,000 USD per person"
    },
    {
      id: "hajj-diamond",
      tier: "💎 Diamond",
      name: "Hajj Package – VIP Spiritual Excellence",
      description: "Top-tier luxury Hajj with comfort, convenience, and peace of mind.",
      duration: "14–18 Days (Short Stay / Express Hajj)",
      makkahHotel: "5-star (e.g., Swissotel, Conrad), <200m from Haram",
      madinahHotel: "5-star (e.g., Oberoi, Mövenpick), <150m from Masjid",
      minaArafat: "VIP tents with private AC, beds, carpeted floors, buffet meals",
      meals: "All-inclusive gourmet (buffet) meals throughout",
      transport: "Private car / luxury coach / fast-track shuttle",
      ziyarat: "Private guided with multi-lingual scholars",
      visaInsuranceVIP: "Visa, Insurance, VIP Processing, SIM, Porter all included",
      groupSize: "8–15 (Family or elite groups)",
      extras: ["Ihram luxury kit", "Premium gift box", "Concierge", "Zamzam 10L pack"],
      startingPrice: "$13,000 – $18,000+ USD per person"
    }
  ];
  
// Scroll-triggered visibility hook
function useIsVisible(ref) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return isVisible;
}

// Animated fade-in container
function AnimatedContainer({ children }) {
  const ref = useRef();
  const isVisible = useIsVisible(ref);
  return (
    <div
      ref={ref}
      className={`transform transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}

// Testimonials component
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Dr. Sara Zubia",
      quote:
        "Thank you, Dr Mohamed, Um Ibrahim and Ibrahim, for all your efforts throughout our Hajj. We had a wonderful experience alhamdu lil Illah. We genuinely felt we were travelling with our family. We could not ask for more.",
    },
    {
      name: "Mustafa Abass",
      quote:
        "London group arrived safely alhamdulillah. Jazakallah Mohammed ben Othman and everyone else… had a hajj mabroor and return home safely, start a new beautiful life with baraka from Allah swt.",
    },
    {
      name: "Zakariya Aways",
      quote:
        "Guys, it was a pleasure meeting you all and blessed to have done Hajj at a young age… Truly a great experience for me.",
    },
  ];

  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Testimonials</h2>
      <div className="space-y-8 max-w-3xl mx-auto">
        {testimonials.map((t, i) => (
          <AnimatedContainer key={i}>
            <blockquote className="bg-white p-6 border-l-4 border-primary">
              <p className="italic">“{t.quote}”</p>
              <footer className="mt-2 text-right font-semibold">
                – {t.name}
              </footer>
            </blockquote>
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
}

// Main component
function Aboutus() {
  return (
    <>
      <HeroSection
        title="Next Stop: Haramain"
        title2="Reconnect with Your Faith, Let Us Guide You"
        subtitle="Begin your sacred journey with confidence, comfort, and care."
        backgroundImage="/images/umrah/about2.png"
      />


<ImageTextSection
      title="About Us"
      colorScheme="alt"
      description={
        <>
          <span className="mb-4">
            NextStop: Haramain is your trusted partner for spiritually enriching
            journeys to the sacred cities of Makkah and Madina. We specialize in
            organizing Hajj and Umrah tours with a deep commitment to comfort,
            convenience, and a profound spiritual experience.
          </span>

          <span className="mb-4">
            Rooted in a passion for serving the guests of Allah, our mission is
            simple — to make your pilgrimage smooth, memorable, and deeply meaningful.
            Whether you're embarking on Hajj, performing Umrah, or exploring the
            rich Islamic heritage of the Haramain, we're here to guide you every step of the way.
          </span>

          <p className="mb-4">
  <span className="font-semibold mt-4">What We Offer:</span>
</p>
<ul className="list-disc list-inside mb-4">
  <li>Tailored Hajj & Umrah Packages that suit all budgets and needs</li>
  <li>Expert Guidance & Support throughout your spiritual journey</li>
  <li>
    Detailed Information & Travel Tips for nearby historical and religious sites
  </li>
  <li>
    Seamless Logistics – from visa processing to comfortable accommodations and local transport
  </li>
</ul>

          <p className="mb-4">
            With a knowledgeable team and local partnerships, we ensure that you not
            only fulfill your religious duties but also explore the stories and significance
            behind the landmarks of Makkah and Madina.
          </p>

          <p>
            At NextStop: Haramain, we believe that every pilgrim deserves peace of
            mind and a journey that brings them closer to their faith. Let us be
            your companion on this sacred path.
          </p>
        </>
      }
    />


    

<div className="bg-gray-100 py-12 px-4 md:px-12 text-center">
        <h2 className="text-5xl font-bold mb-8">Our Vision & Mission</h2>
        <div className="flex md:flex justify-center gap-6 flex-wrap">
          <Card
            title="Our Vision"
            description="To be the leading provider of spiritually enriching, hassle-free journeys to Makkah and Madinah."
            link="#"
            image='/images/umrah/umrahstd.jpg'
          />
          <Card
            title="Our Mission"
            description="To offer personalized pilgrimage packages with a focus on customer satisfaction, safety, and a transformative spiritual experience."
            link="#"
            image={'/images/hajj/dua.png'}
          />
        </div>
      </div>
<div className="bg-gray-100 py-12 px-4 md:px-12 flex flex-col items-center space-y-12">
  <div className="text-center w-full max-w-7xl">
    <CardE title="Umrah Packages" places={umrahPackages} />
  </div>

  <div className="text-center w-full max-w-7xl">
    <CardE title="Hajj Packages" places={hajjPackages} description />
  </div>
</div>















      {/* <div className="bg-gray-100 py-12 px-4 md:px-12 flex flex-col items-center space-y-12">
        <div className="text-center w-full max-w-7xl">
          <PlacesCards places={umrahPackages} title="Umrah Packages" image="" />
          
        </div>
        <div className="text-center w-full max-w-7xl">
          
          
          <PlacesCards places={hajjPackages} title="Hajj Packages" />
        </div>
      </div> */}
      <TestimonialsSection />

      <div id="contact-form">
      <ContactUs />
      </div>
 
      {window.scrollTo(0, 0)}

    </>
  );
}

export default Aboutus;
