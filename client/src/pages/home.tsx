import { useLocation } from "wouter";
import { RESTAURANTS } from "@/lib/constants";
import HeroSection from "@/components/hero-section";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleRestaurantChoice = (slug: string) => {
    setLocation(`/restaurant/${slug}`);
  };

  return (
    <div className="min-h-screen">
      <HeroSection onRestaurantChoice={handleRestaurantChoice} />
      
      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-wine mb-4">Casa dos Sabores</h3>
              <p className="text-gray-300 mb-4">
                Bringing the authentic taste of Portugal to your table with two unique dining experiences.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-wine transition-colors" data-testid="link-facebook">
                  Facebook
                </a>
                <a href="#" className="text-gray-300 hover:text-wine transition-colors" data-testid="link-instagram">
                  Instagram
                </a>
                <a href="#" className="text-gray-300 hover:text-wine transition-colors" data-testid="link-tripadvisor">
                  TripAdvisor
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Restaurante Porto</h4>
              <p className="text-gray-300 text-sm">
                Rua das Flores, 123<br />
                Porto, Portugal
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Restaurante Lisboa</h4>
              <p className="text-gray-300 text-sm">
                Avenida da Liberdade, 456<br />
                Lisboa, Portugal
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Casa dos Sabores. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
