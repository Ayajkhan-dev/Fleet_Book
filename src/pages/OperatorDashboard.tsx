import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useBookingsByOperator, useFleetByOperator, useReviewsByOperator } from "@/hooks/useFleetData";
import { toast } from "sonner";
import { Car, DollarSign, Star, CheckCircle, XCircle, Clock, Plus, Phone, Mail, TrendingUp } from "lucide-react";

const vehicleTypeLabels: Record<string, string> = {
  sedan: "Sedan", innova: "Innova Crysta", fortuner: "Fortuner", tempo: "Tempo Traveller", luxury: "Luxury SUV",
};

export default function OperatorDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [addVehicleOpen, setAddVehicleOpen] = useState(false);

  const operatorId = user?.id || 201;

  const { data: fleet } = useFleetByOperator(operatorId);
  const { data: bookings } = useBookingsByOperator(operatorId);
  const { data: reviews } = useReviewsByOperator(operatorId);

  const [vehicleForm, setVehicleForm] = useState({
    vehicleNumber: "", type: "innova" as "sedan" | "innova" | "fortuner" | "tempo" | "luxury",
    capacity: 7, year: 2024, driverName: "", driverPhone: "", driverLicense: "", pricePerDay: 3000,
  });

  const handleAddVehicle = () => {
    toast.success("Vehicle added successfully! (Demo mode - no backend save)");
    setAddVehicleOpen(false);
  };

  const totalEarnings = (bookings as Array<{status: string; operatorAmount: string}>)?.filter(b => b.status === "completed").reduce((sum, b) => sum + Number(b.operatorAmount), 0) || 0;
  const monthlyBookings = (bookings as Array<{status: string; createdAt: Date}>)?.filter(b => b.status === "completed" && new Date(b.createdAt).getMonth() === new Date().getMonth()).length || 0;

  const tabs = [
    { value: "overview", label: "Overview", icon: TrendingUp },
    { value: "fleet", label: "My Fleet", icon: Car },
    { value: "bookings", label: "Bookings", icon: Clock },
    { value: "earnings", label: "Earnings", icon: DollarSign },
    { value: "reviews", label: "Reviews", icon: Star },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f8f8f6]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-4">Please Login</h2>
          <p className="text-[#6b6b6b] mb-6">You need to be logged in as an operator.</p>
          <Button onClick={() => navigate("/login")} className="bg-[#1a1a2e] hover:bg-[#0f3460] text-white">Login</Button>
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
            Operator <span className="text-[#e8c97e]">Dashboard</span>
          </h1>
          <p className="text-white/60 text-sm mt-1">Welcome, {user?.name}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-[#e8c97e]/20 mb-6 flex flex-wrap h-auto">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}
                className="data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-white flex-1">
                <tab.icon className="w-4 h-4 mr-1.5" /> {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[
                { label: "Total Cars", value: (fleet as Array<unknown>)?.length || 0, icon: Car, color: "from-blue-500 to-blue-600" },
                { label: "Pending Bookings", value: (bookings as Array<{status: string}>)?.filter((b: {status: string}) => b.status === "pending").length || 0, icon: Clock, color: "from-yellow-500 to-yellow-600" },
                { label: "This Month", value: monthlyBookings, icon: CheckCircle, color: "from-green-500 to-green-600" },
                { label: "Total Earnings", value: `\u20b9${Math.round(totalEarnings).toLocaleString("en-IN")}`, icon: DollarSign, color: "from-[#e8c97e] to-[#d4b56a]" },
              ].map((stat) => (
                <Card key={stat.label} className="border-[#e8c97e]/15 hover-lift">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shrink-0`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#1a1a2e] font-['Playfair_Display']">{stat.value}</p>
                      <p className="text-xs text-[#6b6b6b]">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-[#e8c97e]/15">
              <CardContent className="p-5">
                <h3 className="font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">Recent Bookings</h3>
                {(bookings as Array<{id: number; customerName: string; carsRequested: number; vehicleType: string; eventDate: Date; status: string}>)?.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-sm text-[#1a1a2e]">{booking.customerName}</p>
                      <p className="text-xs text-[#6b6b6b]">{booking.carsRequested} {booking.vehicleType} cars | {new Date(booking.eventDate).toLocaleDateString("en-IN")}</p>
                    </div>
                    <Badge className={`${booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : booking.status === "confirmed" ? "bg-green-100 text-green-700" : booking.status === "completed" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"} border-0`}>
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fleet */}
          <TabsContent value="fleet">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-[#1a1a2e] font-['Playfair_Display']">My Fleet ({(fleet as Array<unknown>)?.length || 0} vehicles)</h3>
              <Dialog open={addVehicleOpen} onOpenChange={setAddVehicleOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#1a1a2e] hover:bg-[#0f3460] text-white"><Plus className="w-4 h-4 mr-1.5" /> Add Vehicle</Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-['Playfair_Display']">Add New Vehicle</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3 pt-2">
                    <Input placeholder="Vehicle Number (e.g. UP32AB1234)" value={vehicleForm.vehicleNumber} onChange={e => setVehicleForm({...vehicleForm, vehicleNumber: e.target.value})} />
                    <Select value={vehicleForm.type} onValueChange={(v) => setVehicleForm({...vehicleForm, type: v as typeof vehicleForm.type})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{Object.entries(vehicleTypeLabels).map(([k, l]) => <SelectItem key={k} value={k}>{l}</SelectItem>)}</SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-3">
                      <Input type="number" placeholder="Capacity" value={vehicleForm.capacity} onChange={e => setVehicleForm({...vehicleForm, capacity: Number(e.target.value)})} />
                      <Input type="number" placeholder="Year" value={vehicleForm.year} onChange={e => setVehicleForm({...vehicleForm, year: Number(e.target.value)})} />
                    </div>
                    <Input placeholder="Driver Name" value={vehicleForm.driverName} onChange={e => setVehicleForm({...vehicleForm, driverName: e.target.value})} />
                    <Input placeholder="Driver Phone" value={vehicleForm.driverPhone} onChange={e => setVehicleForm({...vehicleForm, driverPhone: e.target.value})} />
                    <Input placeholder="Driver License" value={vehicleForm.driverLicense} onChange={e => setVehicleForm({...vehicleForm, driverLicense: e.target.value})} />
                    <Input type="number" placeholder="Price Per Day (\u20b9)" value={vehicleForm.pricePerDay} onChange={e => setVehicleForm({...vehicleForm, pricePerDay: Number(e.target.value)})} />
                    <Button onClick={handleAddVehicle} className="w-full bg-[#e8c97e] hover:bg-[#d4b56a] text-[#1a1a2e] font-semibold">Add Vehicle</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-lg border border-[#e8c97e]/15">
                <thead>
                  <tr className="border-b border-[#e8c97e]/20 bg-[#f8f8f6]">
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Vehicle No.</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Capacity</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Driver</th>
                    <th className="text-right py-3 px-4 font-semibold text-[#1a1a2e]">Price/Day</th>
                    <th className="text-center py-3 px-4 font-semibold text-[#1a1a2e]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {(fleet as Array<{id: number; vehicleNumber: string; type: string; capacity: number; driverName: string; driverPhone: string; pricePerDay: string; isAvailable: boolean}>)?.map((v) => (
                    <tr key={v.id} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f8f6]/50">
                      <td className="py-3 px-4 font-medium">{v.vehicleNumber}</td>
                      <td className="py-3 px-4">{vehicleTypeLabels[v.type]}</td>
                      <td className="py-3 px-4">{v.capacity} seats</td>
                      <td className="py-3 px-4">{v.driverName || "N/A"} {v.driverPhone && <span className="text-[#6b6b6b]">({v.driverPhone})</span>}</td>
                      <td className="py-3 px-4 text-right font-semibold">&#8377;{Number(v.pricePerDay).toLocaleString("en-IN")}</td>
                      <td className="py-3 px-4 text-center">
                        {v.isAvailable ? <Badge className="bg-green-100 text-green-700 border-0">Active</Badge> : <Badge className="bg-red-100 text-red-700 border-0">Inactive</Badge>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings">
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">Booking Requests</h3>
            <div className="space-y-4">
              {(bookings as Array<{
                id: number; status: string; customerName: string; customerPhone: string; customerEmail: string;
                carsRequested: number; vehicleType: string; eventDate: Date; eventTime: string;
                pickupAddress: string; dropAddress: string; totalAmount: string;
              }>)?.map((booking) => (
                <Card key={booking.id} className="border-[#e8c97e]/15">
                  <CardContent className="p-5">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h4 className="font-semibold text-[#1a1a2e]">{booking.customerName}</h4>
                          <Badge className={`${booking.status === "pending" ? "bg-yellow-100 text-yellow-700" : booking.status === "confirmed" ? "bg-green-100 text-green-700" : booking.status === "completed" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"} border-0`}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-[#6b6b6b] space-y-1">
                          <p>{booking.carsRequested} {booking.vehicleType} cars | {new Date(booking.eventDate).toLocaleDateString("en-IN")} | {booking.eventTime}</p>
                          <p><span className="font-medium">Pickup:</span> {booking.pickupAddress}</p>
                          <p><span className="font-medium">Drop:</span> {booking.dropAddress}</p>
                          <p className="font-semibold text-[#1a1a2e]">Amount: &#8377;{Number(booking.totalAmount).toLocaleString("en-IN")}</p>
                        </div>
                        {booking.status === "confirmed" && (
                          <div className="mt-2 flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-[#1a1a2e]"><Phone className="w-3.5 h-3.5 text-[#e8c97e]" /> {booking.customerPhone}</span>
                            <span className="flex items-center gap-1 text-[#1a1a2e]"><Mail className="w-3.5 h-3.5 text-[#e8c97e]" /> {booking.customerEmail}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {booking.status === "pending" && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => toast.success("Booking accepted!")}>
                              <CheckCircle className="w-3.5 h-3.5 mr-1" /> Accept
                            </Button>
                            <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => toast.success("Booking rejected")}>
                              <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                            </Button>
                          </>
                        )}
                        {booking.status === "confirmed" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => toast.success("Booking marked as completed!")}>
                            <CheckCircle className="w-3.5 h-3.5 mr-1" /> Mark Complete
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Earnings */}
          <TabsContent value="earnings">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-[#e8c97e]/15">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">Completed Bookings</h3>
                  <div className="space-y-3">
                    {(bookings as Array<{id: number; status: string; customerName: string; carsRequested: number; eventDate: Date; operatorAmount: string}>)?.filter((b: {status: string}) => b.status === "completed").map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div>
                          <p className="font-medium text-sm text-[#1a1a2e]">{booking.customerName}</p>
                          <p className="text-xs text-[#6b6b6b]">{booking.carsRequested} cars | {new Date(booking.eventDate).toLocaleDateString("en-IN")}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-[#1a1a2e]">&#8377;{Number(booking.operatorAmount).toLocaleString("en-IN")}</p>
                          <p className="text-xs text-[#6b6b6b]">after 10% platform fee</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border-[#e8c97e]/15 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white">
                  <CardContent className="p-5">
                    <DollarSign className="w-8 h-8 text-[#e8c97e] mb-3" />
                    <p className="text-white/60 text-sm">Total Earnings</p>
                    <p className="text-3xl font-bold font-['Playfair_Display']">&#8377;{Math.round(totalEarnings).toLocaleString("en-IN")}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews">
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">Customer Reviews</h3>
            <div className="space-y-4">
              {(reviews as Array<{id: number; customerName: string; rating: number; comment: string; createdAt: Date}>)?.map((review) => (
                <Card key={review.id} className="border-[#e8c97e]/15">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center text-white text-sm font-semibold">
                          {(review.customerName || "U").charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-[#1a1a2e]">{review.customerName || "User"}</p>
                          <p className="text-xs text-[#6b6b6b]">{new Date(review.createdAt).toLocaleDateString("en-IN")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-[#e8c97e] fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
              {(!reviews || (reviews as Array<unknown>).length === 0) && (
                <Card className="border-[#e8c97e]/15">
                  <CardContent className="p-8 text-center">
                    <Star className="w-12 h-12 mx-auto text-[#e8c97e]/30 mb-3" />
                    <p className="text-[#6b6b6b]">No reviews yet.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
