import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertReservationSchema } from "@shared/schema";
import { RESERVATION_TIMES, GUEST_OPTIONS } from "@/lib/constants";
import type { Restaurant } from "@shared/schema";
import { z } from "zod";

interface ReservationsSectionProps {
  restaurant: Restaurant;
}

const formSchema = insertReservationSchema.extend({
  date: z.string().min(1, "Date is required"),
}).omit({ restaurantId: true });

type FormData = z.infer<typeof formSchema>;

export default function ReservationsSection({ restaurant }: ReservationsSectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      date: "",
      time: "",
      guests: 2,
      specialRequests: "",
    },
  });

  const reservationMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return apiRequest("POST", `/api/restaurants/${restaurant.id}/reservations`, {
        ...data,
        restaurantId: restaurant.id,
      });
    },
    onSuccess: () => {
      toast({
        title: "Reservation Submitted",
        description: "Your reservation has been submitted successfully. We'll contact you soon to confirm.",
      });
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ["/api/restaurants", restaurant.id, "reservations"],
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Reservation Failed",
        description: error.message || "Failed to submit reservation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    reservationMutation.mutate(data);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-4xl font-bold text-center text-wine mb-12">
          {restaurant.slug === "casa-da-peixe" ? "Make a Reservation" : "Reserve Your Table"}
        </h2>
        
        {/* Contact Options */}
        <div className="bg-wine text-white rounded-lg p-6 mb-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Prefer to Call?</h3>
            <p className="text-beige-light">
              Call us directly for immediate reservation confirmation
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Phone Button */}
            <a
              href={`tel:${restaurant.phone}`}
              className="flex items-center gap-3 bg-white text-wine px-6 py-3 rounded-lg font-semibold hover:bg-beige-light transition-colors w-full sm:w-auto justify-center"
              data-testid="button-call"
            >
              <Phone className="h-5 w-5" />
              Call {restaurant.phone}
            </a>
            
            {/* WhatsApp Button for Casa Da Peixe */}
            {restaurant.slug === "casa-da-peixe" && (
              <a
                href="https://wa.me/351926091468"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full sm:w-auto justify-center"
                data-testid="button-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            )}
          </div>
          
          <div className="text-center mt-4 text-sm text-beige-light">
            <p>
              {restaurant.slug === "casa-da-peixe" 
                ? "Available every day • Call or WhatsApp for reservations" 
                : "Available every day • Call for immediate confirmation"
              }
            </p>
          </div>
        </div>
        
        {/* Additional Contact Info */}
        <div className="text-center">
          <div className="bg-beige-light rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-charcoal mb-4">
              Restaurant Information
            </h3>
            
            <div className="space-y-4 text-lg">
              <div>
                <p className="font-semibold text-wine mb-1">Address:</p>
                <p className="text-charcoal whitespace-pre-line">{restaurant.address}</p>
              </div>
              
              <div>
                <p className="font-semibold text-wine mb-1">Phone:</p>
                <p className="text-charcoal">{restaurant.phone}</p>
              </div>
              
              {restaurant.slug === "casa-da-peixe" && (
                <div>
                  <p className="font-semibold text-wine mb-1">WhatsApp:</p>
                  <p className="text-charcoal">+351 926 091 468</p>
                </div>
              )}
            </div>
            
            <div className="mt-6 pt-6 border-t border-wine/20">
              <p className="text-charcoal font-medium">
                Call us to make your reservation today!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
