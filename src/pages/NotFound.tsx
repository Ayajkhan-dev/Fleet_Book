import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center">
          <span className="text-4xl font-bold text-[#e8c97e] font-['Playfair_Display']">404</span>
        </div>
        <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2 font-['Playfair_Display']">Page Not Found</h1>
        <p className="text-[#6b6b6b] mb-8">
          Oops! The page you are looking for seems to have driven away. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/">
            <Button className="bg-[#1a1a2e] hover:bg-[#0f3460] text-white">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/search">
            <Button variant="outline" className="border-[#e8c97e] text-[#1a1a2e] hover:bg-[#e8c97e]/10">
              <Search className="w-4 h-4 mr-2" />
              Search Fleet
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
