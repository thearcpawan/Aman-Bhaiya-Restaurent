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
          {restaurant.slug === "porto" ? "Make a Reservation" : "Reserve Your Table"}
        </h2>
        
        <Card className="bg-beige-light shadow-lg">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-charcoal">Full Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wine focus:ring-2 focus:ring-wine/20 transition-colors"
                            data-testid="input-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-charcoal">Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wine focus:ring-2 focus:ring-wine/20 transition-colors"
                            data-testid="input-email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-charcoal">Date *</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            min={today}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wine focus:ring-2 focus:ring-wine/20 transition-colors"
                            data-testid="input-date"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-charcoal">Time *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wine focus:ring-2 focus:ring-wine/20 transition-colors" data-testid="select-time">
                              <SelectValue placeholder="Select time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {RESERVATION_TIMES.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-charcoal">Guests *</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wine focus:ring-2 focus:ring-wine/20 transition-colors" data-testid="select-guests">
                              <SelectValue placeholder="Number of guests" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {GUEST_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="specialRequests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-charcoal">
                        Special Requests
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder={restaurant.slug === "porto" 
                            ? "Any dietary restrictions or special occasions..." 
                            : "Wine pairing preferences, dietary restrictions, special occasions..."
                          }
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-wine focus:ring-2 focus:ring-wine/20 transition-colors resize-none"
                          data-testid="textarea-requests"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={reservationMutation.isPending}
                  className="w-full bg-wine text-white py-4 rounded-lg font-semibold hover:bg-wine-dark transition-colors disabled:opacity-50"
                  data-testid="button-reserve"
                >
                  {reservationMutation.isPending ? "Reserving..." : "Reserve Table"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
