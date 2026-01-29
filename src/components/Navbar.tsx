import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, Calendar, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-xl bg-background/80 border-b border-border shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/mess" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center shadow-lg group-hover:shadow-primary/25 transition-all duration-300 group-hover:scale-105 overflow-hidden">
            <img src={logo} alt="Logo" className="w-10 h-10 object-cover" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              Timetable & Mess
            </h1>
            <p className="text-xs text-muted-foreground">SRM University</p>
          </div>
        </Link>

        <div className="flex items-center gap-1 bg-card/50 backdrop-blur-sm p-1 rounded-full border border-border/50">
          <Link
            to="/timetable"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive("/timetable")
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
            }`}
          >
            <Calendar className={`w-4 h-4 ${isActive("/timetable") ? "animate-bounce-soft" : ""}`} />
            <span className="hidden sm:inline">Classes</span>
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
            <span className="hidden sm:inline">Mess</span>
          </Link>

          <button
            onClick={() => setIsDark(!isDark)}
            className="ml-1 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-all duration-300 hover:rotate-180"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
