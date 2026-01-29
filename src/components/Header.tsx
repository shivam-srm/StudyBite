import { GraduationCap, Calendar, UtensilsCrossed } from "lucide-react";

interface HeaderProps {
  activeSection: "timetable" | "menu";
  onSectionChange: (section: "timetable" | "menu") => void;
}

const Header = ({ activeSection, onSectionChange }: HeaderProps) => {
  return (
    <header className="bg-hero-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-secondary p-2 rounded-lg">
              <GraduationCap className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold">
                SRM University
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Student Portal
              </p>
            </div>
          </div>

          <nav className="flex gap-2">
            <button
              onClick={() => onSectionChange("timetable")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeSection === "timetable"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary-foreground/10 hover:bg-primary-foreground/20"
              }`}
            >
              <Calendar className="w-4 h-4" />
              Timetable
            </button>
            <button
              onClick={() => onSectionChange("menu")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeSection === "menu"
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-primary-foreground/10 hover:bg-primary-foreground/20"
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" />
              Mess Menu
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
