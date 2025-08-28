import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Phone, Mail, MessageCircle } from "lucide-react";
import { RESTAURANTS } from "@/lib/constants";

export default function AdminPage() {
  // Get reservations for both restaurants
  const { data: casaReservations = [] } = useQuery<any[]>({
    queryKey: ["/api/restaurants", "casa-da-peixe-id", "reservations"],
  });

  const { data: lapicanhaReservations = [] } = useQuery<any[]>({
    queryKey: ["/api/restaurants", "lapicanha-id", "reservations"],
  });

  const allReservations = [
    ...(casaReservations || []).map((res: any) => ({ ...res, restaurantName: "Original's Casa de Peixe" })),
    ...(lapicanhaReservations || []).map((res: any) => ({ ...res, restaurantName: "Lapicanha" }))
  ];

  // Sort by creation date, newest first
  const sortedReservations = allReservations.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-wine">Restaurant Reservations</h1>
          <p className="text-gray-600 mt-2">Manage your restaurant bookings</p>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reservations</p>
                    <p className="text-2xl font-bold text-wine">{allReservations.length}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-wine" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">
                      {allReservations.filter(r => r.status === 'pending').length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-green-600">
                      {allReservations.filter(r => r.status === 'confirmed').length}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {allReservations.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reservations Yet</h3>
              <p className="text-gray-500">
                Reservations will appear here when customers make bookings through your website.
              </p>
              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Your current system uses temporary storage. 
                  For a live business, you'll need to set up a permanent database to keep reservations safe.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedReservations.map((reservation: any) => (
              <Card key={reservation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{reservation.name}</CardTitle>
                      <Badge className={getStatusColor(reservation.status)}>
                        {reservation.status}
                      </Badge>
                      <Badge variant="outline">{reservation.restaurantName}</Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(reservation.createdAt).toLocaleDateString()} at{' '}
                      {new Date(reservation.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        <strong>Date:</strong> {new Date(reservation.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        <strong>Time:</strong> {reservation.time}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        <strong>Guests:</strong> {reservation.guests}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">
                        <strong>Phone:</strong> {reservation.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-gray-400 mt-1" />
                    <span className="text-sm">
                      <strong>Email:</strong> {reservation.email}
                    </span>
                  </div>

                  {reservation.specialRequests && (
                    <div className="flex items-start gap-2">
                      <MessageCircle className="h-4 w-4 text-gray-400 mt-1" />
                      <div className="text-sm">
                        <strong>Special Requests:</strong>
                        <p className="mt-1 text-gray-600">{reservation.specialRequests}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}