import { useState, useEffect } from "react";
import { MapPin, Calendar, Leaf, AlertCircle, RefreshCw, Sparkles } from "lucide-react";
import { useLocationDetection } from "@/hooks/useLocationDetection";

const fruitsByRegionAndSeason = {
  "North America": {
    spring: ["Wild Strawberries", "Serviceberries", "Early Mulberries", "Oregon Grape"],
    summer: ["Wild Blueberries", "Salmonberry", "Thimbleberry", "Huckleberries", "Pawpaw"],
    autumn: ["American Persimmon", "Crabapples", "Elderberries", "Black Walnuts", "Wild Grapes"],
    winter: ["Winterberry", "Rose Hips", "Dried Persimmons", "Stored Nuts"]
  },
  "Mediterranean": {
    spring: ["Early Figs", "Strawberry Tree Fruit", "Service Tree Fruits", "Myrtle Berries"],
    summer: ["Grapes", "Figs", "Mulberries", "Early Olives", "Carob Pods"],
    autumn: ["Olives", "Pomegranates", "Persimmons", "Chestnuts", "Medlars"],
    winter: ["Citrus", "Persimmons", "Stored Figs", "Dried Fruits"]
  },
  "Southeast Asia": {
    spring: ["Mango varieties", "Mangosteen", "Rambutan", "Langsat"],
    summer: ["Durian", "Mangosteen", "Rambutan", "Longan", "Mangosteen"],
    autumn: ["Dragon Fruit", "Pomelo", "Guava", "Tamarind", "Soursop"],
    winter: ["Year-round tropical fruits", "Coconut", "Banana", "Papaya"]
  },
  "South America": {
    spring: ["Passion Fruit", "Early Camu Camu", "Açaí", "Cupuaçu"],
    summer: ["Camu Camu", "Cupuaçu", "Açaí", "Buriti", "Jaboticaba"],
    autumn: ["Açaí peak", "Camu Camu", "Passion Fruit", "Peach Palm", "Guava"],
    winter: ["Year-round Amazon fruits", "Coconut", "Acerola"]
  },
  "Africa": {
    spring: ["Wild Strawberries", "Early Mulberries", "Jujube", "Marula starting"],
    summer: ["Marula", "Monkey Orange", "Tamarind", "Jackalberry", "Waterberry"],
    autumn: ["Baobab", "Marula", "Sausage Fruit", "Waterberry", "Kei Apple"],
    winter: ["Date Palm", "Jujube", "Baobab powder", "Stored fruits", "Amarula"]
  },
  "Oceania": {
    spring: ["Lilly Pilly", "Midyim", "Native Raspberry", "Davidson Plum starting"],
    summer: ["Finger Lime", "Davidson Plum", "Burdekin Plum", "Bush Tomato", "Muntries"],
    autumn: ["Quandong", "Bush Tomato", "Wattleseed", "Muntries", "Illawarra Plum"],
    winter: ["Year-round tropical fruits", "Coconut", "Native Ginger"]
  },
  "India": {
    spring: ["Early Mangoes", "Karonda", "Citrus varieties", "Mulberries"],
    summer: ["Mangoes peak", "Jamun", "Jackfruit", "Phalsa", "Litchi", "Tadgola"],
    autumn: ["Sitaphal", "Sharifa", "Ber starting", "Citrus varieties", "Chikoo"],
    winter: ["Amla peak", "Ber", "Nagpur Orange", "Kinnow", "Figs", "Custard Apple"]
  }
};

const LocalFruits = () => {
  const { location, loading, error, seasonalInfo, detectLocation, permissionStatus } = useLocationDetection();
  const [showDetails, setShowDetails] = useState(false);

  const getLocalFruits = () => {
    if (!location || !seasonalInfo) return [];

    const regionFruits = fruitsByRegionAndSeason[location.region as keyof typeof fruitsByRegionAndSeason];
    if (!regionFruits) return [];

    return regionFruits[seasonalInfo.season] || [];
  };

  const localFruits = getLocalFruits();

  if (permissionStatus === 'prompt' && !location) {
    return (
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <MapPin className="w-16 h-16 mx-auto text-primary mb-6" />
              <h2 className="text-2xl font-bold mb-4">Discover Fruits Near You</h2>
              <p className="text-muted-foreground mb-6">
                Allow location access to see what native fruits are in season in your area right now!
              </p>
              <button
                onClick={detectLocation}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
              >
                <MapPin className="w-5 h-5" />
                Enable Location
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (permissionStatus === 'denied') {
    return (
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Location Access Denied</h2>
              <p className="text-muted-foreground mb-6">
                No worries! You can still explore fruits by manually selecting your region in the Seasonal Calendar below.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <RefreshCw className="w-16 h-16 mx-auto text-primary animate-spin mb-6" />
              <h2 className="text-2xl font-bold mb-4">Detecting Your Location...</h2>
              <p className="text-muted-foreground">
                Finding native fruits in your area
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Location Error</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={detectLocation}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (location && seasonalInfo) {
    const seasonNames = {
      spring: "Spring",
      summer: "Summer",
      autumn: "Autumn",
      winter: "Winter"
    };

    return (
      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-2xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
                    <MapPin className="w-8 h-8 text-primary" />
                    Fruits Near You
                  </h2>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>{location.city || location.region}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {seasonNames[seasonalInfo.season]} {seasonalInfo.hemisphere === 'southern' ? '(Southern)' : '(Northern)'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-sm text-primary hover:underline"
                >
                  {showDetails ? 'Hide' : 'Show'} Details
                </button>
              </div>

              {showDetails && (
                <div className="mb-6 p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Based on your location in {location.region}, here are the native fruits currently in season.
                    These fruits are naturally adapted to your local climate and are at their peak freshness and nutrition right now.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {localFruits.map((fruit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl hover:from-primary/10 hover:to-secondary/10 transition-all group"
                  >
                    <div className="w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full" />
                    <span className="font-medium group-hover:text-primary transition-colors flex-1">
                      {fruit}
                    </span>
                    <Sparkles className="w-4 h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>

              {localFruits.length === 0 && (
                <div className="text-center py-8">
                  <Leaf className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Limited fruit availability in {location.region} during {seasonNames[seasonalInfo.season]}.
                    Consider exploring year-round tropical fruits or preserved seasonal varieties.
                  </p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Tip:</strong> Always verify fruit identification before consuming. Some fruits may require preparation to be edible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
};

export default LocalFruits;