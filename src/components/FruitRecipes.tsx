import { useState } from "react";
import { ChefHat, Clock, Users, Star, BookOpen } from "lucide-react";

interface Recipe {
  id: number;
  name: string;
  fruit: string;
  region: string;
  season: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time: string;
  servings: number;
  rating: number;
  description: string;
  ingredients: string[];
  instructions: string[];
  tips?: string;
}

const recipes: Recipe[] = [
  {
    id: 1,
    name: "Aam Panna (Raw Mango Drink)",
    fruit: "Mango",
    region: "India",
    season: "Summer",
    difficulty: "Easy",
    time: "20 mins",
    servings: 4,
    rating: 4.8,
    description: "Refreshing summer drink made from raw mangoes, perfect for beating the heat",
    ingredients: [
      "2 raw mangoes",
      "1/4 cup mint leaves",
      "1/2 cup sugar (adjust to taste)",
      "1 tsp roasted cumin powder",
      "1/4 tsp black salt",
      "4 cups water",
      "Ice cubes"
    ],
    instructions: [
      "Boil mangoes in water until soft (about 15 mins)",
      "Let them cool, then peel and extract pulp",
      "Blend pulp with mint leaves, sugar, cumin powder, and black salt",
      "Add 4 cups water and blend again",
      "Strain if desired, serve over ice"
    ],
    tips: "Adjust sugar based on mango tartness. Can be stored in refrigerator for 2-3 days"
  },
  {
    id: 2,
    name: "Açaí Bowl",
    fruit: "Açaí",
    region: "South America",
    season: "Summer",
    difficulty: "Easy",
    time: "10 mins",
    servings: 2,
    rating: 4.9,
    description: "Nutritious breakfast bowl with antioxidant-rich açaí",
    ingredients: [
      "100g frozen açaí pulp",
      "1 frozen banana",
      "1/2 cup mixed berries",
      "1/4 cup almond milk",
      "Toppings: granola, fresh fruits, honey, chia seeds"
    ],
    instructions: [
      "Blend açaí, banana, mixed berries, and almond milk until smooth",
      "Pour into a bowl",
      "Arrange toppings artfully",
      "Serve immediately while cold"
    ],
    tips: "Use frozen fruits for thicker consistency. Add more liquid if too thick"
  },
  {
    id: 3,
    name: "Durian Pancakes",
    fruit: "Durian",
    region: "Southeast Asia",
    season: "Summer",
    difficulty: "Medium",
    time: "30 mins",
    servings: 4,
    rating: 4.6,
    description: "Fluffy pancakes with aromatic durian filling",
    ingredients: [
      "2 cups all-purpose flour",
      "2 tbsp sugar",
      "1 tsp baking powder",
      "1/2 tsp salt",
      "2 eggs",
      "1.5 cups milk",
      "2 tbsp melted butter",
      "200g durian flesh, mashed"
    ],
    instructions: [
      "Mix dry ingredients in a bowl",
      "Whisk eggs, milk, and butter in another bowl",
      "Combine wet and dry ingredients, mix until just combined",
      "Cook pancakes on griddle until bubbles form",
      "Spread durian on one pancake, top with another",
      "Serve warm with maple syrup if desired"
    ]
  },
  {
    id: 4,
    name: "Baobab Energy Balls",
    fruit: "Baobab",
    region: "Africa",
    season: "Dry Season",
    difficulty: "Easy",
    time: "15 mins",
    servings: 12,
    rating: 4.7,
    description: "No-bake energy balls packed with Vitamin C",
    ingredients: [
      "1 cup dates, pitted",
      "1 cup almonds",
      "2 tbsp baobab powder",
      "2 tbsp coconut flakes",
      "1 tbsp chia seeds",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Pulse almonds in food processor until coarse",
      "Add dates and process until sticky",
      "Add baobab powder, coconut, chia seeds, and vanilla",
      "Process until well combined",
      "Roll into 12 small balls",
      "Refrigerate for 30 mins before serving"
    ],
    tips: "Store in airtight container for up to a week. Can add cocoa powder for chocolate version"
  },
  {
    id: 5,
    name: "Finger Lime Ceviche",
    fruit: "Finger Lime",
    region: "Oceania",
    season: "Summer",
    difficulty: "Medium",
    time: "25 mins + chilling",
    servings: 4,
    rating: 4.8,
    description: "Fresh seafood ceviche with citrusy finger lime pearls",
    ingredients: [
      "500g fresh white fish fillet, diced",
      "3-4 finger limes",
      "1 red onion, finely diced",
      "1 chili, minced",
      "1/4 cup cilantro, chopped",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "Tortilla chips for serving"
    ],
    instructions: [
      "Mix fish with lime juice from 2 regular limes",
      "Refrigerate for 20 mins until fish is opaque",
      "Squeeze finger lime pearls over the fish",
      "Add onion, chili, cilantro, and olive oil",
      "Season with salt and pepper",
      "Serve immediately with tortilla chips"
    ],
    tips: "Use very fresh fish for best results. Don't over-marinate or fish will become tough"
  },
  {
    id: 6,
    name: "Amla Murabba (Indian Gooseberry Preserve)",
    fruit: "Amla",
    region: "India",
    season: "Winter",
    difficulty: "Hard",
    time: "2 hours",
    servings: 20,
    rating: 4.9,
    description: "Traditional sweet preserve of amla in sugar syrup",
    ingredients: [
      "500g amla (Indian gooseberry)",
      "500g sugar",
      "2 cups water",
      "1 tsp cardamom powder",
      "1/4 tsp saffron strands",
      "1 tbsp lemon juice"
    ],
    instructions: [
      "Wash and prick amla with fork all over",
      "Boil in water for 5 mins, drain",
      "Prepare sugar syrup with water and sugar",
      "Add amla to syrup, cook until soft (about 45 mins)",
      "Add cardamom, saffron, and lemon juice",
      "Cool and store in sterilized jars"
    ],
    tips: "Amla must be fully tender. Syrup should be of one-string consistency. Store in cool, dark place"
  }
];

