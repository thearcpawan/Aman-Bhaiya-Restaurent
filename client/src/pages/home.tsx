import { useLocation } from "wouter";
import { MapPin, Clock, Star, Users, Wine, Utensils } from "lucide-react";
import { RESTAURANTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import pastriesImage from "@assets/assortment-pieces-cake_114579-85732_1756384661320.avif";

export default function Home() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  
  // Set page title and meta description
  useDocumentTitle('home');

  const handleRestaurantChoice = (slug: string) => {
    setLocation(`/restaurant/${slug}`);
  };

  const handleMenuAccess = (slug: string) => {
    setLocation(`/restaurant/${slug}#menu`);
  };

  return (
    <div className="min-h-screen pt-20">
      <HeroSection 
        onRestaurantChoice={handleRestaurantChoice}
        onMenuAccess={handleMenuAccess}
      />
      
      {/* About Original's Casa de Peixe & Lapicanha Section */}
      <section className="pt-40 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-wine mb-6">
              {t.home.aboutTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.home.aboutSubtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Portuguese cuisine preparation"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-wine text-white p-3 rounded-lg flex-shrink-0">
                  <Wine className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-wine mb-2">{t.home.traditionalHeritage}</h3>
                  <p className="text-gray-600">
                    {t.home.traditionalHeritageDesc}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-olive text-white p-3 rounded-lg flex-shrink-0">
                  <Utensils className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-wine mb-2">{t.home.freshIngredients}</h3>
                  <p className="text-gray-600">
                    {t.home.freshIngredientsDesc}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-wine text-white p-3 rounded-lg flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-wine mb-2">{t.home.familyExperience}</h3>
                  <p className="text-gray-600">
                    {t.home.familyExperienceDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-20 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-wine mb-6">
              {t.home.signatureDishes}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.home.signatureDishesDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white shadow-lg hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1604152135912-04a022e23696?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                  alt="Bacalhau dishes"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-serif text-xl font-semibold text-wine mb-2">Bacalhau Especial</h3>
                <p className="text-gray-600 text-sm">Traditional codfish prepared with our secret family recipe</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1580554530778-ca36943938b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                  alt="Portuguese seafood"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-serif text-xl font-semibold text-wine mb-2">Cataplana de Marisco</h3>
                <p className="text-gray-600 text-sm">Fresh seafood stew cooked in traditional copper cataplana</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-6">
                <img
                  src={pastriesImage}
                  alt="Pastéis de Nata - Portuguese custard tarts"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-serif text-xl font-semibold text-wine mb-2">Pastéis de Nata</h3>
                <p className="text-gray-600 text-sm">Iconic Portuguese custard tarts with crispy pastry</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                  alt="Vinho Verde - Portuguese green wine"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-serif text-xl font-semibold text-wine mb-2">Vinho Verde</h3>
                <p className="text-gray-600 text-sm">Curated selection of Portugal's finest green wines</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes Us Special Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-wine mb-6">
              {t.home.whyChooseUs}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-wine text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-wine mb-4">{t.home.awardWinning}</h3>
              <p className="text-gray-600">
                {t.home.awardWinningDesc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-olive text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-wine mb-4">{t.home.experience5Years}</h3>
              <p className="text-gray-600">
                {t.home.experience5YearsDesc}
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-wine text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-wine mb-4">{t.home.twoLocations}</h3>
              <p className="text-gray-600">
                {t.home.twoLocationsDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-wine mb-6">
              {t.home.whatGuestsSay}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.home.whatGuestsSayDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The most authentic Portuguese dining experience outside of Portugal. The bacalhau was perfection, and the atmosphere transported me back to Lisbon."
                </p>
                <div className="font-semibold text-wine">Maria Santos</div>
                <div className="text-sm text-gray-500">Food Critic</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "Both restaurants offer incredible food, but each has its own personality. Original's Casa de Peixe has amazing seafood, while Lapicanha serves the best grilled meats."
                </p>
                <div className="font-semibold text-wine">João Silva</div>
                <div className="text-sm text-gray-500">Regular Customer</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "The wine selection is extraordinary, and the staff's knowledge about Portuguese wines enhanced our entire evening. Simply magnificent!"
                </p>
                <div className="font-semibold text-wine">Elena Rodriguez</div>
                <div className="text-sm text-gray-500">Wine Enthusiast</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-wine mb-4">Original's Casa de Peixe & Lapicanha</h3>
              <p className="text-gray-300 mb-4">
                {t.home.footerDesc}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Original's Casa de Peixe</h4>
              <p className="text-gray-300 text-sm">
                Largo José Afonso 64, 2900-633<br />
                Setúbal, Portugal
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Lapicanha</h4>
              <p className="text-gray-300 text-sm">
                Rua José Afonso n 69<br />
                Setúbal, Portugal
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Original's Casa de Peixe & Lapicanha. {t.home.allRightsReserved}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
