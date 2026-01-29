export type MealType = "breakfast" | "lunch" | "snacks" | "dinner";

export interface MenuItem {
  name: string;
  isVeg: boolean;
  isSpecial?: boolean;
}

export interface DayMenu {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  snacks: MenuItem[];
  dinner: MenuItem[];
}

export const mealTimes: Record<MealType, { start: string; end: string; icon: string }> = {
  breakfast: { start: "07:30", end: "09:00", icon: "🍳" },
  lunch: { start: "12:00", end: "14:00", icon: "🍱" },
  snacks: { start: "16:30", end: "17:30", icon: "🥨" },
  dinner: { start: "19:30", end: "21:00", icon: "🍽️" },
};

const v = (name: string, isSpecial = false): MenuItem => ({ name, isVeg: true, isSpecial });
const nv = (name: string, isSpecial = false): MenuItem => ({ name, isVeg: false, isSpecial });

export const weeklyMenu: Record<string, DayMenu> = {
  Monday: {
    breakfast: [
      v("Pongal"), v("Sambar"), v("Coconut Chutney"), v("Medu Vada"),
      v("Chappathi"), v("Soya Aloo"), v("Bread"), v("Butter"), v("Jam"),
      v("Milk"), v("Coffee"), v("Tea"), nv("Boiled Egg")
    ],
    lunch: [
      v("Methi Chappathi"), v("Black Channa Masala"), v("Veg Pulao"),
      v("Steamed Rice"), v("Arachivitta Sambar"), v("Keerai Kootu"),
      v("Rasam"), v("Buttermilk"), v("Frymes"), v("Pickle")
    ],
    snacks: [
      v("Samosa / Veg Roll"), v("Milk"), v("Lemon Juice"), v("Tea"),
      v("Bread"), v("Butter"), v("Jam")
    ],
    dinner: [
      v("Idli"), v("Sambar"), v("Chutney"), v("Chappathi"), v("Tomato Dal"),
      v("Steamed Rice"), v("Rasam"), v("Idli Podi"), v("Oil"), v("Buttermilk"),
      v("Pickle"), v("Salad"), v("Milk"), v("Banana"),
      nv("Fish Gravy / Chicken Gravy", true)
    ],
  },
  Tuesday: {
    breakfast: [
      v("Veg Rava"), v("Kitchadi / Vegetable Upma"), v("Sambar"), v("Chutney"),
      v("Poori"), v("Aloo Masala"), v("Bread"), v("Butter"), v("Jam"),
      v("Milk"), v("Coffee"), v("Tea"), nv("Boiled Egg")
    ],
    lunch: [
      v("Chappathi"), v("White Peas Curry"), v("Jeera Pulao"), v("Steamed Rice"),
      v("Karakuzhambu / More Kuzhambu"), v("Beetroot Poriyal"), v("Rasam"),
      v("Buttermilk"), v("Frymes"), v("Pickle"), v("Payasam", true)
    ],
    snacks: [
      v("Panni Puri / Pav Bhaji"), v("Milk"), v("Coffee"), v("Tea"),
      v("Bread"), v("Butter"), v("Jam")
    ],
    dinner: [
      v("Kal Dosa"), v("Sambar"), v("Chutney"), v("Millet Chappathi"),
      v("Dal Pancharathan"), v("Steamed Rice"), v("Rasam"), v("Idli Podi"),
      v("Oil"), v("Buttermilk"), v("Pickle"), v("Salad"), v("Milk"), v("Banana"),
      nv("Mutton Kuzhambu", true)
    ],
  },
  Wednesday: {
    breakfast: [
      v("Idiyappam"), v("Vada Curry / Egg Stew"), v("Poha"), v("Mint Chutney"),
      v("Dal Palak"), v("Idli Podi"), v("Bread"), v("Butter"), v("Jam"),
      v("Milk"), v("Coffee"), v("Tea"), nv("Boiled Egg")
    ],
    lunch: [
      v("Chappathi"), v("Rajma Masala"), v("Variety Rice"), v("Curd Rice"),
      v("Urulai Kara Curry"), v("Steamed Rice"), v("Vegetable Kootu"),
      v("Rasam"), v("Buttermilk"), v("Appalam"), v("Pickle"),
      v("Kesari / Bondhi", true)
    ],
    snacks: [
      v("Cream Bun / Brownie / Cookies"), v("Milk"), v("Coffee"), v("Tea"),
      v("Bread"), v("Butter"), v("Jam")
    ],
    dinner: [
      v("Chappathi"), v("Paneer Butter Masala / Kadai Paneer"), v("Steamed Rice"),
      v("Sambar"), v("Channa Masala"), v("Rasam"), v("Buttermilk"), v("Pickle"),
      v("Salad"), v("Milk"), v("Banana"),
      nv("Chicken Gravy / Chicken Biryani", true), v("Ice Cream", true)
    ],
  },
  Thursday: {
    breakfast: [
      v("Idli"), v("Sambar"), v("Groundnut Chutney"), v("Chappathi"),
      v("Onion Tomato Chutney"), v("Semiya Bath"), v("Idli Podi"), v("Oil"),
      v("Bread"), v("Butter"), v("Jam"), v("Milk"), v("Coffee"), v("Tea"),
      nv("Boiled Egg"), nv("Omelette")
    ],
    lunch: [
      v("Chappathi"), v("Vegetable Sabji"), v("Ghee Rice"), v("Steamed Rice"),
      v("Vathakuzhambu"), v("Poriyal"), v("Rasam"), v("Buttermilk"),
      v("Frymes"), v("Pickle")
    ],
    snacks: [
      v("Navadhanya Sundal / Masala Sundal"), v("Milk"), v("Rose Milk / Badam Milk"),
      v("Tea"), v("Bread"), v("Butter"), v("Jam")
    ],
    dinner: [
      v("Dosa"), v("Sambar"), v("Chutney"), v("Chappathi"), v("Kadai Vegetables"),
      v("Pasta / Veg Noodles / Fried Rice"), v("Steamed Rice"), v("Rasam"),
      v("Idli Podi"), v("Oil"), v("Buttermilk"), v("Pickle"), v("Salad"),
      v("Milk"), v("Banana"), nv("Mutton Kuzhambu", true)
    ],
  },
  Friday: {
    breakfast: [
      v("Kal Dosa"), v("Sambar"), v("Groundnut Chutney"), v("Aloo Paratha"),
      v("Curd"), v("Idli Podi"), v("Oil"), v("Bread"), v("Butter"), v("Jam"),
      v("Milk"), v("Coffee"), v("Tea"), nv("Boiled Egg")
    ],
    lunch: [
      v("Chappathi"), v("Tindly Masala"), v("Peas Pulao"), v("Steamed Rice"),
      v("Sambar"), v("Keerai Kootu"), v("Rasam"), v("Curd Rice"),
      v("Buttermilk"), v("Frymes"), v("Pickle"),
      v("Gulab Jamun / Badhusha", true)
    ],
    snacks: [
      v("Bajji / Chutney / Muruku"), v("Milk"), v("Coffee"), v("Tea"),
      v("Bread"), v("Butter"), v("Jam")
    ],
    dinner: [
      v("Soup"), v("Chappathi"), v("Sambar"), v("Chutney"), v("Parotta"),
      v("Steamed Rice"), v("Veg Salna"), v("Rasam"), v("Oil"), v("Buttermilk"),
      v("Pickle"), v("Salad"), v("Milk"), v("Banana"),
      nv("Chicken Gravy", true)
    ],
  },
  Saturday: {
    breakfast: [
      v("Idli"), v("Sambar"), v("Groundnut Chutney"), v("Aloo Paratha"),
      v("Curd"), v("Idli Podi"), v("Oil"), v("Bread"), v("Butter"), v("Jam"),
      v("Milk"), v("Coffee"), v("Tea"), nv("Boiled Egg")
    ],
    lunch: [
      v("Chappathi"), v("Meal Maker Kurma"), v("Veg Biryani", true), v("Raitha"),
      v("Steamed Rice"), v("Sambar"), v("Rasam"), v("Buttermilk"),
      v("Frymes"), v("Pickle"), v("Cup Ice Cream", true)
    ],
    snacks: [
      v("Cake Variety / Rusk"), v("Milk"), v("Coffee"), v("Tea"),
      v("Bread"), v("Butter"), v("Jam")
    ],
    dinner: [
      v("Kal Dosa"), v("Sambar"), v("Chutney"), v("Steamed Rice"),
      v("Kadamba Sambar"), v("Rasam"), v("Poriyal"), v("Buttermilk"),
      v("Pickle"), v("Salad"), v("Milk"), v("Seasonal Fruits"),
      nv("Chicken Gravy", true)
    ],
  },
  Sunday: {
    breakfast: [
      v("Chole Bhature", true), v("Chenna Masala"), v("Rava Upma"),
      v("Coconut Chutney"), v("Sambar"), v("Bread"), v("Butter"), v("Jam"),
      v("Milk"), v("Coffee"), v("Tea")
    ],
    lunch: [
      v("Chappathi"), v("Paneer Gravy", true), v("Steamed Rice"), v("Sambar"),
      v("Poriyal"), v("Rasam"), v("Buttermilk"), v("Frymes"), v("Pickle")
    ],
    snacks: [
      v("Channa Sundal (White / Black)"), v("Milk"), v("Coffee"), v("Tea"),
      v("Bread"), v("Butter"), v("Jam")
    ],
    dinner: [
      v("Chappathi"), v("Mix Veg Curry"), v("Dal Kitchadi"), v("Steamed Rice"),
      v("Rasam"), v("Poriyal"), v("Buttermilk"), v("Pickle"), v("Salad"),
      v("Milk"), nv("Chicken Gravy", true)
    ],
  },
};

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function getCurrentMeal(): MealType | null {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  for (const [meal, times] of Object.entries(mealTimes)) {
    const start = timeToMinutes(times.start);
    const end = timeToMinutes(times.end);
    if (currentTime >= start && currentTime <= end) {
      return meal as MealType;
    }
  }

  return null;
}

export function getNextMeal(): MealType {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  const timeToMinutes = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const meals: MealType[] = ["breakfast", "lunch", "snacks", "dinner"];
  
  for (const meal of meals) {
    const start = timeToMinutes(mealTimes[meal].start);
    if (currentTime < start) {
      return meal;
    }
  }

  return "breakfast"; // Next day
}

export function getTodayName(): string {
  return new Date().toLocaleDateString("en-US", { weekday: "long" });
}
