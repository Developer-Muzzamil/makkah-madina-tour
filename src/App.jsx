import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {HomePage} from './pages/HomePage';
import { ScrollToHashElement } from "./components/PageComponent";
import MakkahPage from './pages/MakkahPage';
import MadinaPage from './pages/MadinaPage';
import HajjPage  from './pages/Hajj'
import Umrah from './pages/Umrah';
import Aboutus  from "./pages/AboutUs";
import ScrollToTop from '../src/Utils/ScrollToTop';

function App() {
  return (
    <>
      <Navbar />
      <ScrollToHashElement />
      <Routes>
     
        <Route path="/home" element={  
          <>
          <HomePage />
           
          </>
        } />
        <Route path="/" element={  
          <>
          <HomePage />
           
          </>
        } />
        <Route path="/makkah" element={<MakkahPage />} />
        <Route path="/madina" element={<MadinaPage />} />
        <Route path="/hajj" element={<HajjPage />} />
        <Route path="/umrah" element={<Umrah />} />
        <Route path="/About" element={<Aboutus />} />
       
      </Routes>
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
