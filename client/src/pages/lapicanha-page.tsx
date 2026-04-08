import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import AboutSection from "@/components/about-section";
import MenuSection from "@/components/menu-section";
import ReservationsSection from "@/components/reservations-section";
import GallerySection from "@/components/gallery-section";
import ContactSection from "@/components/contact-section";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { Restaurant } from "@shared/schema";
import { lapicanhaMenuItems } from "@/data/menu-data";

type Section = "about" | "menu" | "reservations" | "gallery" | "contact";

const restaurant: Restaurant = {
  id: "lapicanha-id",
  name: "Lapicanha",
  slug: "lapicanha",
  description:
    "Premium grilled meats and traditional Portuguese flavors in a warm, rustic atmosphere. We specialize in perfectly prepared picanha and other prime cuts, paired with authentic Portuguese sides and wines.",
  address: "Rua José Afonso n 69\nSetúbal, Portugal",
  phone: "+351 915 214 437",
  email: "reservas@lapicanha.pt",
  hours:
    "Monday - Thursday: 6:00 PM - 11:00 PM\nFriday - Saturday: 6:00 PM - 12:00 AM\nSunday: 6:00 PM - 10:00 PM",
  createdAt: new Date("2024-01-01"),
};

export default function LapicanhaPage() {
  const [activeSection, setActiveSection] = useState<Section>("about");
  const { t } = useLanguage();
  useDocumentTitle("lapicanha", "lapicanha");

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && ["about", "menu", "reservations", "gallery", "contact"].includes(hash)) {
      setActiveSection(hash as Section);
    }
  }, []);

  const sections = [
    { id: "about" as Section, name: t.restaurant.sections.about },
    { id: "menu" as Section, name: t.restaurant.sections.menu },
    { id: "reservations" as Section, name: t.restaurant.sections.reservations },
    { id: "gallery" as Section, name: t.restaurant.sections.gallery },
    { id: "contact" as Section, name: t.restaurant.sections.contact },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "about": return <AboutSection restaurant={restaurant} />;
      case "menu": return <MenuSection restaurant={restaurant} staticMenuItems={lapicanhaMenuItems as any} />;
      case "reservations": return <ReservationsSection restaurant={restaurant} />;
      case "gallery": return <GallerySection restaurant={restaurant} />;
      case "contact": return <ContactSection restaurant={restaurant} />;
      default: return <AboutSection restaurant={restaurant} />;
    }
  };

  return (
    <div className="min-h-screen">
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
              >
                {section.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="pb-16">{renderSection()}</div>
    </div>
  );
}
