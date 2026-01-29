import { Link, useLocation } from "react-router-dom";
import { UtensilsCrossed, Calendar, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/mess" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="font-semibold text-foreground">Mess & Timetable</h1>
            <p className="text-xs text-muted-foreground">SRM University</p>
          </div>
        </Link>

        <div className="flex items-center gap-1">
          <Link
            to="/mess"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive("/mess") || isActive("/")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span className="hidden sm:inline">Mess</span>
          </Link>

          <Link
            to="/timetable"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive("/timetable")
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Classes</span>
          </Link>

          <button
            onClick={() => setIsDark(!isDark)}
            className="ml-2 p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
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
