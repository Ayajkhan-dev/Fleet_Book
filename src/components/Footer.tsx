import { Link } from "react-router";
import { Car, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8c97e] to-[#d4b56a] flex items-center justify-center">
                <Car className="w-5 h-5 text-[#1a1a2e]" />
              </div>
              <span className="text-xl font-bold font-['Playfair_Display'] tracking-wide">
                Fleet<span className="text-[#e8c97e]">Book</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              India&apos;s most trusted wedding fleet booking platform. Book multiple cars from verified fleet operators for your special day.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e8c97e] hover:text-[#1a1a2e] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e8c97e] hover:text-[#1a1a2e] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#e8c97e] hover:text-[#1a1a2e] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-[#e8c97e] mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {["Home", "Search Fleet", "Operator Login", "About Us", "Contact"].map((item) => (
                <li key={item}>
                  <Link to={item === "Home" ? "/" : item === "Search Fleet" ? "/search" : "/"} className="text-sm text-white/60 hover:text-[#e8c97e] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vehicle Types */}
          <div>
            <h4 className="font-semibold text-[#e8c97e] mb-4">Our Fleet</h4>
            <ul className="space-y-2.5">
              {["Toyota Innova Crysta", "Luxury Sedans", "Toyota Fortuner", "Tempo Traveller", "Luxury SUVs", "Mercedes/BMW"].map((item) => (
                <li key={item} className="text-sm text-white/60">{item}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[#e8c97e] mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 text-[#e8c97e] shrink-0" />
                <span>123 Gomti Nagar, Lucknow, Uttar Pradesh 226010</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-[#e8c97e] shrink-0" />
                <span>+91 99999 99999</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-[#e8c97e] shrink-0" />
                <span>info@fleetbook.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/60">
                <Clock className="w-4 h-4 text-[#e8c97e] shrink-0" />
                <span>24/7 Available</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} FleetBook. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <a href="#" className="hover:text-[#e8c97e] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#e8c97e] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
