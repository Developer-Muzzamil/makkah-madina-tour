// ScrollReveal.js
import { motion } from "framer-motion";

const ScrollReveal = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}  // Start off-screen and invisible
      whileInView={{ opacity: 1, y: 0 }} // When in view, fade and move to original position
      transition={{ duration: 0.8 }} // Transition duration
      viewport={{ once: false, amount: 0.3 }} // Triggers when 30% of the element is in view
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
