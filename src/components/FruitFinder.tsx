import { useState, useMemo } from "react";
import { Search, Filter, Leaf, Map, Clock, Heart, HeartIcon, X } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface Fruit {
  name: string;
  region: string;
  season: string;
  taste: string;
  nutrition: string;
  uses: string[];
  scientific?: string;
}

const fruitsDatabase: Fruit[] = [
  // North America
  { name: "Pawpaw", region: "North America", season: "Summer", taste: "Tropical, mango-banana", nutrition: "Vitamin C, Magnesium", uses: ["Fresh eating", "Desserts"] },
  { name: "Wild Blueberries", region: "North America", season: "Summer", taste: "Sweet-tart", nutrition: "Antioxidants, Vitamin C", uses: ["Fresh", "Preserves", "Baking"] },
  { name: "American Persimmon", region: "North America", season: "Autumn", taste: "Sweet, honey-like", nutrition: "Vitamin C, Fiber", uses: ["Fresh", "Pudding"] },
  { name: "Serviceberries", region: "North America", season: "Spring", taste: "Almond-like", nutrition: "Iron, Magnesium", uses: ["Fresh", "Pies", "Jelly"] },

  // Mediterranean
  { name: "Figs", region: "Mediterranean", season: "Summer", taste: "Sweet, honey", nutrition: "Fiber, Minerals", uses: ["Fresh", "Dried", "Preserves"] },
  { name: "Olives", region: "Mediterranean", season: "Autumn", taste: "Bitter when raw", nutrition: "Healthy fats", uses: ["Oil", "Cured", "Pickled"] },
  { name: "Pomegranate", region: "Mediterranean", season: "Autumn", taste: "Sweet-tart", nutrition: "Antioxidants, Vitamin C", uses: ["Fresh", "Juice", "Seeds"] },
  { name: "Carob", region: "Mediterranean", season: "Autumn", taste: "Sweet, chocolate-like", nutrition: "Fiber, Calcium", uses: ["Powder", "Syrup", "Substitute"] },

  // Southeast Asia
  { name: "Durian", region: "Southeast Asia", season: "Summer", taste: "Complex, pungent", nutrition: "Healthy fats, Protein", uses: ["Fresh", "Candies", "Pastries"] },
  { name: "Mangosteen", region: "Southeast Asia", season: "Summer", taste: "Sweet-tart, floral", nutrition: "Xanthones, Vitamin C", uses: ["Fresh", "Juice"] },
  { name: "Rambutan", region: "Southeast Asia", season: "Summer", taste: "Sweet, grape-like", nutrition: "Vitamin C, Iron", uses: ["Fresh", "Canned"] },
  { name: "Dragon Fruit", region: "Southeast Asia", season: "Autumn", taste: "Mild, kiwi-like", nutrition: "Fiber, Magnesium", uses: ["Fresh", "Smoothies", "Bowls"] },

  // South America
  { name: "Açaí", region: "South America", season: "Summer", taste: "Earthy, berry", nutrition: "Antioxidants, Omega fatty acids", uses: ["Bowls", "Juice", "Powder"] },
  { name: "Camu Camu", region: "South America", season: "Summer", taste: "Extremely sour", nutrition: "Highest Vitamin C source", uses: ["Powder", "Supplements"] },
  { name: "Cupuaçu", region: "South America", season: "Summer", taste: "Tropical, pineapple-chocolate", nutrition: "Vitamins, Minerals", uses: ["Pulp", "Butter", "Desserts"] },
  { name: "Passion Fruit", region: "South America", season: "Year-round", taste: "Tart, aromatic", nutrition: "Vitamin A, Fiber", uses: ["Juice", "Desserts", "Sauces"] },

  // Africa
  { name: "Baobab", region: "Africa", season: "Dry season", taste: "Tart, citrus-vanilla", nutrition: "Vitamin C, Calcium", uses: ["Powder", "Drinks", "Porridge"] },
  { name: "Marula", region: "Africa", season: "Summer", taste: "Sweet, tropical", nutrition: "Vitamin C, Minerals", uses: ["Fresh", "Beer", "Liqueur", "Oil"] },
  { name: "Ackee", region: "Africa", season: "Year-round", taste: "Creamy, mild", nutrition: "Healthy fats", uses: ["Cooked as vegetable", "Saltfish"] },
  { name: "Monkey Orange", region: "Africa", season: "Autumn", taste: "Sweet, citrus", nutrition: "Vitamin C", uses: ["Fresh", "Long storage"] },

  // Oceania
  { name: "Finger Lime", region: "Oceania", season: "Summer", taste: "Lime-lemon-grapefruit", nutrition: "Vitamin C, Folate", uses: ["Garnish", "Marmalade", "Seasoning"] },
  { name: "Davidson Plum", region: "Oceania", season: "Summer", taste: "Intensely sour", nutrition: "Antioxidants", uses: ["Sauces", "Jams", "Drinks"] },
  { name: "Quandong", region: "Oceania", season: "Summer", taste: "Tart when raw", nutrition: "Vitamin C, Iron", uses: ["Pies", "Jams", "Preserves"] },
  { name: "Bush Tomato", region: "Oceania", season: "Autumn", taste: "Tangy, caramel-tomato", nutrition: "Selenium, Lycopene", uses: ["Spice", "Sauces", "Dried"] },

  // India
  { name: "Mango", region: "India", season: "Summer", taste: "Sweet, tropical", nutrition: "Vitamin A, C", uses: ["Fresh", "Pickles", "Desserts", "Dried"] },
  { name: "Jamun", region: "India", season: "Summer", taste: "Sweet-sour, astringent", nutrition: "Iron, Vitamin C", uses: ["Fresh", "Juice", "Vinegar"] },
  { name: "Jackfruit", region: "India", season: "Summer", taste: "Sweet (ripe), neutral (raw)", nutrition: "Protein, Fiber", uses: ["Vegetable", "Fruit", "Seeds"] },
  { name: "Amla", region: "India", season: "Winter", taste: "Extremely sour", nutrition: "Highest Vitamin C", uses: ["Fresh", "Pickles", "Murabba", "Powder"] },
  { name: "Bael", region: "India", season: "Summer", taste: "Sweet, aromatic", nutrition: "Fiber, Tannins", uses: ["Sherbet", "Religious", "Medicinal"] },
  { name: "Phalsa", region: "India", season: "Summer", taste: "Sweet-sour", nutrition: "Cooling properties", uses: ["Juice", "Sherbet"] },
  { name: "Sitaphal", region: "India", season: "Autumn", taste: "Sweet, creamy", nutrition: "Vitamin C, B6", uses: ["Fresh", "Desserts", "Ice cream"] },
  { name: "Ber", region: "India", season: "Winter", taste: "Sweet when ripe", nutrition: "Vitamin C", uses: ["Fresh", "Dried", "Pickles"] }
];

