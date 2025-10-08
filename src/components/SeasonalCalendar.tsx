import { useState } from "react";
import { Calendar, MapPin, Leaf, ChevronRight } from "lucide-react";

const seasons = {
  spring: {
    name: "Spring (Mar-May)",
    fruits: {
      "North America": ["Wild Strawberries", "Serviceberries", "Early Mulberries"],
      "Mediterranean": ["Early Figs", "Strawberry Tree", "Service Tree Fruits"],
      "Southeast Asia": ["Mango varieties", "Mangosteen", "Rambutan"],
      "South America": ["Passion Fruit", "Early Camu Camu", "Açaí"],
      "Africa": ["Wild Strawberries", "Early Mulberries", "Jujube"],
      "Oceania": ["Lilly Pilly", "Midyim", "Native Raspberry"],
      "India": ["Early Mangoes", "Karonda", "Citrus varieties"]
    }
  },
  summer: {
    name: "Summer (Jun-Aug)",
    fruits: {
      "North America": ["Wild Blueberries", "Salmonberry", "Pawpaw", "Wild Plums"],
      "Mediterranean": ["Grapes", "Figs", "Pomegranates", "Carob"],
      "Southeast Asia": ["Durian", "Mangosteen", "Rambutan", "Longan"],
      "South America": ["Camu Camu", "Cupuaçu", "Açaí", "Buriti"],
      "Africa": ["Marula", "Monkey Orange", "Tamarind", "Jackalberry"],
      "Oceania": ["Finger Lime", "Davidson Plum", "Burdekin Plum"],
      "India": ["Mangoes peak", "Jamun", "Jackfruit", "Phalsa", "Litchi"]
    }
  },
  autumn: {
    name: "Autumn (Sep-Nov)",
    fruits: {
      "North America": ["American Persimmon", "Crabapples", "Elderberries", "Black Walnuts"],
      "Mediterranean": ["Olives", "Pomegranates", "Persimmons", "Chestnuts"],
      "Southeast Asia": ["Dragon Fruit", "Pomelo", "Guava", "Tamarind"],
      "South America": ["Açaí peak", "Camu Camu", "Passion Fruit", "Peach Palm"],
      "Africa": ["Baobab", "Marula", "Sausage Fruit", "Waterberry"],
      "Oceania": ["Quandong", "Bush Tomato", "Wattleseed", "Muntries"],
      "India": ["Sitaphal", "Sharifa", "Ber starting", "Citrus varieties"]
    }
  },
  winter: {
    name: "Winter (Dec-Feb)",
    fruits: {
      "North America": ["Winterberry", "Rose Hips", "Dried Persimmons", "Stored Nuts"],
      "Mediterranean": ["Citrus", "Persimmons", "Stored Figs", "Dried Fruits"],
      "Southeast Asia": ["Year-round fruits", "Tropical varieties"],
      "South America": ["Year-round Amazon fruits", "Coconut"],
      "Africa": ["Date Palm", "Jujube", "Baobab powder", "Stored fruits"],
      "Oceania": ["Year-round tropical fruits", "Coconut"],
      "India": ["Amla peak", "Ber", "Nagpur Orange", "Kinnow"]
    }
  }
};

const regions = ["North America", "Mediterranean", "Southeast Asia", "South America", "Africa", "Oceania", "India"];

const SeasonalCalendar = () => {
  const [selectedSeason, setSelectedSeason] = useState<keyof typeof seasons>("summer");
  const [selectedRegion, setSelectedRegion] = useState<string>("North America");

  const currentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return "spring";
    if (month >= 5 && month <= 7) return "summer";
    if (month >= 8 && month <= 10) return "autumn";
    return "winter";
  };

  const currentFruits = seasons[selectedSeason].fruits[selectedRegion as keyof typeof seasons[keyof typeof seasons]["fruits"]] || [];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Seasonal Fruit Calendar
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover what fruits are in season right now in your region. Nature's bounty changes throughout the year.
          </p>
        </div>

        {/* Season Selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {Object.entries(seasons).map(([key, season]) => (
            <button
              key={key}
              onClick={() => setSelectedSeason(key as keyof typeof seasons)}
              className={`p-6 rounded-xl transition-all duration-300 ${
                selectedSeason === key
                  ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg scale-105"
                  : "bg-card hover:bg-accent hover:shadow-md"
              }`}
            >
              <Calendar className="w-8 h-8 mb-3 mx-auto" />
              <h3 className="font-semibold text-lg mb-1">{season.name}</h3>
              {currentSeason() === key && (
                <span className="text-xs opacity-90">Current Season</span>
              )}
            </button>
          ))}
        </div>

        {/* Region Selector */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Select Your Region:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  selectedRegion === region
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary hover:bg-secondary/80"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Fruits Display */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Leaf className="w-6 h-6 text-primary" />
              {seasons[selectedSeason].name} in {selectedRegion}
            </h3>

            {currentFruits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentFruits.map((fruit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-muted rounded-xl hover:bg-accent transition-colors cursor-pointer group"
                  >
                    <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full" />
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {fruit}
                    </span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                Limited fruit availability during this season. Consider preserved or stored fruits from previous harvests.
              </p>
            )}

            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong>Tip:</strong> Fruits listed are typical for the season but availability may vary based on specific climate conditions,
                elevation, and local microclimates. Always verify identification before consuming wild fruits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalCalendar;