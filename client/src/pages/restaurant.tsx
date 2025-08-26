import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import AboutSection from "@/components/about-section";
import MenuSection from "@/components/menu-section";
import ReservationsSection from "@/components/reservations-section";
import GallerySection from "@/components/gallery-section";
import ContactSection from "@/components/contact-section";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Restaurant } from "@shared/schema";

type Section = "about" | "menu" | "reservations" | "gallery" | "contact";

export default function Restaurant() {
  const { slug } = useParams<{ slug: string }>();
  const [activeSection, setActiveSection] = useState<Section>("about");
  const { t } = useLanguage();

  // Handle hash navigation to specific sections
  useEffect(() => {
    const hash = window.location.hash.substring(1); // Remove the #
    if (hash && ["about", "menu", "reservations", "gallery", "contact"].includes(hash)) {
      setActiveSection(hash as Section);
    }
  }, []);

  const { data: restaurant, isLoading, error } = useQuery<Restaurant>({
    queryKey: ["/api/restaurants", slug],
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Skeleton className="h-12 w-96 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-6 w-3/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-wine mb-4">{t.restaurant.notFound}</h1>
          <p className="text-gray-600">{t.restaurant.notFoundDesc}</p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "about" as Section, name: t.restaurant.sections.about },
    { id: "menu" as Section, name: t.restaurant.sections.menu },
    { id: "reservations" as Section, name: t.restaurant.sections.reservations },
    { id: "gallery" as Section, name: t.restaurant.sections.gallery },
    { id: "contact" as Section, name: t.restaurant.sections.contact },
  ];

  const renderSection = () => {
    // At this point, restaurant is guaranteed to exist due to early returns above
    const restaurantData = restaurant!;
    
    switch (activeSection) {
      case "about":
        return <AboutSection restaurant={restaurantData} />;
      case "menu":
        return <MenuSection restaurant={restaurantData} />;
      case "reservations":
        return <ReservationsSection restaurant={restaurantData} />;
      case "gallery":
        return <GallerySection restaurant={restaurantData} />;
      case "contact":
        return <ContactSection restaurant={restaurantData} />;
      default:
        return <AboutSection restaurant={restaurantData} />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Sub Navigation */}
      <div className="bg-beige-light py-4 mt-20 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6">
            {sections.map((section) => (
              <Button
                key={section.id}
                variant="ghost"
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? "text-wine bg-white shadow-sm"
                    : "text-charcoal hover:text-wine hover:bg-white"
                }`}
                data-testid={`button-section-${section.id}`}
              >
                {section.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Content */}
      <div className="pb-16">
        {renderSection()}
      </div>
    </div>
  );
}
