import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PhotoUpload from "@/components/photo-upload";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Restaurant, GalleryPhoto } from "@shared/schema";

// Import gallery images
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";
import gallery10 from "@/assets/gallery-10.jpg";
import gallery11 from "@/assets/gallery-11.jpg";

interface GallerySectionProps {
  restaurant: Restaurant;
}

const defaultImages = {
  "casa-da-peixe": [
    gallery1,    // Fresh seafood display and restaurant atmosphere
    gallery2,    // Beautiful seafood platter with coastal ambiance
    gallery3,    // Traditional Portuguese fish dishes
    gallery4,    // Grilled seafood with seaside dining
    gallery5,    // Fresh catch presentation with Portuguese wine
    gallery6,    // Coastal restaurant interior and seafood specialties
    gallery7,    // Premium seafood dishes with Portuguese wines
    gallery8,    // Traditional Portuguese coastal cuisine
    gallery9,    // Seafood platters with authentic Portuguese atmosphere
    gallery10,   // Fresh fish preparation and coastal dining
    gallery11    // Portuguese seafood tradition and hospitality
  ],
  lapicanha: [
    gallery1,    // Red cocktails and cozy bar atmosphere
    gallery2,    // Beautiful picanha spread with sides and wine
    gallery3,    // Tender meat stew with wine and bread
    gallery4,    // Grilled meat skewers with beer and sides
    gallery5,    // Traditional picanha in copper pan with Portuguese cider
    gallery6,    // Duplicate of gallery3 - meat stew presentation
    gallery7,    // Golden picanha slices with premium wine
    gallery8,    // Gourmet pasta with Portuguese cider
    gallery9,    // Colorful meat and fruit platter with cocktails
    gallery10,   // Traditional meat board with chimichurri and sides
    gallery11    // Bartenders serving fresh passion fruit cocktails
  ]
};

export default function GallerySection({ restaurant }: GallerySectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  const { data: photos, isLoading } = useQuery<GalleryPhoto[]>({
    queryKey: ["/api/restaurants", restaurant.id, "gallery"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (photoId: string) => {
      return apiRequest("DELETE", `/api/gallery/${photoId}`);
    },
    onSuccess: () => {
      toast({
        title: "Photo Deleted",
        description: "Photo has been removed from the gallery.",
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/restaurants", restaurant.id, "gallery"],
      });
    },
    onError: () => {
      toast({
        title: "Delete Failed",
        description: "Failed to delete photo. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeletePhoto = (photoId: string) => {
    if (window.confirm("Are you sure you want to delete this photo?")) {
      deleteMutation.mutate(photoId);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-beige-light">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="h-12 w-64 mx-auto mb-8" />
          <Skeleton className="h-12 w-48 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const displayImages = photos && photos.length > 0 
    ? photos.map(photo => photo.imageUrl)
    : defaultImages[restaurant.slug as keyof typeof defaultImages] || defaultImages["casa-da-peixe"];

  return (
    <section className="py-16 bg-beige-light">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-4xl font-bold text-center text-wine mb-12">
          {restaurant.slug === "casa-da-peixe" ? t.gallery.galleryTitle : t.gallery.ourSpaceTitle}
        </h2>
        
        <div className="mb-8 text-center">
          <PhotoUpload
            type="gallery"
            restaurantId={restaurant.id}
            data-testid="gallery-photo-upload"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayImages.map((imageUrl, index) => {
            const photo = photos?.find(p => p.imageUrl === imageUrl);
            const isUploaded = !!photo;
            
            return (
              <Card key={isUploaded ? photo.id : `default-${index}`} className="bg-white overflow-hidden shadow-lg group">
                <div className="relative">
                  <img
                    src={imageUrl}
                    alt={photo?.title || `Gallery image ${index + 1}`}
                    className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  />
                  {isUploaded && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeletePhoto(photo.id)}
                        disabled={deleteMutation.isPending}
                        className="p-2"
                        data-testid={`button-delete-photo-${photo.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {photo?.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-3">
                      <h4 className="font-medium">{photo.title}</h4>
                      {photo.description && (
                        <p className="text-sm text-gray-300">{photo.description}</p>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
