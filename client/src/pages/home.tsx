import { useLocation } from "wouter";
import { MapPin, Clock, Star, Users, Wine, Utensils } from "lucide-react";
import { RESTAURANTS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/hero-section";

export default function Home() {
  const [, setLocation] = useLocation();

  const handleRestaurantChoice = (slug: string) => {
    setLocation(`/restaurant/${slug}`);
  };

  const handleMenuAccess = (slug: string) => {
    setLocation(`/restaurant/${slug}#menu`);
  };

  return (
    <div className="min-h-screen">
      <HeroSection 
        onRestaurantChoice={handleRestaurantChoice}
        onMenuAccess={handleMenuAccess}
      />
      
      {/* About Casa Da Peixe & Lapicanha Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-wine mb-6">
              About Casa Da Peixe & Lapicanha
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              For over two decades, we've been dedicated to bringing authentic Portuguese flavors to life through our two distinct culinary experiences. Each restaurant tells its own story of Portuguese heritage and passion.
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
                  <h3 className="font-serif text-2xl font-semibold text-wine mb-2">Traditional Heritage</h3>
                  <p className="text-gray-600">
                    Our recipes have been passed down through generations, preserving the authentic taste of Portugal's rich culinary history.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-olive text-white p-3 rounded-lg flex-shrink-0">
                  <Utensils className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-wine mb-2">Fresh Ingredients</h3>
                  <p className="text-gray-600">
                    We source the finest ingredients, many imported directly from Portugal, to ensure every dish captures the true essence of Portuguese cuisine.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-wine text-white p-3 rounded-lg flex-shrink-0">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-semibold text-wine mb-2">Family Experience</h3>
                  <p className="text-gray-600">
                    Every meal is crafted with love and served with the warmth of Portuguese hospitality, making you feel like family.
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
              Signature Dishes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most beloved creations, each telling a story of Portuguese culinary excellence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white shadow-lg hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
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
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                  alt="Portuguese desserts"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="font-serif text-xl font-semibold text-wine mb-2">Pastéis de Nata</h3>
                <p className="text-gray-600 text-sm">Iconic Portuguese custard tarts with crispy pastry</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-lg hover:-translate-y-2 transition-all duration-300">
              <CardContent className="p-6">
                <img
                  src="https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
                  alt="Portuguese wine"
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
              Why Choose Casa Da Peixe & Lapicanha
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-wine text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-wine mb-4">Award-Winning Cuisine</h3>
              <p className="text-gray-600">
                Recognized by culinary experts and food critics for our authentic Portuguese dishes and exceptional service quality.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-olive text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-wine mb-4">25+ Years Experience</h3>
              <p className="text-gray-600">
                Over two decades of perfecting our craft, building relationships with customers, and preserving Portuguese culinary traditions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-wine text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-wine mb-4">Two Unique Locations</h3>
              <p className="text-gray-600">
                Experience different facets of Portuguese cuisine - fresh seafood at Casa Da Peixe and premium grilled meats at Lapicanha.
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
              What Our Guests Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our valued customers about their dining experiences
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
                  "Both restaurants offer incredible food, but each has its own personality. Casa Da Peixe has amazing seafood, while Lapicanha serves the best grilled meats."
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

      {/* Call to Action Section */}
      <section className="py-20 bg-wine text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Portugal?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us for an unforgettable culinary journey through the flavors of Portugal. Choose your dining adventure.
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Button
              onClick={() => handleRestaurantChoice('casa-da-peixe')}
              className="bg-white text-wine hover:bg-beige-light px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              data-testid="cta-casa-da-peixe"
            >
              Experience Casa Da Peixe
            </Button>
            <Button
              onClick={() => handleRestaurantChoice('lapicanha')}
              className="bg-beige text-wine hover:bg-beige-light px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              data-testid="cta-lapicanha"
            >
              Discover Lapicanha
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl font-bold text-wine mb-4">Casa Da Peixe & Lapicanha</h3>
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
              <h4 className="font-semibold text-lg mb-4">Casa Da Peixe</h4>
              <p className="text-gray-300 text-sm">
                Rua da Ribeira, 89<br />
                Porto, Portugal
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Lapicanha</h4>
              <p className="text-gray-300 text-sm">
                Avenida da República, 245<br />
                Lisboa, Portugal
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Casa Da Peixe & Lapicanha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
