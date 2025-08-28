import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PhotoUpload from "@/components/photo-upload";
import { useLanguage } from "@/contexts/LanguageContext";
import { MENU_CATEGORIES } from "@/lib/constants";
import type { Restaurant, MenuItem } from "@shared/schema";
import starterImageMeat from "@assets/f2_1756236810700.jpg";
import starterImageSeafood from "@assets/a5_1756237863463.jpg";
import casaDaPeixeStarterImage from "@assets/f7_1756382522658.jpg";
import casaDaPeixeMainsImage from "@assets/a7_1756382620250.jpg";

interface MenuSectionProps {
  restaurant: Restaurant;
}

const categoryImages = {
  starters: (restaurant: Restaurant) => restaurant.slug === "casa-da-peixe" 
    ? casaDaPeixeStarterImage
    : starterImageMeat,
  mains: (restaurant: Restaurant) => restaurant.slug === "casa-da-peixe" 
    ? casaDaPeixeMainsImage
    : "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  desserts: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  drinks: "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
};

export default function MenuSection({ restaurant }: MenuSectionProps) {
  const { t } = useLanguage();
  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/restaurants", restaurant.id, "menu"],
  });

  const getItemsByCategory = (category: string) => {
    return menuItems?.filter(item => item.category === category) || [];
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="h-12 w-64 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MENU_CATEGORIES.map((category) => (
              <Skeleton key={category.id} className="h-96 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-beige-light">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-center text-wine mb-8 sm:mb-12">
          {t.menu.title[restaurant.slug as keyof typeof t.menu.title]}
        </h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {MENU_CATEGORIES.map((category) => {
            const categoryItems = getItemsByCategory(category.id);
            const imageValue = categoryImages[category.id as keyof typeof categoryImages];
            const imageUrl = typeof imageValue === 'function' 
              ? imageValue(restaurant)
              : imageValue;
            
            return (
              <Card key={category.id} className="bg-white shadow-lg hover:-translate-y-1 transition-transform">
                <CardContent className="p-4 sm:p-6">
                  <img
                    src={imageUrl}
                    alt={`${category.name} dishes`}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg mb-3 sm:mb-4"
                  />
                  <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-semibold text-wine mb-3 sm:mb-4">
                    {t.menu.categories[category.id as keyof typeof t.menu.categories]}
                  </h3>
                  
                  <div className="space-y-2 text-sm mb-4">
                    {categoryItems.length > 0 ? (
                      categoryItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-start">
                          <div className="flex-1">
                            <span className="font-medium">{item.name}</span>
                            {item.description && (
                              <p className="text-gray-600 text-xs mt-1">{item.description}</p>
                            )}
                          </div>
                          <span className="font-medium text-wine ml-2">{item.price}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">{t.menu.noItems}</p>
                    )}
                  </div>
                  
                  <PhotoUpload
                    type="menu"
                    categoryId={category.id}
                    restaurantId={restaurant.id}
                    data-testid={`photo-upload-${category.id}`}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
