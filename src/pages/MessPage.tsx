import { useState } from "react";
import { weeklyMenu, days, mealTimes, MealType, getTodayName, hostelName, menuNotes } from "@/data/messMenu";
import { ChevronLeft, ChevronRight, Leaf, Drumstick, Sparkles } from "lucide-react";

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

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Mess Menu
          </h1>
          <p className="text-muted-foreground">{hostelName}</p>
        </div>

        {/* Day Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={goToPrevDay}
            className="p-2 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex-1 max-w-md overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedDay === day
                      ? "bg-primary text-primary-foreground"
                      : day === today
                      ? "bg-primary/20 text-primary"
                      : "bg-card text-foreground hover:bg-muted border border-border"
                  }`}
                >
                  {day.slice(0, 3)}
                  {day === today && selectedDay !== day && (
                    <span className="ml-1 text-xs opacity-70">•</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={goToNextDay}
            className="p-2 rounded-xl bg-card border border-border hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("veg")}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
              filter === "veg"
                ? "bg-green-500 text-white"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            <Leaf className="w-3.5 h-3.5" />
            Veg
          </button>
          <button
            onClick={() => setFilter("nonveg")}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
              filter === "nonveg"
                ? "bg-red-500 text-white"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            <Drumstick className="w-3.5 h-3.5" />
            Non-Veg
          </button>
          <button
            onClick={() => setFilter("special")}
            className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
              filter === "special"
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground hover:bg-muted border border-border"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Special
          </button>
        </div>

        {/* Selected Day Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-foreground">
            {selectedDay === today ? `Today: ${selectedDay}` : selectedDay}
          </h2>
        </div>

        {/* Meal Cards */}
        <div className="grid md:grid-cols-2 gap-6 stagger-children">
          {meals.map((meal) => {
            const items = filterItems(weeklyMenu[selectedDay]?.[meal] || []);
            const info = mealTimes[meal];

            return (
              <div
                key={meal}
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className={`p-4 border-b border-border ${
                    meal === "breakfast"
                      ? "bg-orange-500/10"
                      : meal === "lunch"
                      ? "bg-yellow-500/10"
                      : meal === "snacks"
                      ? "bg-purple-500/10"
                      : "bg-blue-500/10"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{info.icon}</span>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground capitalize">
                        {meal}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {info.start} - {info.end}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  {items.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                            item.isSpecial
                              ? "bg-primary/10 border-primary/30 text-primary font-medium"
                              : item.isVeg
                              ? "bg-muted border-border text-foreground"
                              : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                          }`}
                        >
                          {!item.isVeg && "🍗 "}
                          {item.isSpecial && "⭐ "}
                          {item.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      No items match the selected filter
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes */}
        <div className="mt-8 space-y-3">
          {menuNotes.map((note, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl text-sm ${
                idx === 0 
                  ? "bg-muted/50 text-muted-foreground font-medium" 
                  : "bg-primary/10 text-foreground"
              }`}
            >
              {note}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessPage;
