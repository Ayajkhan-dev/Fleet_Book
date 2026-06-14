import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOperatorById, useReviewsByOperator } from "@/hooks/useFleetData";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { MapPin, Phone, Car, Star, Calendar, Clock, ChevronLeft, Shield, CheckCircle, Loader2 } from "lucide-react";

const vehicleTypeLabels: Record<string, string> = {
  sedan: "Sedan", innova: "Innova Crysta", fortuner: "Fortuner", tempo: "Tempo Traveller", luxury: "Luxury SUV",
};

export default function OperatorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const operatorId = Number(id);

  const { data: operator, isLoading } = useOperatorById(operatorId);
  const { data: reviews } = useReviewsByOperator(operatorId);

  const [bookingForm, setBookingForm] = useState({
    pickupAddress: "", dropAddress: "", eventDate: "", returnDate: "",
    eventTime: "", carsRequested: 2, vehicleType: "innova", specialInstructions: "",
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const calculatePrice = () => {
    const fleet = (operator?.fleet || []).filter((v: Record<string, unknown>) => v.type === bookingForm.vehicleType && v.isAvailable === true);
    if (!fleet || fleet.length === 0) return { subtotal: 0, platformFee: 0, total: 0, days: 1 };
    const avgPrice = fleet.reduce((sum: number, v: Record<string, unknown>) => sum + Number(v.pricePerDay || 0), 0) / fleet.length;
    const eventDate = new Date(bookingForm.eventDate);
    const returnDate = bookingForm.returnDate ? new Date(bookingForm.returnDate) : eventDate;
    const days = Math.max(1, Math.ceil((returnDate.getTime() - eventDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
    const subtotal = bookingForm.carsRequested * days * avgPrice;
    const platformFee = subtotal * 0.10;
    return { subtotal, platformFee, total: subtotal + platformFee, days };
  };

  const priceCalc = calculatePrice();

  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a fleet.");
      navigate("/login");
      return;
    }
    if (!bookingForm.pickupAddress || !bookingForm.dropAddress || !bookingForm.eventDate) {
      toast.error("Please fill in all required fields.");
      return;
    }
    toast.success("Your booking request has been submitted!");
    setBookingSubmitted(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#e8c97e]" />
      </div>
    );
  }

  if (!operator) {
    return (
      <div className="min-h-screen bg-[#f8f8f6]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e]">Operator Not Found</h2>
          <Button onClick={() => navigate("/search")} className="mt-4">Back to Search</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const fleetByType = (operator.fleet as Array<{type: string}> || []).reduce((acc: Record<string, unknown[]>, vehicle: {type: string}) => {
    if (!acc[vehicle.type]) acc[vehicle.type] = [];
    acc[vehicle.type].push(vehicle);
    return acc;
  }, {} as Record<string, unknown[]>);

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#1a1a2e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" size="sm" onClick={() => navigate("/search")}
            className="text-white/60 hover:text-[#e8c97e] hover:bg-white/10 mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Search
          </Button>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#e8c97e] to-[#d4b56a] flex items-center justify-center text-[#1a1a2e] font-bold text-2xl">
                {operator.name?.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white font-['Playfair_Display']">{operator.name}</h1>
                  <Badge className="bg-[#e8c97e]/20 text-[#e8c97e] border-0"><Shield className="w-3 h-3 mr-1" /> Verified</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mt-1">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-[#e8c97e]" /> {operator.city}</span>
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-[#e8c97e] fill-current" /> {operator.rating} ({operator.totalReviews} reviews)</span>
                  <span className="flex items-center gap-1"><Car className="w-4 h-4 text-[#e8c97e]" /> {operator.totalCars} cars</span>
                </div>
              </div>
            </div>
            {operator.businessName && (
              <div className="text-right">
                <p className="text-white/40 text-sm">Business</p>
                <p className="text-white font-medium">{operator.businessName}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="fleet">
              <TabsList className="bg-white border border-[#e8c97e]/20 mb-6">
                <TabsTrigger value="fleet" className="data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-white">
                  <Car className="w-4 h-4 mr-1.5" /> Fleet
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-white">
                  <Star className="w-4 h-4 mr-1.5" /> Reviews ({reviews?.length || 0})
                </TabsTrigger>
                <TabsTrigger value="about" className="data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-white">
                  <Shield className="w-4 h-4 mr-1.5" /> About
                </TabsTrigger>
              </TabsList>

              {/* Fleet Tab */}
              <TabsContent value="fleet">
                <div className="space-y-6">
                  {Object.entries(fleetByType).map(([type, vehicles]) => (
                    <Card key={type} className="border-[#e8c97e]/15">
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-[#1a1a2e] text-lg font-['Playfair_Display'] mb-4">
                          {vehicleTypeLabels[type]} ({(vehicles as Array<unknown>).length})
                        </h3>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b border-[#e8c97e]/20">
                                <th className="text-left py-2 px-3 text-[#6b6b6b] font-medium">Vehicle No.</th>
                                <th className="text-left py-2 px-3 text-[#6b6b6b] font-medium">Capacity</th>
                                <th className="text-left py-2 px-3 text-[#6b6b6b] font-medium">Year</th>
                                <th className="text-left py-2 px-3 text-[#6b6b6b] font-medium">Driver</th>
                                <th className="text-right py-2 px-3 text-[#6b6b6b] font-medium">Price/Day</th>
                                <th className="text-center py-2 px-3 text-[#6b6b6b] font-medium">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {(vehicles as Array<{id: number; vehicleNumber: string; capacity: number; year: number; driverName: string; pricePerDay: string; isAvailable: boolean}>).map((v) => (
                                <tr key={v.id} className="border-b border-gray-100 last:border-0">
                                  <td className="py-3 px-3 font-medium">{v.vehicleNumber}</td>
                                  <td className="py-3 px-3">{v.capacity} seats</td>
                                  <td className="py-3 px-3">{v.year}</td>
                                  <td className="py-3 px-3">{v.driverName || "N/A"}</td>
                                  <td className="py-3 px-3 text-right font-semibold text-[#1a1a2e]">
                                    <span className="text-[#e8c97e]">&#8377;</span>{Number(v.pricePerDay).toLocaleString("en-IN")}
                                  </td>
                                  <td className="py-3 px-3 text-center">
                                    {v.isAvailable ? (
                                      <Badge className="bg-green-100 text-green-700 border-0 text-xs">Available</Badge>
                                    ) : (
                                      <Badge className="bg-red-100 text-red-700 border-0 text-xs">Booked</Badge>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <div className="space-y-4">
                  {(!reviews || reviews.length === 0) && (
                    <Card className="border-[#e8c97e]/15">
                      <CardContent className="p-8 text-center">
                        <Star className="w-12 h-12 mx-auto text-[#e8c97e]/30 mb-3" />
                        <h3 className="text-lg font-semibold text-[#1a1a2e]">No Reviews Yet</h3>
                        <p className="text-[#6b6b6b] text-sm">Be the first to review this operator!</p>
                      </CardContent>
                    </Card>
                  )}
                  {reviews?.map((review: Record<string, unknown>) => (
                    <Card key={review.id as number} className="border-[#e8c97e]/15">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center text-white text-sm font-semibold">
                              {String(review.customerName || "U").charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-sm text-[#1a1a2e]">{String(review.customerName || "User")}</p>
                              <p className="text-xs text-[#6b6b6b]">{new Date(review.createdAt as Date).toLocaleDateString("en-IN")}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: Number(review.rating) }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[#e8c97e] fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-[#6b6b6b] leading-relaxed">{String(review.comment || "")}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* About Tab */}
              <TabsContent value="about">
                <Card className="border-[#e8c97e]/15">
                  <CardContent className="p-6 space-y-4">
                    {operator.businessName && (
                      <div>
                        <h4 className="font-semibold text-[#1a1a2e] mb-1">Business Name</h4>
                        <p className="text-sm text-[#6b6b6b]">{operator.businessName}</p>
                      </div>
                    )}
                    {operator.operatingCities && (
                      <div>
                        <h4 className="font-semibold text-[#1a1a2e] mb-1">Operating Cities</h4>
                        <div className="flex flex-wrap gap-2">
                          {String(operator.operatingCities).split(",").map((city: string) => (
                            <Badge key={city} variant="outline" className="border-[#e8c97e]/30">
                              <MapPin className="w-3 h-3 mr-1 text-[#e8c97e]" />{city.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {operator.yearsInBusiness && (
                      <div>
                        <h4 className="font-semibold text-[#1a1a2e] mb-1">Experience</h4>
                        <p className="text-sm text-[#6b6b6b]">{operator.yearsInBusiness} years in business</p>
                      </div>
                    )}
                    {operator.gstNumber && (
                      <div>
                        <h4 className="font-semibold text-[#1a1a2e] mb-1">GST Number</h4>
                        <p className="text-sm text-[#6b6b6b]">{operator.gstNumber}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-[#1a1a2e] mb-1">Contact</h4>
                      <p className="text-sm text-[#6b6b6b] flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {operator.phone?.toString().slice(0, 5)}XXXXX (revealed after booking)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Form Sidebar */}
          <div className="lg:w-96 shrink-0">
            <Card className="sticky top-24 border-[#e8c97e]/20 shadow-xl">
              <div className="h-1.5 bg-gradient-to-r from-[#e8c97e] to-[#d4b56a]" />
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1 font-['Playfair_Display']">Book This Fleet</h3>
                <p className="text-xs text-[#6b6b6b] mb-4">Fill in the details to request a booking</p>

                {bookingSubmitted ? (
                  <div className="text-center py-6">
                    <CheckCircle className="w-14 h-14 mx-auto text-green-500 mb-3" />
                    <h4 className="text-lg font-semibold text-green-700 mb-1">Booking Submitted!</h4>
                    <p className="text-sm text-[#6b6b6b] mb-4">The operator will review and confirm your request.</p>
                    <Button onClick={() => navigate("/dashboard")} className="bg-[#1a1a2e] hover:bg-[#0f3460] text-white">
                      View My Bookings
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Pickup Address *</label>
                      <Textarea placeholder="Enter pickup address" value={bookingForm.pickupAddress}
                        onChange={(e) => setBookingForm({ ...bookingForm, pickupAddress: e.target.value })}
                        className="min-h-[60px] text-sm border-[#e8c97e]/20" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Drop Address *</label>
                      <Textarea placeholder="Enter drop address" value={bookingForm.dropAddress}
                        onChange={(e) => setBookingForm({ ...bookingForm, dropAddress: e.target.value })}
                        className="min-h-[60px] text-sm border-[#e8c97e]/20" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Event Date *</label>
                        <div className="relative">
                          <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#e8c97e] z-10" />
                          <Input type="date" min={new Date().toISOString().split("T")[0]}
                            value={bookingForm.eventDate}
                            onChange={(e) => setBookingForm({ ...bookingForm, eventDate: e.target.value })}
                            className="pl-8 text-sm border-[#e8c97e]/20 h-9" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Return Date</label>
                        <Input type="date" min={bookingForm.eventDate || new Date().toISOString().split("T")[0]}
                          value={bookingForm.returnDate}
                          onChange={(e) => setBookingForm({ ...bookingForm, returnDate: e.target.value })}
                          className="text-sm border-[#e8c97e]/20 h-9" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Event Time</label>
                        <div className="relative">
                          <Clock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#e8c97e] z-10" />
                          <Input type="time" value={bookingForm.eventTime}
                            onChange={(e) => setBookingForm({ ...bookingForm, eventTime: e.target.value })}
                            className="pl-8 text-sm border-[#e8c97e]/20 h-9" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">No. of Cars</label>
                        <Input type="number" min={1} max={operator.totalCars}
                          value={bookingForm.carsRequested}
                          onChange={(e) => setBookingForm({ ...bookingForm, carsRequested: Number(e.target.value) })}
                          className="text-sm border-[#e8c97e]/20 h-9" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Vehicle Type</label>
                      <Select value={bookingForm.vehicleType} onValueChange={(v) => setBookingForm({ ...bookingForm, vehicleType: v })}>
                        <SelectTrigger className="border-[#e8c97e]/20 h-9 text-sm"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(vehicleTypeLabels).map(([key, label]) => (
                            <SelectItem key={key} value={key}>{label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#6b6b6b] mb-1 block">Special Instructions</label>
                      <Textarea placeholder="Decorated cars, specific route, etc."
                        value={bookingForm.specialInstructions}
                        onChange={(e) => setBookingForm({ ...bookingForm, specialInstructions: e.target.value })}
                        className="min-h-[50px] text-sm border-[#e8c97e]/20" />
                    </div>

                    {/* Price Calculator */}
                    {priceCalc.subtotal > 0 && (
                      <div className="bg-[#f8f8f6] rounded-lg p-3 space-y-1.5 text-sm">
                        <div className="flex justify-between text-[#6b6b6b]">
                          <span>{bookingForm.carsRequested} cars x {priceCalc.days} day{priceCalc.days > 1 ? "s" : ""}</span>
                          <span>&#8377;{Math.round(priceCalc.subtotal).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-[#6b6b6b]">
                          <span>Platform Fee (10%)</span>
                          <span>&#8377;{Math.round(priceCalc.platformFee).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="border-t border-[#e8c97e]/20 pt-1.5 flex justify-between font-semibold text-[#1a1a2e]">
                          <span>Total</span>
                          <span className="text-[#e8c97e]">&#8377;{Math.round(priceCalc.total).toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    )}

                    <Button onClick={handleBooking}
                      className="w-full h-10 bg-gradient-to-r from-[#e8c97e] to-[#d4b56a] hover:from-[#d4b56a] hover:to-[#c4a55a] text-[#1a1a2e] font-semibold">
                      Confirm Booking
                    </Button>

                    {!isAuthenticated && (
                      <p className="text-xs text-center text-[#6b6b6b]">
                        You need to <button onClick={() => navigate("/login")} className="text-[#e8c97e] underline">login</button> to book
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
