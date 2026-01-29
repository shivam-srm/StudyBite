import { useState } from "react";
import { Coffee, Sun, Sunset, Moon } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type MealType = "breakfast" | "lunch" | "snacks" | "dinner";

const menuData: Record<string, Record<MealType, string[]>> = {
  Monday: {
    breakfast: ["Idli", "Sambar", "Coconut Chutney", "Pongal", "Tea/Coffee", "Banana"],
    lunch: ["Rice", "Dal Fry", "Aloo Gobi", "Chapati", "Curd", "Pickle", "Papad"],
    snacks: ["Samosa", "Green Chutney", "Tea"],
    dinner: ["Rice", "Rasam", "Cabbage Curry", "Chapati", "Sweet (Kesari)"],
  },
  Tuesday: {
    breakfast: ["Dosa", "Sambar", "Tomato Chutney", "Upma", "Tea/Coffee", "Apple"],
    lunch: ["Rice", "Sambar", "Potato Fry", "Chapati", "Buttermilk", "Pickle"],
    snacks: ["Biscuits", "Juice"],
    dinner: ["Rice", "Dal Tadka", "Bhindi Fry", "Chapati", "Sweet (Kheer)"],
  },
  Wednesday: {
    breakfast: ["Poori", "Potato Masala", "Chutney", "Milk", "Tea/Coffee", "Banana"],
    lunch: ["Veg Biryani", "Raita", "Mirchi Ka Salan", "Boiled Egg/Paneer"],
    snacks: ["Vada", "Sambar", "Tea"],
    dinner: ["Rice", "Rasam", "Mixed Veg", "Chapati", "Ice Cream"],
  },
  Thursday: {
    breakfast: ["Idli", "Sambar", "Peanut Chutney", "Semiya Upma", "Tea/Coffee"],
    lunch: ["Rice", "Kootu", "Brinjal Curry", "Chapati", "Curd", "Papad"],
    snacks: ["Bread Pakoda", "Sauce", "Tea"],
    dinner: ["Rice", "Dal Palak", "Gobi 65", "Chapati", "Fruit Custard"],
  },
  Friday: {
    breakfast: ["Uttapam", "Sambar", "Coconut Chutney", "Poha", "Tea/Coffee", "Orange"],
    lunch: ["Rice", "Sambar", "Beans Poriyal", "Chapati", "Buttermilk"],
    snacks: ["Puffs", "Tea"],
    dinner: ["Chicken Biryani/Veg Biryani", "Raita", "Chicken Curry/Paneer Butter Masala"],
  },
  Saturday: {
    breakfast: ["Masala Dosa", "Sambar", "Chutney", "Cornflakes with Milk", "Tea/Coffee"],
    lunch: ["Rice", "Chole", "Jeera Aloo", "Chapati", "Pickle", "Papad"],
    snacks: ["Bhel Puri", "Tea"],
    dinner: ["Rice", "Rasam", "Drumstick Curry", "Chapati", "Gulab Jamun"],
  },
  Sunday: {
    breakfast: ["Chole Bhature", "Pickle", "Lassi", "Tea/Coffee", "Banana"],
    lunch: ["Special Veg Pulao", "Paneer Tikka Masala", "Dal Makhani", "Naan", "Raita"],
    snacks: ["Cake", "Cold Drink"],
    dinner: ["Rice", "Dal Fry", "Aloo Matar", "Chapati", "Kheer"],
  },
};

const mealInfo: Record<MealType, { icon: React.ReactNode; time: string; color: string }> = {
  breakfast: { icon: <Coffee className="w-5 h-5" />, time: "7:30 - 9:00 AM", color: "bg-orange-500/10 text-orange-600 border-orange-200" },
  lunch: { icon: <Sun className="w-5 h-5" />, time: "12:30 - 2:00 PM", color: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
  snacks: { icon: <Sunset className="w-5 h-5" />, time: "4:30 - 5:30 PM", color: "bg-purple-500/10 text-purple-600 border-purple-200" },
  dinner: { icon: <Moon className="w-5 h-5" />, time: "7:30 - 9:00 PM", color: "bg-blue-500/10 text-blue-600 border-blue-200" },
};

const MessMenu = () => {
  const [activeDay, setActiveDay] = useState(() => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    return days.includes(today) ? today : "Monday";
  });

  const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <section className="py-8 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Mess Menu
        </h2>
        <p className="text-muted-foreground">
          Hostel Mess • Main Block
        </p>
      </div>

      {/* Day Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeDay === day
                ? "bg-primary text-primary-foreground shadow-card"
                : day === todayName
                ? "bg-secondary text-secondary-foreground"
                : "bg-card text-foreground hover:bg-muted"
            }`}
          >
            {day.slice(0, 3)}
            {day === todayName && activeDay !== day && (
              <span className="ml-1 text-xs">(Today)</span>
            )}
          </button>
        ))}
      </div>

      {/* Menu Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {(Object.keys(mealInfo) as MealType[]).map((meal, index) => (
          <div
            key={meal}
            className={`p-5 rounded-xl border-2 bg-card transition-all duration-200 hover:shadow-card-hover ${mealInfo[meal].color}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-background/80">
                {mealInfo[meal].icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg capitalize">{meal}</h3>
                <p className="text-sm opacity-80">{mealInfo[meal].time}</p>
              </div>
            </div>

            <ul className="space-y-2">
              {menuData[activeDay]?.[meal]?.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-6 p-4 bg-muted rounded-xl border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Menu is subject to change based on availability. 
          Special dietary requirements can be requested at the mess office.
        </p>
      </div>
    </section>
  );
};

export default MessMenu;
