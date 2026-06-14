import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginLocal, registerLocal } from "@/lib/localAuth";
import { toast } from "sonner";
import { Car, User, Phone, Mail, Lock, ArrowRight, Star, Shield, CheckCircle, Eye, EyeOff } from "lucide-react";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [userType, setUserType] = useState<"customer" | "operator">("customer");
  const [showPassword, setShowPassword] = useState(false);

  // Login form
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Register form
  const [registerForm, setRegisterForm] = useState({
    name: "", email: "", phone: "", password: "", city: "Lucknow", confirmPassword: ""
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error("Please fill in all fields");
      return;
    }

    const user = loginLocal(loginForm.email, loginForm.password, userType);
    if (user) {
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === "operator") {
        navigate("/operator-dashboard");
      } else if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      // Auto-create account for any email with valid password
      if (loginForm.password.length >= 4) {
        const newUser = registerLocal({
          name: loginForm.email.split("@")[0],
          email: loginForm.email,
          phone: "",
          password: loginForm.password,
          role: userType,
        });
        if (newUser) {
          toast.success(`Account created! Welcome, ${newUser.name}!`);
          navigate(userType === "operator" ? "/operator-dashboard" : "/dashboard");
          return;
        }
      }
      toast.error("Invalid credentials. Password must be at least 4 characters.");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (registerForm.password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    const user = registerLocal({
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone,
      password: registerForm.password,
      role: userType,
      city: registerForm.city,
    });

    if (user) {
      toast.success(`Welcome, ${user.name}! Your account has been created.`);
      if (user.role === "operator") {
        navigate("/operator-dashboard");
      } else {
        navigate("/dashboard");
      }
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f6]">
      <Navbar />

      <div className="bg-[#1a1a2e] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white font-['Playfair_Display']">
            Welcome to <span className="text-[#e8c97e]">FleetBook</span>
          </h1>
          <p className="text-white/60 text-sm mt-1">Login or register to get started</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Login/Register Form */}
          <div className="lg:col-span-3">
            <Card className="border-[#e8c97e]/15 shadow-xl">
              <div className="h-1.5 bg-gradient-to-r from-[#e8c97e] to-[#d4b56a]" />
              <CardContent className="p-6">
                {/* User Type Toggle */}
                <div className="flex items-center gap-2 mb-6 p-1 bg-[#f8f8f6] rounded-lg">
                  <button
                    onClick={() => setUserType("customer")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                      userType === "customer"
                        ? "bg-[#1a1a2e] text-white shadow-sm"
                        : "text-[#6b6b6b] hover:text-[#1a1a2e]"
                    }`}
                  >
                    <User className="w-4 h-4" /> Customer
                  </button>
                  <button
                    onClick={() => setUserType("operator")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                      userType === "operator"
                        ? "bg-[#1a1a2e] text-white shadow-sm"
                        : "text-[#6b6b6b] hover:text-[#1a1a2e]"
                    }`}
                  >
                    <Car className="w-4 h-4" /> Fleet Operator
                  </button>
                </div>

                {/* Auth Mode Tabs */}
                <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as "login" | "register")}>
                  <TabsList className="w-full bg-[#f8f8f6] border border-[#e8c97e]/20 mb-6">
                    <TabsTrigger value="login" className="flex-1 data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-white">
                      <Lock className="w-3.5 h-3.5 mr-1.5" /> Login
                    </TabsTrigger>
                    <TabsTrigger value="register" className="flex-1 data-[state=active]:bg-[#1a1a2e] data-[state=active]:text-white">
                      <User className="w-3.5 h-3.5 mr-1.5" /> Register
                    </TabsTrigger>
                  </TabsList>

                  {/* LOGIN FORM */}
                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-[#6b6b6b] mb-1.5 block">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e8c97e]" />
                          <Input
                            placeholder="your@email.com"
                            value={loginForm.email}
                            onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                            className="pl-10 border-[#e8c97e]/20"
                            type="email"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-[#6b6b6b] mb-1.5 block">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e8c97e]" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Min 4 characters"
                            value={loginForm.password}
                            onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                            className="pl-10 pr-10 border-[#e8c97e]/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b6b6b] hover:text-[#1a1a2e]"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-[#1a1a2e] hover:bg-[#0f3460] text-white font-semibold h-11">
                        Login as {userType === "customer" ? "Customer" : "Operator"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-5">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-[#6b6b6b]">Or continue with</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-[#e8c97e]/30 hover:bg-[#e8c97e]/5"
                      onClick={() => { window.location.href = getOAuthUrl(); }}
                    >
                      <Star className="w-4 h-4 mr-2 text-[#e8c97e]" />
                      Login with Kimi
                    </Button>

                    {/* Demo Quick Login */}
                    <div className="mt-4 p-3 bg-[#f8f8f6] rounded-lg">
                      <p className="text-xs font-medium text-[#6b6b6b] mb-2">Quick Demo Login:</p>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => { setLoginForm({ email: "ankit@email.com", password: "demo" }); }}
                          className="text-xs px-2.5 py-1.5 bg-white border border-[#e8c97e]/30 rounded-md hover:bg-[#e8c97e]/10 transition-colors"
                        >
                          Customer
                        </button>
                        <button
                          type="button"
                          onClick={() => { setLoginForm({ email: "rajesh@sharmacars.in", password: "demo" }); setUserType("operator"); }}
                          className="text-xs px-2.5 py-1.5 bg-white border border-[#e8c97e]/30 rounded-md hover:bg-[#e8c97e]/10 transition-colors"
                        >
                          Operator
                        </button>
                        <button
                          type="button"
                          onClick={() => { setLoginForm({ email: "admin@fleetbook.in", password: "demo" }); setUserType("customer"); }}
                          className="text-xs px-2.5 py-1.5 bg-white border border-[#e8c97e]/30 rounded-md hover:bg-[#e8c97e]/10 transition-colors"
                        >
                          Admin
                        </button>
                      </div>
                    </div>
                  </TabsContent>

                  {/* REGISTER FORM */}
                  <TabsContent value="register">
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div>
                        <label className="text-xs font-medium text-[#6b6b6b] mb-1.5 block">Full Name *</label>
                        <Input
                          placeholder="Enter your full name"
                          value={registerForm.name}
                          onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
                          className="border-[#e8c97e]/20"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-[#6b6b6b] mb-1.5 block">Email *</label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e8c97e]" />
                            <Input
                              type="email"
                              placeholder="your@email.com"
                              value={registerForm.email}
                              onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                              className="pl-10 border-[#e8c97e]/20"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#6b6b6b] mb-1.5 block">Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#e8c97e]" />
                            <Input
                              placeholder="+91 98765 43210"
                              value={registerForm.phone}
                              onChange={e => setRegisterForm({ ...registerForm, phone: e.target.value })}
                              className="pl-10 border-[#e8c97e]/20"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-[#6b6b6b] mb-1.5 block">Password *</label>
                          <Input
                            type="password"
                            placeholder="Min 4 characters"
                            value={registerForm.password}
                            onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                            className="border-[#e8c97e]/20"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-[#6b6b6b] mb-1.5 block">Confirm Password *</label>
                          <Input
                            type="password"
                            placeholder="Repeat password"
                            value={registerForm.confirmPassword}
                            onChange={e => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                            className="border-[#e8c97e]/20"
                          />
                        </div>
                      </div>

                      {userType === "operator" && (
                        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-xs text-yellow-700 flex items-start gap-2">
                            <Shield className="w-4 h-4 shrink-0 mt-0.5" />
                            Your operator account will be under review. Our team will verify your documents within 24 hours.
                          </p>
                        </div>
                      )}

                      <Button type="submit" className="w-full bg-gradient-to-r from-[#e8c97e] to-[#d4b56a] hover:from-[#d4b56a] hover:to-[#c4a55a] text-[#1a1a2e] font-semibold h-11">
                        Create {userType === "customer" ? "Customer" : "Operator"} Account
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Info Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-[#1a1a2e] font-['Playfair_Display']">
                Why Choose <span className="text-[#e8c97e]">FleetBook?</span>
              </h3>
              {[
                { icon: Shield, title: "Verified Operators", desc: "All fleet operators are KYC verified with valid documents" },
                { icon: Star, title: "Best Prices", desc: "Compare prices from multiple operators and get the best deal" },
                { icon: Car, title: "Wide Fleet", desc: "From Innova to Mercedes - choose from 500+ vehicles" },
                { icon: CheckCircle, title: "Easy Booking", desc: "Book multiple cars in a single transaction" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e8c97e] to-[#d4b56a] flex items-center justify-center text-[#1a1a2e] shrink-0">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a2e]">{item.title}</h4>
                    <p className="text-sm text-[#6b6b6b]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="border-[#e8c97e]/15 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white overflow-hidden">
              <img src="/hero-wedding-fleet.jpg" alt="Wedding Fleet" className="w-full h-40 object-cover" />
              <CardContent className="p-5">
                <h4 className="font-semibold text-lg mb-2 font-['Playfair_Display']">Are you a Fleet Operator?</h4>
                <p className="text-white/70 text-sm mb-4">Register your fleet and start getting bookings for weddings and events.</p>
                <ul className="space-y-2 text-sm text-white/70 mb-4">
                  {["Get verified and build trust", "Manage bookings online", "Track your earnings"].map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#e8c97e] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => { setUserType("operator"); setAuthMode("register"); }}
                  className="bg-[#e8c97e] hover:bg-[#d4b56a] text-[#1a1a2e] font-semibold w-full"
                >
                  Register as Operator
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
