import type { Restaurant } from "@shared/schema";
import { useLanguage } from "@/contexts/LanguageContext";

interface AboutSectionProps {
  restaurant: Restaurant;
}

export default function AboutSection({ restaurant }: AboutSectionProps) {
  const isCasaDaPeixe = restaurant.slug === "casa-da-peixe";
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={isCasaDaPeixe 
                ? "https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                : "https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              }
              alt={`${restaurant.name} cuisine`}
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="font-serif text-4xl font-bold text-wine mb-6">
              {restaurant.name}
            </h2>
            <p className="text-lg leading-relaxed mb-6 text-gray-700">
              {restaurant.description}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="text-center p-4 bg-beige rounded-lg">
                <div className="text-2xl font-bold text-wine">
                  {isCasaDaPeixe ? "25+" : "15+"}
                </div>
                <div className="text-sm text-charcoal">
                  {isCasaDaPeixe ? t.about.yearsExperience : t.about.awardWinningDishes}
                </div>
              </div>
              <div className="text-center p-4 bg-beige rounded-lg">
                <div className="text-2xl font-bold text-wine">
                  {isCasaDaPeixe ? "100+" : "50+"}
                </div>
                <div className="text-sm text-charcoal">
                  {isCasaDaPeixe ? t.about.traditionalRecipes : t.about.premiumWines}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
