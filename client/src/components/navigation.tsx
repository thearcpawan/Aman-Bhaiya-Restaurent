import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESTAURANTS } from "@/lib/constants";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<string | null>(null);

  useEffect(() => {
    const match = location.match(/\/restaurant\/(\w+)/);
    if (match) {
      setCurrentRestaurant(match[1]);
    } else {
      setCurrentRestaurant(null);
    }
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" data-testid="link-home">
              <h1 className="font-serif text-2xl font-bold text-wine cursor-pointer hover:text-wine-light transition-colors">
                Casa Da Peixe & Lapicanha
              </h1>
            </Link>
          </div>
          
          {/* Desktop Restaurant Switcher */}
          <div className="hidden md:flex items-center space-x-1">
            {Object.entries(RESTAURANTS).map(([key, restaurant]) => (
              <Link key={key} href={`/restaurant/${restaurant.slug}`} data-testid={`link-restaurant-${key}`}>
                <Button
                  variant={currentRestaurant === restaurant.slug ? "default" : "ghost"}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentRestaurant === restaurant.slug
                      ? "bg-beige text-wine"
                      : "text-charcoal hover:text-wine hover:bg-beige"
                  }`}
                  data-testid={`button-nav-${key}`}
                >
                  {restaurant.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-charcoal hover:text-wine p-2"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {Object.entries(RESTAURANTS).map(([key, restaurant]) => (
              <Link key={key} href={`/restaurant/${restaurant.slug}`} data-testid={`link-mobile-restaurant-${key}`}>
                <Button
                  variant="ghost"
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                    currentRestaurant === restaurant.slug
                      ? "bg-beige text-wine"
                      : "text-charcoal hover:text-wine hover:bg-beige"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`button-mobile-nav-${key}`}
                >
                  {restaurant.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
