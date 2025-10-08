import { MapPin, Leaf, Calendar, Globe } from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Region-Specific Fruits",
    description: "Discover what grows naturally in your specific region, from North American forests to Pacific Island paradises, tailored to your exact location.",
  },
  {
    icon: Calendar,
    title: "Seasonal Harvest Guide",
    description: "Know exactly what's in season right now. Our seasonal calendar shows peak harvest times for hundreds of native fruits worldwide.",
  },
  {
    icon: Leaf,
    title: "Nutritional Insights",
    description: "Learn about the exceptional health benefits of native fruits - from Vitamin C-rich camu camu to antioxidant-packed baobab and durian.",
  },
  {
    icon: Globe,
    title: "Global Biodiversity",
    description: "Explore over 3,000 native fruit species across six continents, from Amazon rainforests to African savannas and Australian bushlands.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Discover Nature's Seasonal Bounty
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore the incredible diversity of native fruits growing naturally in your region.
            Connect with seasonal eating and discover the nutritional powerhouses that have sustained communities for millennia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center group-hover:shadow-lg transition-shadow duration-300">
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;