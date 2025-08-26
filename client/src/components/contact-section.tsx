import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram } from "lucide-react";
import GoogleMaps from "@/components/google-maps";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Restaurant } from "@shared/schema";

interface ContactSectionProps {
  restaurant: Restaurant;
}

export default function ContactSection({ restaurant }: ContactSectionProps) {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-4xl font-bold text-center text-wine mb-12">
          {restaurant.slug === "casa-da-peixe" ? t.contact.contactUs : t.contact.visitUs}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-wine text-white p-3 rounded-lg flex-shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t.contact.address}</h3>
                  <div className="text-gray-600 whitespace-pre-line">
                    {restaurant.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-wine text-white p-3 rounded-lg flex-shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{t.contact.phone}</h3>
                  <a 
                    href={`tel:${restaurant.phone}`}
                    className="text-gray-600 hover:text-wine transition-colors"
                    data-testid="link-phone"
                  >
                    {restaurant.phone}
                  </a>
                </div>
              </div>

              {restaurant.slug === "casa-da-peixe" && (
                <>
                  <div className="flex items-start space-x-4">
                    <div className="bg-wine text-white p-3 rounded-lg flex-shrink-0">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t.contact.whatsapp}</h3>
                      <a 
                        href="https://wa.me/351926091468"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-wine transition-colors"
                        data-testid="link-whatsapp"
                      >
                        +351 926 091 468
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-wine text-white p-3 rounded-lg flex-shrink-0">
                      <Instagram className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{t.contact.instagram}</h3>
                      <a 
                        href="https://www.instagram.com/casadepeixe3/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-wine transition-colors"
                        data-testid="link-instagram"
                      >
                        @casadepeixe3
                      </a>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <GoogleMaps restaurant={restaurant} />
        </div>
      </div>
    </section>
  );
}
