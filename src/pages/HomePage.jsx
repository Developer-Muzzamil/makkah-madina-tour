import React , { useRef, useState, useEffect} from "react";
// import { motion } from "framer-motion";
import { Card, HeroSection, PopupAd } from "../components/PageComponent";

const HeroSections = () => {

  return (
    <HeroSection
      backgroundImage="/images/makkah/masjid_al_jharam-nightview2.jpg"
      title="Explore the beauty and spirituality"
      subtitle="Your comprehensive guide to exploring Makkah and Madinah, the two holiest cities in Islam."
      hadithText= "“(The performance of) Umra is an expiation for the sins committed (between it and the previous one). And the reward of Hajj Mabrur(the one accepted by Allah) is nothing except Paradise.”"
      hadithSource="Prophet Muhammad (صلى الله عليه وسلم)"
    />
  );
};


const ExploreSection = () => {
  return (
    <section className="py-12 px-4  md:px-12 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">Explore Our Site</h2>
      <div className="flex  justify-between gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 pb-4">
        <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
          <Card
            image="/images/makkah/masjid_al_jharam-nightview2.jpg"
            title="Makkah"
            description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
            link="/makkah"
          />
        </div>
        <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
          <Card
            image="/images/madina.jpeg"
            title="Madina"
            description="City of the Prophet (PBUH), home to Masjid al-Nabawi and rich Islamic history."
            link="/madina"
          />
        </div>
        <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
          <Card
            image="/images/umrah/homeumrah.avif"
            title="Umrah"
            description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
            link="/umrah"
          />
        </div>
        <div className="flex-shrink-0 w-64 sm:w-72 md:w-80">
          <Card
            image="/images/hajj/homehajj.png"
            title="Hajj"
            description="The sacred city of Makkah, home to the Kaaba and Masjid al-Haram."
            link="/hajj"
          />
        </div>
      </div>
    </section>
  );
};

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

export const HomePage = () => {
  return (
    <div>
      <PopupAd />
      <HeroSections />
      <ExploreSection />
      <TestimonialsSection/>
    </div>
  );
};