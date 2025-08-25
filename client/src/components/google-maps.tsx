import { useState } from "react";
import type { Restaurant } from "@shared/schema";

interface GoogleMapsProps {
  restaurant: Restaurant;
}

export default function GoogleMaps({ restaurant }: GoogleMapsProps) {
  const [mapError, setMapError] = useState(false);
  
  // Extract address for Google Maps
  const address = restaurant.address.replace(/\n/g, ", ");
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "demo_key"}&q=${encodeURIComponent(address)}`;
  
  if (mapError || !import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-lg font-medium mb-2">Location</div>
          <div className="whitespace-pre-line text-sm">
            {restaurant.address}
          </div>
          <div className="mt-4">
            <a 
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wine hover:text-wine-dark underline"
              data-testid="link-google-maps"
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg h-96">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onError={() => setMapError(true)}
        title={`${restaurant.name} location`}
        data-testid="google-maps-iframe"
      />
    </div>
  );
}