const FruitRecipes = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [filterByFruit, setFilterByFruit] = useState("All");
  const [filterByRegion, setFilterByRegion] = useState("All");

  const fruits = ["All", ...Array.from(new Set(recipes.map(r => r.fruit)))];
  const regions = ["All", ...Array.from(new Set(recipes.map(r => r.region)))];

  const filteredRecipes = recipes.filter(recipe => {
    const fruitMatch = filterByFruit === "All" || recipe.fruit === filterByFruit;
    const regionMatch = filterByRegion === "All" || recipe.region === filterByRegion;
    return fruitMatch && regionMatch;
  });

  return (
    <section className="py-24 bg-muted">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Native Fruit Recipes
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover traditional and modern recipes featuring native fruits from around the world.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Fruit:</label>
            <select
              value={filterByFruit}
              onChange={(e) => setFilterByFruit(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {fruits.map((fruit) => (
                <option key={fruit} value={fruit}>{fruit}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Region:</label>
            <select
              value={filterByRegion}
              onChange={(e) => setFilterByRegion(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {regions.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-card rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <ChefHat className="w-16 h-16 text-primary/50" />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold">{recipe.name}</h3>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{recipe.rating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                    {recipe.fruit}
                  </span>
                  <span>{recipe.region}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {recipe.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {recipe.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {recipe.servings}
                    </span>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                    recipe.difficulty === "Easy" ? "bg-green-100 text-green-700" :
                    recipe.difficulty === "Medium" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
            <div className="bg-background rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedRecipe.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-md">
                        {selectedRecipe.fruit}
                      </span>
                      <span>{selectedRecipe.region}</span>
                      <span>{selectedRecipe.season}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="text-2xl text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center gap-4 text-sm">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-medium">Time:</span>
                    <span>{selectedRecipe.time}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-medium">Servings:</span>
                    <span>{selectedRecipe.servings}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="font-medium">Difficulty:</span>
                    <span>{selectedRecipe.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <Star className="w-5 h-5 text-primary" />
                    <span className="font-medium">Rating:</span>
                    <span>{selectedRecipe.rating}/5.0</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{selectedRecipe.description}</p>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">Ingredients:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="font-bold mb-3">Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>

                {selectedRecipe.tips && (
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-bold mb-2 text-primary">Tips:</h4>
                    <p className="text-sm text-muted-foreground">{selectedRecipe.tips}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FruitRecipes;