import messMenuData from "./mess_menu.json";

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

// Non-veg items detection
const nonVegKeywords = [
  "egg", "chicken", "mutton", "fish", "meat", "gravy", "biryani", "omelette",
  "kebab", "kuzhambu", "flavored gravy"
];

const specialKeywords = [
  "biryani", "payasam", "paaysam", "kesari", "gulab", "ice cream", "sweet",
  "badhusha", "bondhi", "kheer", "halwa"
];

const isNonVeg = (item: string): boolean => {
  const lower = item.toLowerCase();
  return nonVegKeywords.some(keyword => lower.includes(keyword));
};

const isSpecial = (item: string): boolean => {
  const lower = item.toLowerCase();
  return specialKeywords.some(keyword => lower.includes(keyword));
};

const formatItemName = (item: string): string => {
  return item
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const processMenuItems = (items: string[]): MenuItem[] => {
  return items.map(item => ({
    name: formatItemName(item),
    isVeg: !isNonVeg(item),
    isSpecial: isSpecial(item),
  }));
};

// Process the JSON data
export const weeklyMenu: Record<string, DayMenu> = Object.fromEntries(
  Object.entries(messMenuData.menu).map(([day, meals]) => [
    day,
    {
      breakfast: processMenuItems(meals.breakfast),
      lunch: processMenuItems(meals.lunch),
      snacks: processMenuItems(meals.snacks),
      dinner: processMenuItems(meals.dinner),
    },
  ])
);

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const menuNotes = messMenuData.notes;
export const hostelName = messMenuData.hostel;
export const validFrom = messMenuData.valid_from;

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
