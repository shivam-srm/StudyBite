import { weeklyMenu, mealTimes, getNextMeal, getTodayName, MealType } from "@/data/messMenu";
import { Clock } from "lucide-react";

const TodayMess = () => {
  const today = getTodayName();
  const nextMeal = getNextMeal();
  const todayMenu = weeklyMenu[today];

  if (!todayMenu) return null;

  const meals: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Today's Mess</h2>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
          <div className="flex items-center gap-2 text-primary">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">
              Next: {nextMeal.charAt(0).toUpperCase() + nextMeal.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {meals.map((meal) => {
          const items = todayMenu[meal];
          const info = mealTimes[meal];
          const isNext = meal === nextMeal;

          return (
            <div
              key={meal}
              className={`p-4 transition-colors ${isNext ? "bg-primary/5" : ""}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{info.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-foreground capitalize">{meal}</h3>
                    <span className="text-xs text-muted-foreground">
                      {info.start} - {info.end}
                    </span>
                    {isNext && (
                      <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full animate-pulse-soft">
                        Next
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {items.slice(0, 8).map((item, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 text-xs rounded-full border ${
                          item.isSpecial
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : item.isVeg
                            ? "bg-muted border-border text-foreground"
                            : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.name}
                      </span>
                    ))}
                    {items.length > 8 && (
                      <span className="px-2 py-1 text-xs text-muted-foreground">
                        +{items.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayMess;
