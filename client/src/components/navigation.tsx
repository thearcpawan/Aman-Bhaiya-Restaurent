import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { RESTAURANTS } from "@/lib/constants";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<string | null>(null);
  const { language, setLanguage, t } = useLanguage();

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
        <div className="flex justify-between items-center h-24 sm:h-28">
          <div className="flex items-center flex-1 min-w-0 pr-2">
            <Link href="/" data-testid="link-home">
              <h1 className="font-serif text-xs sm:text-xl md:text-2xl font-bold text-wine cursor-pointer hover:text-wine-light transition-colors leading-tight">
                <span className="hidden sm:inline">{t.nav.title}</span>
                <span className="sm:hidden whitespace-pre-line text-center leading-tight">{t.nav.titleMobile}</span>
              </h1>
            </Link>
          </div>
          
          {/* Desktop Restaurant Switcher & Language Switcher */}
          <div className="hidden md:flex items-center space-x-2">
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
                  {t.restaurants[key as keyof typeof t.restaurants].name}
                </Button>
              </Link>
            ))}
            
            {/* Language Switcher */}
            <div className="flex items-center space-x-1 ml-4 border-l border-gray-300 pl-4">
              <Globe className="h-4 w-4 text-gray-600" />
              <Button
                variant={language === 'pt' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('pt')}
                className="px-2 py-1 text-sm"
                data-testid="button-lang-pt"
              >
                PT
              </Button>
              <Button
                variant={language === 'es' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('es')}
                className="px-2 py-1 text-sm"
                data-testid="button-lang-es"
              >
                ES
              </Button>
              <Button
                variant={language === 'nl' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('nl')}
                className="px-2 py-1 text-sm"
                data-testid="button-lang-nl"
              >
                NL
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="px-2 py-1 text-sm"
                data-testid="button-lang-en"
              >
                EN
              </Button>
            </div>
          </div>

          {/* Mobile menu button & Language switcher */}
          <div className="md:hidden flex items-center space-x-1 flex-shrink-0">
            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-0.5">
              <Button
                variant={language === 'pt' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('pt')}
                className="px-1.5 py-1 text-xs h-7 min-w-0"
                data-testid="button-mobile-lang-pt"
              >
                PT
              </Button>
              <Button
                variant={language === 'es' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('es')}
                className="px-1.5 py-1 text-xs h-7 min-w-0"
                data-testid="button-mobile-lang-es"
              >
                ES
              </Button>
              <Button
                variant={language === 'nl' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('nl')}
                className="px-1.5 py-1 text-xs h-7 min-w-0"
                data-testid="button-mobile-lang-nl"
              >
                NL
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setLanguage('en')}
                className="px-1.5 py-1 text-xs h-7 min-w-0"
                data-testid="button-mobile-lang-en"
              >
                EN
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-charcoal hover:text-wine p-3 min-h-[44px] min-w-[44px]"
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </Button>
          </div>
        </div>
        
        {/* Restaurant Name Banner */}
        {currentRestaurant && (
          <div className="bg-wine text-white py-3">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold">
                {currentRestaurant === 'casa-da-peixe' 
                  ? t.restaurants['casa-da-peixe'].name 
                  : t.restaurants.lapicanha.name}
              </h2>
            </div>
          </div>
        )}
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
                  {t.restaurants[key as keyof typeof t.restaurants].name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
