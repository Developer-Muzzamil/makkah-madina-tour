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

      <TestimonialsSection />

      <div id="contact-form">
      <ContactUs />
      </div>
 
      {window.scrollTo(0, 0)}

    </>
  );
}

export default Aboutus;
