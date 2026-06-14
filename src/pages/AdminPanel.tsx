import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useAdminDashboard, useAdminOperators, useAdminCustomers, useAdminBookings } from "@/hooks/useFleetData";
import { toast } from "sonner";
import { Users, Car, DollarSign, Shield, CheckCircle, XCircle, Star, TrendingUp, MapPin, Clock } from "lucide-react";

export default function AdminPanel() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  const { data: dashboard } = useAdminDashboard();
  const { data: operators } = useAdminOperators();
  const { data: customers } = useAdminCustomers();
  const { data: bookings } = useAdminBookings();

  const tabs = [
    { value: "dashboard", label: "Dashboard", icon: TrendingUp },
    { value: "operators", label: "Operators", icon: Car },
    { value: "customers", label: "Customers", icon: Users },
    { value: "bookings", label: "Bookings", icon: Clock },
    { value: "revenue", label: "Revenue", icon: DollarSign },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f8f8f6]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <Shield className="w-16 h-16 mx-auto text-[#e8c97e] mb-4" />
          <h2 className="text-2xl font-bold text-[#1a1a2e] mb-2">Admin Access Required</h2>
          <p className="text-[#6b6b6b] mb-6">Please login with admin credentials to access this page.</p>
          <p className="text-sm text-[#6b6b6b] mb-4">Quick login: admin@fleetbook.in / demo</p>
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
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-[#e8c97e]" />
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white font-['Playfair_Display']">
                Admin <span className="text-[#e8c97e]">Panel</span>
              </h1>
              <p className="text-white/60 text-sm">FleetBook administration dashboard</p>
            </div>
          </div>
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

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: "Total Users", value: dashboard?.totalUsers || 0, icon: Users, color: "from-blue-500 to-blue-600" },
                { label: "Operators", value: dashboard?.totalOperators || 0, icon: Car, color: "from-purple-500 to-purple-600" },
                { label: "Bookings", value: dashboard?.totalBookings || 0, icon: Clock, color: "from-yellow-500 to-yellow-600" },
                { label: "Revenue", value: `\u20b9${Math.round(Number(dashboard?.totalRevenue || 0)).toLocaleString("en-IN")}`, icon: DollarSign, color: "from-green-500 to-green-600" },
                { label: "Commission", value: `\u20b9${Math.round(Number(dashboard?.platformCommission || 0)).toLocaleString("en-IN")}`, icon: Shield, color: "from-[#e8c97e] to-[#d4b56a]" },
              ].map((stat) => (
                <Card key={stat.label} className="border-[#e8c97e]/15 hover-lift">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shrink-0`}>
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

            {/* Recent Bookings */}
            <Card className="border-[#e8c97e]/15">
              <CardContent className="p-5">
                <h3 className="font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">Recent Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#e8c97e]/20">
                        <th className="text-left py-2 px-3 text-[#6b6b6b]">ID</th>
                        <th className="text-left py-2 px-3 text-[#6b6b6b]">Customer</th>
                        <th className="text-left py-2 px-3 text-[#6b6b6b]">Type</th>
                        <th className="text-left py-2 px-3 text-[#6b6b6b]">Date</th>
                        <th className="text-right py-2 px-3 text-[#6b6b6b]">Amount</th>
                        <th className="text-center py-2 px-3 text-[#6b6b6b]">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(bookings as Array<{id: number; customerName?: string; carsRequested?: number; vehicleType?: string; eventDate: Date; totalAmount: string; status: string}>)?.slice(0, 10).map((b) => (
                        <tr key={b.id} className="border-b border-gray-50 last:border-0">
                          <td className="py-2 px-3">#{b.id}</td>
                          <td className="py-2 px-3">{b.customerName || "N/A"}</td>
                          <td className="py-2 px-3">{b.carsRequested || 0} {b.vehicleType || "N/A"}</td>
                          <td className="py-2 px-3">{new Date(b.eventDate).toLocaleDateString("en-IN")}</td>
                          <td className="py-2 px-3 text-right font-semibold">&#8377;{Number(b.totalAmount).toLocaleString("en-IN")}</td>
                          <td className="py-2 px-3 text-center">
                            <Badge className={`${b.status === "pending" ? "bg-yellow-100 text-yellow-700" : b.status === "confirmed" ? "bg-green-100 text-green-700" : b.status === "completed" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"} border-0 text-xs`}>
                              {b.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Operators */}
          <TabsContent value="operators">
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">All Operators ({(operators as Array<unknown>)?.length || 0})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-lg border border-[#e8c97e]/15">
                <thead>
                  <tr className="border-b border-[#e8c97e]/20 bg-[#f8f8f6]">
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">City</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Fleet</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Rating</th>
                    <th className="text-center py-3 px-4 font-semibold text-[#1a1a2e]">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-[#1a1a2e]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(operators as Array<{
                    id: number; name: string; avatar?: string; businessName?: string; city: string;
                    fleetSize?: number; totalBookings?: number; rating: string; status: string;
                  }>)?.map((op) => (
                    <tr key={op.id} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f8f6]/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center text-white text-xs font-semibold">
                            {op.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{op.name}</p>
                            <p className="text-xs text-[#6b6b6b]">{op.businessName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#6b6b6b]"><MapPin className="w-3 h-3 inline mr-1" />{op.city}</td>
                      <td className="py-3 px-4">{op.fleetSize || 0} cars | {op.totalBookings || 0} bookings</td>
                      <td className="py-3 px-4"><Star className="w-3 h-3 inline text-[#e8c97e] fill-current mr-1" />{op.rating}</td>
                      <td className="py-3 px-4 text-center">
                        <Badge className={`${op.status === "active" ? "bg-green-100 text-green-700" : op.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"} border-0`}>
                          {op.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {op.status === "pending" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white mr-2" onClick={() => toast.success("Operator approved!")}>
                            <CheckCircle className="w-3 h-3 mr-1" /> Approve
                          </Button>
                        )}
                        {op.status === "active" && (
                          <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => toast.success("Operator suspended")}>
                            <XCircle className="w-3 h-3 mr-1" /> Suspend
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Customers */}
          <TabsContent value="customers">
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">All Customers ({(customers as Array<unknown>)?.length || 0})</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-white rounded-lg border border-[#e8c97e]/15">
                <thead>
                  <tr className="border-b border-[#e8c97e]/20 bg-[#f8f8f6]">
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">Phone</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#1a1a2e]">City</th>
                    <th className="text-center py-3 px-4 font-semibold text-[#1a1a2e]">Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {(customers as Array<{id: number; name: string; email: string; phone?: string; city?: string; totalBookings?: number; createdAt?: Date}>)?.map((cust) => (
                    <tr key={cust.id} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f8f6]/50">
                      <td className="py-3 px-4 font-medium">{cust.name}</td>
                      <td className="py-3 px-4 text-[#6b6b6b]">{cust.email}</td>
                      <td className="py-3 px-4 text-[#6b6b6b]">{cust.phone}</td>
                      <td className="py-3 px-4 text-[#6b6b6b]">{cust.city}</td>
                      <td className="py-3 px-4 text-center">{cust.totalBookings || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings">
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">All Bookings ({(bookings as Array<unknown>)?.length || 0})</h3>
            <div className="space-y-3">
              {(bookings as Array<{id: number; customerName?: string; carsRequested?: number; vehicleType?: string; eventDate: Date; totalAmount: string; status: string}>)?.map((b) => (
                <Card key={b.id} className="border-[#e8c97e]/15">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-[#1a1a2e]">#{b.id}</span>
                        <span className="text-sm">{b.customerName || "N/A"}</span>
                        <span className="text-sm text-[#6b6b6b]">{b.carsRequested || 0} {b.vehicleType}</span>
                        <span className="text-sm text-[#6b6b6b]">{new Date(b.eventDate).toLocaleDateString("en-IN")}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm">&#8377;{Number(b.totalAmount).toLocaleString("en-IN")}</span>
                        <Badge className={`${b.status === "pending" ? "bg-yellow-100 text-yellow-700" : b.status === "confirmed" ? "bg-green-100 text-green-700" : b.status === "completed" ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"} border-0`}>
                          {b.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Revenue */}
          <TabsContent value="revenue">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-[#e8c97e]/15">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-[#1a1a2e] mb-4 font-['Playfair_Display']">Platform Revenue</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#f8f8f6] rounded-lg">
                      <div>
                        <p className="text-sm text-[#6b6b6b]">Total Completed Bookings</p>
                        <p className="text-2xl font-bold text-[#1a1a2e] font-['Playfair_Display']">
                          {(bookings as Array<{status: string}>)?.filter((b: {status: string}) => b.status === "completed").length || 0}
                        </p>
                      </div>
                      <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-lg text-white">
                      <div>
                        <p className="text-sm text-white/60">Total Revenue</p>
                        <p className="text-2xl font-bold font-['Playfair_Display']">
                          &#8377;{Math.round(Number(dashboard?.totalRevenue || 0)).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <DollarSign className="w-10 h-10 text-[#e8c97e]" />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gradient-to-br from-[#e8c97e] to-[#d4b56a] rounded-lg">
                      <div>
                        <p className="text-sm text-[#1a1a2e]/60">Platform Commission (10%)</p>
                        <p className="text-2xl font-bold text-[#1a1a2e] font-['Playfair_Display']">
                          &#8377;{Math.round(Number(dashboard?.platformCommission || 0)).toLocaleString("en-IN")}
                        </p>
                      </div>
                      <Shield className="w-10 h-10 text-[#1a1a2e]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="border-[#e8c97e]/15 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white">
                  <CardContent className="p-5">
                    <DollarSign className="w-8 h-8 text-[#e8c97e] mb-3" />
                    <p className="text-white/60 text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold font-['Playfair_Display']">&#8377;{Math.round(Number(dashboard?.totalRevenue || 0)).toLocaleString("en-IN")}</p>
                  </CardContent>
                </Card>
                <Card className="border-[#e8c97e]/15 bg-gradient-to-br from-[#e8c97e] to-[#d4b56a]">
                  <CardContent className="p-5">
                    <Shield className="w-8 h-8 text-[#1a1a2e] mb-3" />
                    <p className="text-[#1a1a2e]/60 text-sm">Platform Commission</p>
                    <p className="text-3xl font-bold text-[#1a1a2e] font-['Playfair_Display']">&#8377;{Math.round(Number(dashboard?.platformCommission || 0)).toLocaleString("en-IN")}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
