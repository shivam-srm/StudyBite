import { useState } from "react";
import { weeklyMenu, days, mealTimes, MealType, getTodayName, hostelName, menuNotes } from "@/data/messMenu";
import { ChevronLeft, ChevronRight, Leaf, Drumstick, Sparkles, Clock, UtensilsCrossed } from "lucide-react";

type FilterType = "all" | "veg" | "nonveg" | "special";

const MessPage = () => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedDay, setSelectedDay] = useState(getTodayName());
  const today = getTodayName();

  const meals: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];

  const currentDayIndex = days.indexOf(selectedDay);

  const goToPrevDay = () => {
    const newIndex = currentDayIndex === 0 ? days.length - 1 : currentDayIndex - 1;
    setSelectedDay(days[newIndex]);
  };

  const goToNextDay = () => {
    const newIndex = currentDayIndex === days.length - 1 ? 0 : currentDayIndex + 1;
    setSelectedDay(days[newIndex]);
  };

  const filterItems = (items: { name: string; isVeg: boolean; isSpecial?: boolean }[]) => {
    switch (filter) {
      case "veg":
        return items.filter((item) => item.isVeg);
      case "nonveg":
        return items.filter((item) => !item.isVeg);
      case "special":
        return items.filter((item) => item.isSpecial);
      default:
        return items;
    }
  };

  const getMealGradient = (meal: string) => {
    switch (meal) {
      case "breakfast": return "from-orange-500/20 via-orange-500/10 to-transparent";
      case "lunch": return "from-yellow-500/20 via-yellow-500/10 to-transparent";
      case "snacks": return "from-purple-500/20 via-purple-500/10 to-transparent";
      case "dinner": return "from-blue-500/20 via-blue-500/10 to-transparent";
      default: return "from-primary/20 to-transparent";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat">
      <div className="container mx-auto px-2 xs:px-3 sm:px-4 py-3 sm:py-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-8 animate-fade-in-up">
          <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
            <span className="inline-block px-3 xs:px-4 sm:px-6 py-1.5 sm:py-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl sm:rounded-2xl border border-primary/30 shadow-lg shadow-primary/10 animate-glow">
              <span className="text-primary font-bold">Mess Menu</span>
            </span>
          </h1>
          <p className="text-xs sm:text-base text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            {hostelName}
          </p>
        </div>

        {/* Day Navigation */}
        <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-4 mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: "150ms" }}>
          <button
            onClick={goToPrevDay}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-card border border-border hover:bg-muted hover:border-primary/50 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="flex-1 max-w-md overflow-x-auto scrollbar-hide">
            <div className="flex gap-1 xs:gap-1.5 sm:gap-2 justify-center p-0.5 sm:p-1 bg-card/50 backdrop-blur-sm rounded-lg sm:rounded-xl border border-border/50">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-2 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-[10px] xs:text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedDay === day
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                      : day === today
                      ? "bg-primary/20 text-primary hover:bg-primary/30"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {day.slice(0, 3)}
                  {day === today && selectedDay !== day && (
                    <span className="ml-0.5 sm:ml-1 inline-block w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-primary animate-pulse-soft" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={goToNextDay}
            className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-card border border-border hover:bg-muted hover:border-primary/50 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex justify-center flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
          {[
            { key: "all", label: "All", icon: null, activeClass: "bg-primary text-primary-foreground" },
            { key: "veg", label: "Veg", icon: <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, activeClass: "bg-green-500 text-white" },
            { key: "nonveg", label: "Non-Veg", icon: <Drumstick className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, activeClass: "bg-red-500 text-white" },
            { key: "special", label: "Special", icon: <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, activeClass: "bg-amber-500 text-white" },
          ].map(({ key, label, icon, activeClass }) => (
            <button
              key={key}
              onClick={() => setFilter(key as FilterType)}
              className={`px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] xs:text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-1.5 transition-all duration-300 tag-animate ${
                filter === key
                  ? `${activeClass} shadow-lg`
                  : "bg-card text-foreground hover:bg-muted border border-border hover:border-primary/50"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Selected Day Header */}
        <div className="text-center mb-4 sm:mb-6 animate-fade-in" style={{ animationDelay: "250ms" }}>
          <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-foreground flex items-center justify-center gap-2">
            {selectedDay === today && (
              <span className="px-1.5 sm:px-2 py-0.5 bg-primary/20 text-primary text-[10px] sm:text-xs rounded-full animate-pulse-soft">
                Today
              </span>
            )}
            {selectedDay}
          </h2>
        </div>

        {/* Meal Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-6 stagger-children">
          {meals.map((meal) => {
            const items = filterItems(weeklyMenu[selectedDay]?.[meal] || []);
            const info = mealTimes[meal];

            return (
              <div
                key={meal}
                className="bg-card rounded-xl sm:rounded-2xl border border-border overflow-hidden card-hover group"
              >
                <div
                  className={`p-3 sm:p-4 border-b border-border bg-gradient-to-r ${getMealGradient(meal)}`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-2xl sm:text-4xl group-hover:animate-bounce-soft transition-transform">
                      {info.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-lg text-foreground capitalize truncate">
                        {meal}
                      </h3>
                      <p className="text-[10px] sm:text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                        <span className="truncate">{info.start} - {info.end}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-2.5 sm:p-4">
                  {items.length > 0 ? (
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {items.map((item, idx) => (
                        <span
                          key={idx}
                          className={`px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-sm rounded-full border transition-all duration-200 tag-animate ${
                            item.isSpecial
                              ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 font-medium shadow-sm"
                              : item.isVeg
                              ? "bg-muted border-border text-foreground hover:border-green-500/50"
                              : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {!item.isVeg && <span className="mr-0.5">🍗</span>}
                          {item.isSpecial && <span className="mr-0.5">⭐</span>}
                          {item.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-xs sm:text-sm text-center py-4 sm:py-6 flex flex-col items-center gap-1 sm:gap-2">
                      <UtensilsCrossed className="w-6 h-6 sm:w-8 sm:h-8 opacity-50" />
                      <p>No items match filter</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes */}
        <div className="mt-6 sm:mt-8 space-y-3 animate-fade-in" style={{ animationDelay: "400ms" }}>
          {menuNotes.map((note, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl text-xs sm:text-sm transition-all duration-200 hover:scale-[1.01] ${
                idx === 0 
                  ? "bg-card/80 backdrop-blur-sm text-muted-foreground font-medium border border-border" 
                  : "bg-primary/10 text-foreground border border-primary/20"
              }`}
            >
              {idx === 1 && <Sparkles className="w-4 h-4 inline-block mr-2 text-primary" />}
              {note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessPage;
