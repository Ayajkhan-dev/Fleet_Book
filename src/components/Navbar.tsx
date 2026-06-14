import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Car, Phone, LogOut, User, LayoutDashboard, Shield } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout, isAdmin, isOperator } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Search Fleet", href: "/search" },
  ];

  const getDashboardLink = () => {
    if (isAdmin) return "/admin";
    if (isOperator) return "/operator-dashboard";
    return "/dashboard";
  };

  return (
    <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isHome ? "bg-[#1a1a2e]/95 backdrop-blur-md" : "bg-[#1a1a2e] shadow-lg"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8c97e] to-[#d4b56a] flex items-center justify-center">
              <Car className="w-5 h-5 text-[#1a1a2e]" />
            </div>
            <span className="text-xl font-bold text-white font-['Playfair_Display'] tracking-wide">
              Fleet<span className="text-[#e8c97e]">Book</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-white/80 hover:text-[#e8c97e] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" className="text-sm text-[#e8c97e] hover:text-[#d4b56a] transition-colors font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Admin
              </Link>
            )}
            <a href="tel:+919999999999" className="flex items-center gap-1.5 text-sm text-[#e8c97e] hover:text-[#d4b56a] transition-colors">
              <Phone className="w-4 h-4" />
              <span>99999 99999</span>
            </a>
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link to={getDashboardLink()}>
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-[#e8c97e] hover:bg-white/10">
                    <LayoutDashboard className="w-4 h-4 mr-1.5" />
                    {user.name?.split(" ")[0] || "Dashboard"}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-white/80 hover:text-red-400 hover:bg-white/10"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-white/80 hover:text-[#e8c97e] hover:bg-white/10">
                    <User className="w-4 h-4 mr-1.5" />
                    Login
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="sm" className="bg-[#e8c97e] hover:bg-[#d4b56a] text-[#1a1a2e] font-semibold">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1a1a2e] border-t border-white/10">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} onClick={() => setIsOpen(false)}
                className="block py-2 text-white/80 hover:text-[#e8c97e] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link to="/admin" onClick={() => setIsOpen(false)}
                className="block py-2 text-[#e8c97e] hover:text-[#d4b56a] transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" /> Admin Panel
              </Link>
            )}
            <div className="pt-2 border-t border-white/10">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <Link to={getDashboardLink()} onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 py-2 text-[#e8c97e]"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    {user.name || "Dashboard"}
                  </Link>
                  <button onClick={() => { logout(); setIsOpen(false); }}
                    className="flex items-center gap-2 py-2 text-red-400"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-[#e8c97e] hover:bg-[#d4b56a] text-[#1a1a2e] font-semibold">
                    Login / Register
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
