import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, Calendar, Moon, Sun, Menu, X, CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return true;
    }
    return true;
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "backdrop-blur-xl bg-background/90 border-b border-border shadow-sm" 
          : "bg-background/50 backdrop-blur-sm"
      }`}
    >
      {/* Announcement Banner */}
      <div className="bg-gradient-to-r from-primary via-primary/90 to-primary overflow-hidden">
        <div className="animate-marquee whitespace-nowrap py-1.5 text-xs sm:text-sm font-medium text-primary-foreground">
          <span className="mx-4">🎓 New! Academic Calendar 2025-2026 is now available!</span>
          <span className="mx-4">📅 Check important dates, holidays & semester schedules</span>
          <span className="mx-4">🎓 New! Academic Calendar 2025-2026 is now available!</span>
          <span className="mx-4">📅 Check important dates, holidays & semester schedules</span>
        </div>
      </div>
      <nav className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/mess" className="flex items-center gap-2 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105 overflow-hidden">
            <img src={logo} alt="Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-cover" />
          </div>
          <div className="hidden xs:block">
            <h1 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
              Timetable & Mess
            </h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground">SRM University</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-1 bg-card/50 backdrop-blur-sm p-1 rounded-full border border-border/50">
          <Link
            to="/timetable"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive("/timetable")
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            <Calendar className={`w-4 h-4 ${isActive("/timetable") ? "animate-bounce-soft" : ""}`} />
            <span>Classes</span>
          </Link>

          <Link
            to="/mess"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive("/mess") || isActive("/")
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            <UtensilsCrossed className={`w-4 h-4 ${isActive("/mess") || isActive("/") ? "animate-bounce-soft" : ""}`} />
            <span>Mess</span>
          </Link>

          <Link
            to="/calendar"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive("/calendar")
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            <CalendarDays className={`w-4 h-4 ${isActive("/calendar") ? "animate-bounce-soft" : ""}`} />
            <span>Calendar</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="ml-1 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-300 active:scale-95"
            aria-label="Toggle theme"
            type="button"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-300 active:scale-95"
            aria-label="Toggle theme"
            type="button"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-blue-500" />
            )}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-foreground hover:bg-muted/80 transition-all duration-300 active:scale-95"
            aria-label="Toggle menu"
            type="button"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-background/95 backdrop-blur-xl animate-fade-in">
          <div className="container mx-auto px-3 py-3 space-y-2">
            <Link
              to="/timetable"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive("/timetable")
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-foreground hover:bg-muted border border-border"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Classes</span>
            </Link>

            <Link
              to="/mess"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive("/mess") || isActive("/")
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-foreground hover:bg-muted border border-border"
              }`}
            >
              <UtensilsCrossed className="w-5 h-5" />
              <span>Mess Menu</span>
            </Link>

            <Link
              to="/calendar"
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                isActive("/calendar")
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-foreground hover:bg-muted border border-border"
              }`}
            >
              <CalendarDays className="w-5 h-5" />
              <span>Academic Calendar</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
