import React, { useState, useEffect } from 'react';
import { motion,AnimatePresence} from 'framer-motion';
import { ArrowUpCircle  } from 'lucide-react'; 

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-yellow-300 hover:bg-yellow-500 text-white rounded-full shadow-lg z-50"
        >
          <ArrowUpCircle size={32} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;