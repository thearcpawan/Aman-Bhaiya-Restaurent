import { Card, CardContent } from "@/components/ui/card";
import { RESTAURANTS } from "@/lib/constants";

interface HeroSectionProps {
  onRestaurantChoice: (slug: string) => void;
}

export default function HeroSection({ onRestaurantChoice }: HeroSectionProps) {
  return (
    <div 
      className="relative h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(139, 38, 53, 0.7), rgba(44, 44, 44, 0.7)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">Casa dos Sabores</h1>
          <p className="text-xl md:text-2xl mb-12 font-light">
            Authentic Portuguese Cuisine, Two Unique Experiences
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            {Object.entries(RESTAURANTS).map(([key, restaurant]) => (
              <Card
                key={key}
                className="bg-white/10 backdrop-blur-sm border-none max-w-sm cursor-pointer hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                onClick={() => onRestaurantChoice(restaurant.slug)}
                data-testid={`card-restaurant-choice-${key}`}
              >
                <CardContent className="p-8">
                  <img
                    src={restaurant.heroImage}
                    alt={`${restaurant.name} interior`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-serif text-2xl font-semibold mb-2 text-white">
                    {restaurant.name}
                  </h3>
                  <p className="text-beige-light">
                    {restaurant.tagline}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
