import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { RESTAURANTS } from "@/lib/constants";

interface HeroSectionProps {
  onRestaurantChoice: (slug: string) => void;
  onMenuAccess: (slug: string) => void;
}

export default function HeroSection({ onRestaurantChoice, onMenuAccess }: HeroSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div 
      className="relative min-h-screen bg-cover bg-center bg-fixed pb-32 z-10"
      style={{
        backgroundImage: `linear-gradient(rgba(139, 38, 53, 0.7), rgba(44, 44, 44, 0.7)), url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center py-16 z-20">
        <div className="text-center text-white px-4 max-w-6xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-12 font-light px-2">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-4xl mx-auto">
            {Object.entries(RESTAURANTS).map(([key, restaurant]) => (
              <Card
                key={key}
                className="bg-white/10 backdrop-blur-sm border-none w-full max-w-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
                data-testid={`card-restaurant-choice-${key}`}
              >
                <CardContent className="p-6 sm:p-8">
                  <img
                    src={restaurant.heroImage}
                    alt={`${restaurant.name} interior`}
                    className="w-full h-40 sm:h-48 object-contain bg-black rounded-lg mb-4"
                  />
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-2 text-white">
                    {t.restaurants[key as keyof typeof t.restaurants].name}
                  </h3>
                  <p className="text-beige-light mb-4 sm:mb-6 text-sm sm:text-base">
                    {t.restaurants[key as keyof typeof t.restaurants].tagline}
                  </p>
                  <Button
                    onClick={() => onMenuAccess(restaurant.slug)}
                    className="bg-wine hover:bg-wine/90 text-white w-full min-h-[44px] text-base font-semibold"
                    data-testid={`button-menu-${key}`}
                  >
                    {t.hero.viewMenu}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
