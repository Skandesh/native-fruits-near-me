import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LocalFruits from "@/components/LocalFruits";
import SeasonalCalendar from "@/components/SeasonalCalendar";
import FruitFinder from "@/components/FruitFinder";
import FruitRecipes from "@/components/FruitRecipes";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <LocalFruits />
      <SeasonalCalendar />
      <FruitFinder />
      <FruitRecipes />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
};

export default Index;
