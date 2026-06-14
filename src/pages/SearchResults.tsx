import { useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useOperatorSearch } from "@/hooks/useFleetData";
import { Search, MapPin, Car, Star, Users, ChevronRight, Filter, ArrowUpDown, Loader2 } from "lucide-react";

const vehicleTypes = ["all", "sedan", "innova", "fortuner", "tempo", "luxury"];
const vehicleTypeLabels: Record<string, string> = {
  sedan: "Sedan", innova: "Innova Crysta", fortuner: "Fortuner", tempo: "Tempo Traveller", luxury: "Luxury SUV",
};

export default function SearchResults() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "all";
  const initialCars = Number(searchParams.get("cars")) || 2;
  const initialType = searchParams.get("type") || "all";

  const [filters, setFilters] = useState({
    city: initialCity,
    cars: initialCars,
    type: initialType,
    sortBy: "rating" as "rating" | "price_asc" | "price_desc" | "fleet_size",
  });
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const { data: operators, isLoading } = useOperatorSearch({
    city: filters.city === "all" ? undefined : filters.city,
    cars: filters.cars,
    type: filters.type === "all" ? undefined : filters.type,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sortBy: filters.sortBy,
  });

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Navbar />

      {/* Header */}
      <div className="bg-[#1a1a2e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white font-['Playfair_Display']">
                Search <span className="text-[#e8c97e]">Results</span>
              </h1>
              <p className="text-white/60 text-sm mt-1">
                {operators?.length || 0} fleet operators found
                {filters.city !== "all" && ` in ${filters.city}`}
              </p>
            </div>
            <Link to="/">
              <Button variant="outline" className="border-[#e8c97e]/30 text-[#e8c97e] hover:bg-[#e8c97e]/10">
                <Search className="w-4 h-4 mr-2" />
                New Search
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-72 shrink-0">
            <Card className="sticky top-24 border-[#e8c97e]/15">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-5">
                  <Filter className="w-5 h-5 text-[#e8c97e]" />
                  <h3 className="font-semibold text-[#1a1a2e]">Filters</h3>
                </div>

                <div className="space-y-5">
                  {/* City Filter */}
                  <div>
                    <label className="text-sm font-medium text-[#6b6b6b] mb-2 block">City</label>
                    <Select value={filters.city} onValueChange={(v) => setFilters({ ...filters, city: v })}>
                      <SelectTrigger className="border-[#e8c97e]/20">
                        <MapPin className="w-4 h-4 text-[#e8c97e] mr-1" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Cities</SelectItem>
                        {["Lucknow", "Kanpur", "Agra", "Delhi", "Varanasi", "Allahabad"].map((c) => (
                          <SelectItem key={c} value={c}>{c}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Vehicle Type */}
                  <div>
                    <label className="text-sm font-medium text-[#6b6b6b] mb-2 block">Vehicle Type</label>
                    <div className="flex flex-wrap gap-2">
                      {vehicleTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => setFilters({ ...filters, type })}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                            filters.type === type
                              ? "bg-[#1a1a2e] text-white"
                              : "bg-[#f8f8f6] text-[#6b6b6b] hover:bg-[#e8c97e]/20"
                          }`}
                        >
                          {type === "all" ? "All" : vehicleTypeLabels[type]}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium text-[#6b6b6b] mb-2 block">
                      Price Range: &#8377;{priceRange[0].toLocaleString()} - &#8377;{priceRange[1].toLocaleString()}
                    </label>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={50000} step={500} className="mt-2" />
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="text-sm font-medium text-[#6b6b6b] mb-2 block">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(v) => setFilters({ ...filters, sortBy: v as typeof filters.sortBy })}>
                      <SelectTrigger className="border-[#e8c97e]/20">
                        <ArrowUpDown className="w-4 h-4 text-[#e8c97e] mr-1" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Top Rated</SelectItem>
                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                        <SelectItem value="fleet_size">Most Cars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Cars Needed */}
                  <div>
                    <label className="text-sm font-medium text-[#6b6b6b] mb-2 block">Min Cars Needed: {filters.cars}</label>
                    <Slider value={[filters.cars]} onValueChange={([v]) => setFilters({ ...filters, cars: v })} min={1} max={20} step={1} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-[#e8c97e]" />
                <span className="ml-3 text-[#6b6b6b]">Loading operators...</span>
              </div>
            ) : operators?.length === 0 ? (
              <Card className="border-[#e8c97e]/15">
                <CardContent className="p-12 text-center">
                  <Car className="w-16 h-16 mx-auto text-[#e8c97e]/40 mb-4" />
                  <h3 className="text-xl font-semibold text-[#1a1a2e] mb-2 font-['Playfair_Display']">No Fleet Found</h3>
                  <p className="text-[#6b6b6b] mb-4">Try adjusting your filters or search in a different city.</p>
                  <Button onClick={() => { setFilters({ city: "all", cars: 2, type: "all", sortBy: "rating" }); setPriceRange([0, 50000]); }}
                    variant="outline" className="border-[#e8c97e]">
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {operators?.map((op) => (
                  <Card key={op.id} className="hover-lift border-[#e8c97e]/15 bg-white overflow-hidden">
                    <CardContent className="p-5 lg:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start gap-5">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center text-white font-bold text-xl shrink-0">
                            {op.name?.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-lg font-semibold text-[#1a1a2e] font-['Playfair_Display']">{op.name}</h3>
                              <Badge className="bg-green-100 text-green-700 border-0">
                                <Star className="w-3 h-3 mr-0.5 fill-current" />
                                {op.rating}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-[#6b6b6b] mb-2">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-[#e8c97e]" /> {op.city}
                              </span>
                              <span className="flex items-center gap-1">
                                <Car className="w-3.5 h-3.5 text-[#e8c97e]" /> {op.totalCars} cars
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-[#e8c97e]" /> {op.totalReviews} reviews
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {op.vehicleTypes?.map((type: string) => (
                                <Badge key={type} variant="outline" className="text-xs border-[#e8c97e]/30 text-[#6b6b6b]">
                                  {vehicleTypeLabels[type] || type}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center lg:flex-col lg:items-end gap-4 lg:gap-2 lg:min-w-[140px]">
                          <div className="text-right">
                            <p className="text-xs text-[#6b6b6b]">Avg. per car/day</p>
                            <p className="text-xl font-bold text-[#1a1a2e]">
                              <span className="text-[#e8c97e]">&#8377;</span>{op.avgPricePerDay?.toLocaleString("en-IN")}
                            </p>
                          </div>
                          <Button onClick={() => navigate(`/operator/${op.id}`)} className="bg-[#1a1a2e] hover:bg-[#0f3460] text-white">
                            View & Book
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
