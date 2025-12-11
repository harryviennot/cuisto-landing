import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import Founder from "@/components/sections/Founder";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Problem />
      <HowItWorks />
      <Features />
      <Founder />
      <FinalCTA />
      <Footer />
    </main>
  );
}
