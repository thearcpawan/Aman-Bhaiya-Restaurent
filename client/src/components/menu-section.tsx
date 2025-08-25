import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import PhotoUpload from "@/components/photo-upload";
import { MENU_CATEGORIES } from "@/lib/constants";
import type { Restaurant, MenuItem } from "@shared/schema";

interface MenuSectionProps {
  restaurant: Restaurant;
}

const categoryImages = {
  starters: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  mains: (restaurant: Restaurant) => restaurant.slug === "casa-da-peixe" 
    ? "https://images.unsplash.com/photo-1485963631004-f2f00b1d6606?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    : "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  desserts: (restaurant: Restaurant) => restaurant.slug === "casa-da-peixe" 
    ? "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    : "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250",
  drinks: (restaurant: Restaurant) => restaurant.slug === "casa-da-peixe" 
    ? "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
    : "https://images.unsplash.com/photo-1474722883778-792e7990302f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
};

export default function MenuSection({ restaurant }: MenuSectionProps) {
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
        <h2 className="font-serif text-4xl font-bold text-center text-wine mb-12">
          {restaurant.slug === "casa-da-peixe" ? "Fresh Seafood Menu" : "Premium Meat Menu"}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MENU_CATEGORIES.map((category) => {
            const categoryItems = getItemsByCategory(category.id);
            const imageValue = categoryImages[category.id as keyof typeof categoryImages];
            const imageUrl = typeof imageValue === 'function' 
              ? imageValue(restaurant)
              : imageValue;
            
            return (
              <Card key={category.id} className="bg-white shadow-lg hover:-translate-y-1 transition-transform">
                <CardContent className="p-6">
                  <img
                    src={imageUrl}
                    alt={`${category.name} dishes`}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-serif text-2xl font-semibold text-wine mb-4">
                    {category.name}
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
                      <p className="text-gray-500 italic">No items added yet</p>
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
