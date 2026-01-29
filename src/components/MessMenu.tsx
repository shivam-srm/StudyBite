import { useState } from "react";
import { Coffee, Sun, Sunset, Moon } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type MealType = "breakfast" | "lunch" | "snacks" | "dinner";

const menuData: Record<string, Record<MealType, string[]>> = {
  Monday: {
    breakfast: [
      "Pongal", "Sambar", "Coconut Chutney", "Medu Vada", "Chappathi", 
      "Soya Aloo", "Bread", "Butter", "Jam", "Milk", "Coffee", "Tea", "Boiled Egg"
    ],
    lunch: [
      "Methi Chappathi", "Black Channa Masala", "Veg Pulao", "Steamed Rice",
      "Arachivitta Sambar", "Keerai Kootu", "Rasam", "Buttermilk", "Frymes", "Pickle"
    ],
    snacks: ["Samosa / Veg Roll", "Milk", "Lemon Juice", "Tea", "Bread", "Butter", "Jam"],
    dinner: [
      "Idli", "Sambar", "Chutney", "Chappathi", "Tomato Dal", "Steamed Rice",
      "Rasam", "Idli Podi", "Oil", "Buttermilk", "Pickle", "Salad", "Milk", "Banana",
      "Fish Gravy / Chicken Gravy (Flavored Gravy)"
    ],
  },
  Tuesday: {
    breakfast: [
      "Veg Rava", "Kitchadi / Vegetable Upma", "Sambar", "Chutney", "Poori",
      "Aloo Masala", "Bread", "Butter", "Jam", "Milk", "Coffee", "Tea", "Boiled Egg"
    ],
    lunch: [
      "Chappathi", "White Peas Curry", "Jeera Pulao", "Steamed Rice",
      "Karakuzhambu / More Kuzhambu", "Beetroot Poriyal", "Rasam", 
      "Buttermilk", "Frymes", "Pickle", "Payasam"
    ],
    snacks: ["Panni Puri / Pav Bhaji", "Milk", "Coffee", "Tea", "Bread", "Butter", "Jam"],
    dinner: [
      "Kal Dosa", "Sambar", "Chutney", "Millet Chappathi", "Dal Pancharathan",
      "Steamed Rice", "Rasam", "Idli Podi", "Oil", "Buttermilk", "Pickle", "Salad",
      "Milk", "Banana", "Mutton Kuzhambu (Flavored Gravy)"
    ],
  },
  Wednesday: {
    breakfast: [
      "Idiyappam", "Vada Curry / Egg Stew", "Poha", "Mint Chutney", "Dal Palak",
      "Idli Podi", "Bread", "Butter", "Jam", "Milk", "Coffee", "Tea", "Boiled Egg"
    ],
    lunch: [
      "Chappathi", "Rajma Masala", "Variety Rice", "Curd Rice",
      "Urulai Kara Curry", "Steamed Rice", "Vegetable Kootu", "Rasam",
      "Buttermilk", "Appalam", "Pickle", "Kesari / Bondhi"
    ],
    snacks: ["Cream Bun / Brownie / Cookies", "Milk", "Coffee", "Tea", "Bread", "Butter", "Jam"],
    dinner: [
      "Chappathi", "Paneer Butter Masala / Kadai Paneer", "Steamed Rice",
      "Sambar", "Chappathi", "Channa Masala", "Steamed Rice", "Rasam",
      "Buttermilk", "Pickle", "Salad", "Milk", "Banana",
      "Chicken Gravy / Chicken Biryani", "Ice Cream"
    ],
  },
  Thursday: {
    breakfast: [
      "Idli", "Sambar", "Groundnut Chutney", "Chappathi", "Onion Tomato Chutney",
      "Semiya Bath", "Idli Podi", "Oil", "Bread", "Butter", "Jam", "Milk", 
      "Coffee", "Tea", "Boiled Egg", "Omelette"
    ],
    lunch: [
      "Chappathi", "Vegetable Sabji", "Ghee Rice", "Steamed Rice",
      "Vathakuzhambu", "Poriyal", "Rasam", "Buttermilk", "Frymes", "Pickle"
    ],
    snacks: ["Navadhanya Sundal / Masala Sundal", "Milk", "Rose Milk / Badam Milk", "Tea", "Bread", "Butter", "Jam"],
    dinner: [
      "Dosa", "Sambar", "Chutney", "Chappathi", "Kadai Vegetables",
      "Pasta (White/Tomato) / Veg Noodles / Fried Rice", "Steamed Rice",
      "Sambar", "Rasam", "Idli Podi", "Oil", "Buttermilk", "Pickle", "Salad",
      "Milk", "Banana", "Mutton Kuzhambu (Flavored Gravy)"
    ],
  },
  Friday: {
    breakfast: [
      "Kal Dosa", "Sambar", "Groundunt Chutney", "Aloo Paratha", "Curd",
      "Idli Podi", "Oil", "Bread", "Butter", "Jam", "Milk", "Coffee", "Tea", "Boiled Egg"
    ],
    lunch: [
      "Chappathi", "Tindly Masala", "Peas Pulao", "Steamed Rice", "Sambar",
      "Keerai Kootu", "Rasam", "Curd Rice", "Buttermilk", "Frymes", "Pickle",
      "Gulab Jamun / Badhusha"
    ],
    snacks: ["Bajji, Chutney / Muruku", "Milk", "Coffee", "Tea", "Bread", "Butter", "Jam"],
    dinner: [
      "Soup", "Chappathi", "Sambar", "Chutney", "Parotta", "Steamed Rice",
      "Veg Salna", "Steamed Rice", "Rasam", "Oil", "Buttermilk", "Pickle",
      "Salad", "Milk", "Banana", "Chicken Gravy (Flavored Gravy)"
    ],
  },
  Saturday: {
    breakfast: [
      "Idli", "Sambar", "Groundunt Chutney", "Aloo Paratha", "Curd",
      "Idli Podi", "Oil", "Bread", "Butter", "Jam", "Milk", "Coffee", "Tea", "Boiled Egg"
    ],
    lunch: [
      "Chappathi", "Meal Maker Kurma", "Veg Biryani", "Raitha", "Steamed Rice",
      "Sambar", "Rasam", "Buttermilk", "Frymes", "Pickle", "Cup Ice Cream"
    ],
    snacks: ["Cake Variety / Rusk", "Milk", "Coffee", "Tea", "Bread", "Butter", "Jam"],
    dinner: [
      "Kal Dosa", "Sambar", "Chutney", "Steamed Rice", "Kadamba Sambar",
      "Rasam", "Poriyal", "Buttermilk", "Pickle", "Salad", "Milk",
      "Seasonal Fruits", "Chicken Gravy (Flavored Gravy)"
    ],
  },
  Sunday: {
    breakfast: [
      "Chole Bhature", "Chenna Masala", "Rava Upma", "Coconut Chutney", "Sambar",
      "Bread", "Butter", "Jam", "Milk", "Coffee", "Tea"
    ],
    lunch: [
      "Chappathi", "Paneer Gravy", "Steamed Rice", "Sambar", "Poriyal", "Rasam",
      "Buttermilk", "Frymes", "Pickle"
    ],
    snacks: ["Channa Sundal (White / Black)", "Milk", "Coffee", "Tea", "Bread", "Butter", "Jam"],
    dinner: [
      "Chappathi", "Mix Veg Curry", "Dal Kitchadi", "Steamed Rice",
      "Rasam", "Poriyal", "Buttermilk", "Pickle", "Salad", "Milk",
      "Chicken Gravy (Flavored Gravy)"
    ],
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
          Anand Hospitality Services • Dental & Health Science Block
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

            <ul className="space-y-1.5 max-h-48 overflow-y-auto">
              {menuData[activeDay]?.[meal]?.map((item, itemIndex) => (
                <li
                  key={itemIndex}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mt-6 space-y-2">
        <div className="p-4 bg-muted rounded-xl border border-border">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> The above menu will change subject to the non-availability of items.
          </p>
        </div>
        <div className="p-4 bg-secondary/30 rounded-xl border border-secondary">
          <p className="text-sm text-foreground">
            <strong>Special:</strong> Biryani - Every month 2nd & 4th Wednesday will be served Chicken and Veg Biryani.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MessMenu;
