import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useBookingsByCustomer } from "@/hooks/useFleetData";
import { Car, Calendar, MapPin, Phone, Star, Loader2, Clock, CheckCircle, XCircle } from "lucide-react";

const statusConfig: Record<string, { label: string; class: string; icon: typeof Clock }> = {
  pending: { label: "Pending", class: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
  confirmed: { label: "Confirmed", class: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
  completed: { label: "Completed", class: "bg-blue-100 text-blue-800 border-blue-200", icon: CheckCircle },
  cancelled: { label: "Cancelled", class: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  const customerId = user?.id || 101;
  const { data: bookings, isLoading } = useBookingsByCustomer(customerId);

  const filteredBookings = activeTab === "all"
    ? bookings
    : bookings?.filter((b: {status: string}) => b.status === activeTab);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8f8f6]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Please Login</h2>
          <p className="text-[#6b6b6b] mb-6">You need to be logged in to view your dashboard.</p>
          <Button onClick={() => navigate("/login")} className="bg-[#1a1a2e] hover:bg-[#0f3460] text-white">
            Login
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Navbar />

      <div className="bg-[#1a1a2e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-['Playfair_Display']">
            My <span className="text-[#e8c97e]">Dashboard</span>
          </h1>
          <p className="text-white/60 text-sm mt-1">Welcome back, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Bookings", value: bookings?.length || 0, icon: Car, color: "from-blue-500 to-blue-600" },
            { label: "Confirmed", value: bookings?.filter((b: {status: string}) => b.status === "confirmed").length || 0, icon: CheckCircle, color: "from-green-500 to-green-600" },
            { label: "Pending", value: bookings?.filter((b: {status: string}) => b.status === "pending").length || 0, icon: Clock, color: "from-yellow-500 to-yellow-600" },
            { label: "Completed", value: bookings?.filter((b: {status: string}) => b.status === "completed").length || 0, icon: Star, color: "from-[#e8c97e] to-[#d4b56a]" },
          ].map((stat) => (
            <Card key={stat.label} className="border-[#e8c97e]/15 hover-lift">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shrink-0`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1a1a2e] font-['Playfair_Display']">{stat.value}</p>
                  <p className="text-xs text-[#6b6b6b]">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bookings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-[#e8c97e]/20 mb-6">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-600 data-[state=active]:text-white">Pending</TabsTrigger>
            <TabsTrigger value="confirmed" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">Confirmed</TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Completed</TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#e8c97e]" />
              </div>
            ) : filteredBookings?.length === 0 ? (
              <Card className="border-[#e8c97e]/15">
                <CardContent className="p-12 text-center">
                  <Car className="w-14 h-14 mx-auto text-[#e8c97e]/30 mb-4" />
                  <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2">No Bookings Found</h3>
                  <p className="text-[#6b6b6b] mb-4">Start by searching for a fleet operator.</p>
                  <Button onClick={() => navigate("/search")} className="bg-[#1a1a2e] hover:bg-[#0f3460] text-white">
                    Search Fleet
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {filteredBookings?.map((booking: Record<string, unknown>) => {
                  const status = statusConfig[String(booking.status)] || statusConfig.pending;
                  const StatusIcon = status.icon;

                  return (
                    <Card key={booking.id as number} className="hover-lift border-[#e8c97e]/15">
                      <CardContent className="p-5">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="font-semibold text-[#1a1a2e]">{String(booking.operatorName || "Operator")}</h3>
                              <Badge className={`${status.class} border-0`}>
                                <StatusIcon className="w-3 h-3 mr-0.5" />{status.label}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-[#6b6b6b] mb-3">
                              <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5 text-[#e8c97e]" />{Number(booking.carsRequested)} {String(booking.vehicleType)} cars</span>
                              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#e8c97e]" />{new Date(booking.eventDate as Date).toLocaleDateString("en-IN")}</span>
                              {booking.eventTime ? <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#e8c97e]" />{String(booking.eventTime)}</span> : null}
                              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#e8c97e]" />{String(booking.operatorCity || "")}</span>
                            </div>
                            <div className="text-sm text-[#6b6b6b]">
                              <span className="font-medium">Pickup:</span> {String(booking.pickupAddress || "")}<br />
                              <span className="font-medium">Drop:</span> {String(booking.dropAddress || "")}
                            </div>
                            {booking.status === "confirmed" && (
                              <div className="mt-3 p-2 bg-green-50 rounded-lg text-sm">
                                <span className="font-medium text-green-700 flex items-center gap-1">
                                  <Phone className="w-3.5 h-3.5" />Operator Contact: {String(booking.operatorPhone || "")}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col items-end gap-2 lg:min-w-[120px]">
                            <p className="text-xl font-bold text-[#1a1a2e]">
                              <span className="text-[#e8c97e]">&#8377;</span>{Number(booking.totalAmount).toLocaleString("en-IN")}
                            </p>
                            {booking.status === "completed" && (
                              <Button size="sm" variant="outline" className="border-[#e8c97e] text-[#1a1a2e] hover:bg-[#e8c97e]/10">
                                <Star className="w-3.5 h-3.5 mr-1" />Write Review
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
