import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PhotoUpload from "@/components/photo-upload";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Restaurant, GalleryPhoto } from "@shared/schema";

interface GallerySectionProps {
  restaurant: Restaurant;
}

const defaultImages = {
  "casa-da-peixe": [
    "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  ],
  lapicanha: [
    "https://images.unsplash.com/photo-1592861956120-e524fc739696?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
  ]
};

export default function GallerySection({ restaurant }: GallerySectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
          {restaurant.slug === "casa-da-peixe" ? "Gallery" : "Our Space"}
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
