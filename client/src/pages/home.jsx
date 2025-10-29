import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturedSection from "../components/FeaturedSection";
import TrailersSection from "../components/TrailerSection";
import TestPlayer from "../lib/test";
import Footer from "../components/Footer";

const home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedSection />
      <TrailersSection/>
    </div>
  );
};

export default home;
