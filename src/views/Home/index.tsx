"use client";
import Benefits from "./Benefits";
import Hero from "./Hero";
import Statistic from "./Statistic";

const Home = () => {
  return (
    <div className="max-w-[1980px] mx-auto px-20">
      <Hero />
      <Benefits />
      <Statistic />
    </div>
  );
};

export default Home;
