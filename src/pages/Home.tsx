import { useState } from "react";
import { useNavigate, Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOperatorSearch } from "@/hooks/useFleetData";
import { Search, Calendar, Car, Users, Star, Shield, Clock, Phone, MapPin } from "lucide-react";

const cities = ["Lucknow", "Kanpur", "Agra", "Delhi", "Varanasi", "Allahabad"];
const eventTypes = ["Shaadi / Wedding", "Engagement", "Reception", "Corporate Event", "Religious Ceremony", "Other"];

const vehicleTypeLabels: Record<string, string> = {
  sedan: "Sedan", innova: "Innova Crysta", fortuner: "Fortuner", tempo: "Tempo Traveller", luxury: "Luxury SUV",
};

export default function Home() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    city: "Lucknow",
    date: "",
    cars: 2,
    eventType: "Shaadi / Wedding",
  });

  const { data: topOperators } = useOperatorSearch({ sortBy: "rating" });

  const handleSearch = () => {
    const params = new URLSearchParams({
      city: searchParams.city,
      ...(searchParams.date && { date: searchParams.date }),
      cars: String(searchParams.cars),
    });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center navy-gold-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#e8c97e] rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#0f3460] rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-6">
              <Badge className="bg-[#e8c97e]/20 text-[#e8c97e] border-[#e8c97e]/30 px-4 py-1.5 text-sm">
                <Star className="w-3.5 h-3.5 mr-1 inline" />
                #1 Wedding Fleet Booking in India
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight font-['Playfair_Display']">
                Book Your <span className="text-[#e8c97e]">Wedding Fleet</span> with Ease
              </h1>
              <p className="text-lg text-white/70 max-w-lg leading-relaxed">
                Connect with verified fleet operators across UP & North India. Book multiple cars for your wedding in one simple transaction.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {[
                  { icon: Shield, label: "Verified Operators" },
                  { icon: Clock, label: "24/7 Support" },
                  { icon: Star, label: "Best Prices" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-white/80">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#e8c97e]" />
                    </div>
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Form */}
            <Card className="glass-card shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                <h3 className="text-xl font-semibold text-[#1a1a2e] mb-6 font-['Playfair_Display']">
                  Find Your Perfect Fleet
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#6b6b6b] mb-1.5 block">City</label>
                    <Select value={searchParams.city} onValueChange={(v) => setSearchParams({ ...searchParams, city: v })}>
                      <SelectTrigger className="h-12 border-[#e8c97e]/30 focus:border-[#e8c97e]">
                        <MapPin className="w-4 h-4 text-[#e8c97e] mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-[#6b6b6b] mb-1.5 block">Event Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e8c97e] z-10" />
                      <Input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={searchParams.date}
                        onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
                        className="h-12 pl-10 border-[#e8c97e]/30 focus:border-[#e8c97e]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-[#6b6b6b] mb-1.5 block">No. of Cars</label>
                      <div className="relative">
                        <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e8c97e] z-10" />
                        <Input
                          type="number"
                          min={2}
                          max={50}
                          value={searchParams.cars}
                          onChange={(e) => setSearchParams({ ...searchParams, cars: Number(e.target.value) })}
                          className="h-12 pl-10 border-[#e8c97e]/30 focus:border-[#e8c97e]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#6b6b6b] mb-1.5 block">Event Type</label>
                      <Select value={searchParams.eventType} onValueChange={(v) => setSearchParams({ ...searchParams, eventType: v })}>
                        <SelectTrigger className="h-12 border-[#e8c97e]/30 focus:border-[#e8c97e]">
                          <Users className="w-4 h-4 text-[#e8c97e] mr-2" />
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleSearch}
                    className="w-full h-12 bg-gradient-to-r from-[#e8c97e] to-[#d4b56a] hover:from-[#d4b56a] hover:to-[#c4a55a] text-[#1a1a2e] font-semibold text-base shadow-lg mt-2"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Fleet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-[#e8c97e]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Verified Operators", value: "50+", icon: Shield },
              { label: "Cars Available", value: "500+", icon: Car },
              { label: "Happy Customers", value: "2,000+", icon: Users },
              { label: "Cities Covered", value: "15+", icon: MapPin },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-5 h-5 text-[#e8c97e]" />
                  <span className="text-2xl lg:text-3xl font-bold text-[#1a1a2e] font-['Playfair_Display']">{stat.value}</span>
                </div>
                <p className="text-sm text-[#6b6b6b]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="bg-[#1a1a2e]/10 text-[#1a1a2e] mb-4">Simple Process</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a2e] font-['Playfair_Display']">
              How It <span className="text-[#e8c97e]">Works</span>
            </h2>
            <p className="text-[#6b6b6b] mt-3 max-w-lg mx-auto">
              Book your wedding fleet in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Search Fleet", description: "Enter your city, event date, and number of cars needed. Browse verified fleet operators in your area.", icon: Search },
              { step: "02", title: "Compare & Book", description: "View operator profiles, fleet details, prices, and reviews. Select the best match for your event.", icon: Car },
              { step: "03", title: "Relax & Enjoy", description: "Your booking is confirmed! The operator handles everything. Sit back and enjoy your special day.", icon: Star },
            ].map((item) => (
              <Card key={item.step} className="hover-lift border-[#e8c97e]/20 bg-white">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-[#e8c97e]" />
                  </div>
                  <span className="text-sm font-semibold text-[#e8c97e] tracking-wider">STEP {item.step}</span>
                  <h3 className="text-xl font-semibold text-[#1a1a2e] mt-2 mb-3 font-['Playfair_Display']">{item.title}</h3>
                  <p className="text-[#6b6b6b] text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Operators */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <Badge className="bg-[#1a1a2e]/10 text-[#1a1a2e] mb-4">Top Rated</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a2e] font-['Playfair_Display']">
              Featured <span className="text-[#e8c97e]">Operators</span>
            </h2>
            <p className="text-[#6b6b6b] mt-3 max-w-lg mx-auto">
              Highest-rated fleet operators across North India
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topOperators?.slice(0, 6).map((op) => (
              <Card key={op.id} className="hover-lift border-[#e8c97e]/15 bg-white overflow-hidden group">
                <div className="h-2 bg-gradient-to-r from-[#e8c97e] to-[#d4b56a]" />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={op.avatar || `/operator-${(op.id % 3) + 1}.jpg`} 
                        alt={op.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `/operator-${(op.id % 3) + 1}.jpg`;
                        }}
                      />
                      <div>
                        <h4 className="font-semibold text-[#1a1a2e] text-sm">{op.name}</h4>
                        <p className="text-xs text-[#6b6b6b] flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {op.city}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-0">
                      <Star className="w-3 h-3 mr-0.5 fill-current" />
                      {op.rating}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[#6b6b6b] mb-4">
                    <span className="flex items-center gap-1">
                      <Car className="w-4 h-4 text-[#e8c97e]" /> {op.totalCars} cars
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-[#e8c97e]" /> {op.totalReviews} reviews
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {op.vehicleTypes?.slice(0, 4).map((type: string) => (
                      <Badge key={type} variant="outline" className="text-xs border-[#e8c97e]/30 text-[#6b6b6b]">
                        {vehicleTypeLabels[type] || type}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#6b6b6b]">From</span>
                      <p className="text-lg font-bold text-[#1a1a2e]">
                        <span className="text-[#e8c97e]">&#8377;</span>{op.avgPricePerDay?.toLocaleString("en-IN")}
                        <span className="text-xs text-[#6b6b6b] font-normal">/day</span>
                      </p>
                    </div>
                    <Link to={`/operator/${op.id}`}>
                      <Button size="sm" className="bg-[#1a1a2e] hover:bg-[#0f3460] text-white">
                        View <Car className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 navy-gold-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="bg-[#e8c97e]/20 text-[#e8c97e] border-[#e8c97e]/30 mb-4">Testimonials</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white font-['Playfair_Display']">
              What Our <span className="text-[#e8c97e]">Customers</span> Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Ankit Mishra", location: "Lucknow", rating: 5, text: "FleetBook made my sister's wedding so much easier. Booked 8 Innovas from Sharma Fleet and everything was perfect. Highly recommended!", event: "Wedding" },
              { name: "Priya Patel", location: "Kanpur", rating: 5, text: "Found the best prices here compared to local brokers. The operator was verified and professional. Will use again for sure.", event: "Reception" },
              { name: "Rohan Agarwal", location: "Agra", rating: 5, text: "Gupta Luxury Fleet made our wedding truly royal. The Mercedes cars were spotless and drivers were in uniform. 5 stars!", event: "Luxury Wedding" },
            ].map((t, i) => (
              <Card key={i} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-[#e8c97e] fill-current" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-white/50 text-xs">{t.location}</p>
                    </div>
                    <Badge className="bg-[#e8c97e]/20 text-[#e8c97e] border-0 text-xs">{t.event}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a1a2e] font-['Playfair_Display'] mb-4">
            Ready to Book Your <span className="text-[#e8c97e]">Wedding Fleet?</span>
          </h2>
          <p className="text-[#6b6b6b] mb-8 max-w-lg mx-auto">
            Join thousands of happy customers who booked their wedding fleet through FleetBook
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-[#e8c97e] to-[#d4b56a] hover:from-[#d4b56a] hover:to-[#c4a55a] text-[#1a1a2e] font-semibold text-base"
              onClick={() => navigate("/search")}>
              <Search className="w-5 h-5 mr-2" />
              Search Fleet Now
            </Button>
            <a href="tel:+919999999999">
              <Button size="lg" variant="outline" className="h-12 px-8 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white">
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