const regions = ["All", "Favorites", "North America", "Mediterranean", "Southeast Asia", "South America", "Africa", "Oceania", "India"];
const seasons = ["All", "Spring", "Summer", "Autumn", "Winter"];
const tastes = ["All", "Sweet", "Tart", "Tropical", "Mild", "Complex", "Earthy"];

const FruitFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedSeason, setSelectedSeason] = useState("All");
  const [selectedTaste, setSelectedTaste] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const { favorites, favoriteCount, toggleFavorite, isFavorite, clearAllFavorites } = useFavorites();

  const filteredFruits = useMemo(() => {
    return fruitsDatabase.filter((fruit) => {
      const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           fruit.uses.some(use => use.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesRegion = selectedRegion === "All" ||
                           (selectedRegion === "Favorites" && isFavorite(fruit.name)) ||
                           fruit.region === selectedRegion;
      const matchesSeason = selectedSeason === "All" || fruit.season === selectedSeason;
      const matchesTaste = selectedTaste === "All" || fruit.taste.toLowerCase().includes(selectedTaste.toLowerCase());

      return matchesSearch && matchesRegion && matchesSeason && matchesTaste;
    });
  }, [searchTerm, selectedRegion, selectedSeason, selectedTaste, isFavorite]);

  
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Fruit Explorer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Search and discover native fruits from around the world. Filter by region, season, or taste to find your perfect fruit.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search fruits by name or use..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="max-w-4xl mx-auto mb-8 p-6 bg-card rounded-2xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Map className="w-4 h-4" />
                  Region
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {regions.map((region) => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Clock className="w-4 h-4" />
                  Season
                </label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {seasons.map((season) => (
                    <option key={season} value={season}>{season}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Leaf className="w-4 h-4" />
                  Taste Profile
                </label>
                <select
                  value={selectedTaste}
                  onChange={(e) => setSelectedTaste(e.target.value)}
                  className="w-full p-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {tastes.map((taste) => (
                    <option key={taste} value={taste}>{taste}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Favorite Fruits */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              Your Favorites ({favoriteCount})
            </h3>
            {favoriteCount > 0 && (
              <button
                onClick={clearAllFavorites}
                className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            )}
          </div>
          {favoriteCount > 0 ? (
            <div className="flex flex-wrap gap-3">
              {favorites.map((fruit) => (
                <button
                  key={fruit}
                  onClick={() => setSearchTerm(fruit)}
                  className="px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium flex items-center gap-2 group"
                >
                  <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                  {fruit}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No favorite fruits yet. Click the heart icon on any fruit to add it to your favorites.</p>
          )}
        </div>

        {/* Results */}
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Found {filteredFruits.length} fruit{filteredFruits.length !== 1 ? 's' : ''}
            </p>
            {(searchTerm || selectedRegion !== "All" || selectedSeason !== "All" || selectedTaste !== "All") && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRegion("All");
                  setSelectedSeason("All");
                  setSelectedTaste("All");
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredFruits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFruits.map((fruit, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group relative"
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(fruit.name);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors z-10"
                  >
                    <Heart
                      className={`w-5 h-5 transition-colors ${
                        isFavorite(fruit.name)
                          ? "fill-red-500 text-red-500"
                          : "text-muted-foreground hover:text-red-500"
                      }`}
                    />
                  </button>
                  <div className="flex items-start justify-between mb-4 pr-12">
                    <h3 className="text-xl font-bold text-foreground">{fruit.name}</h3>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {fruit.region}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p><strong>Season:</strong> {fruit.season}</p>
                    <p><strong>Taste:</strong> {fruit.taste}</p>
                    <p><strong>Nutrition:</strong> {fruit.nutrition}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs font-medium mb-2">Uses:</p>
                    <div className="flex flex-wrap gap-2">
                      {fruit.uses.map((use, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 bg-secondary rounded-md"
                        >
                          {use}
                        </span>
                      ))}
                    </div>
                  </div>

                  {fruit.scientific && (
                    <p className="text-xs text-muted-foreground italic">
                      {fruit.scientific}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Leaf className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg text-muted-foreground">No fruits found matching your criteria.</p>
              <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FruitFinder;