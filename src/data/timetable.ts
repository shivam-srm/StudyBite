import timetableData from "./pg_timetable.json";

export interface TimeSlot {
  slot: string;
  time: string;
  isBreak?: boolean;
  isLunch?: boolean;
}

export interface PeriodData {
  slot: string;
  subject: string;
  code?: string;
  type: string;
  room?: string;
}

export interface ClassInfo {
  program: string;
  class_name: string;
  room: string;
  timetable: Record<string, PeriodData[]>;
}

// Export time slots from JSON
export const timeSlots: TimeSlot[] = timetableData.time_slots.map(slot => ({
  slot: slot.slot,
  time: slot.time,
  isBreak: slot.slot === "BREAK",
  isLunch: slot.slot === "LUNCH",
}));

export const dayOrders = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

// Extract class names
export const classes: string[] = Object.values(timetableData.classes).map(
  (cls) => (cls as ClassInfo).class_name
);

// Create a map for quick lookup
const classDataMap: Record<string, ClassInfo> = {};
Object.entries(timetableData.classes).forEach(([key, value]) => {
  const classInfo = value as ClassInfo;
  classDataMap[classInfo.class_name] = classInfo;
});

export { classDataMap };

// Metadata
export const metadata = timetableData.metadata;

export function getClassTimetable(className: string): Record<string, PeriodData[]> | null {
  const classInfo = classDataMap[className];
  return classInfo ? classInfo.timetable : null;
}

export function getClassRoom(className: string): string {
  const classInfo = classDataMap[className];
  return classInfo ? classInfo.room : "";
}

export function getCurrentPeriodIndex(): number {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const parseTime = (timeStr: string): { start: number; end: number } => {
    const [startStr, endStr] = timeStr.split(" - ");
    const parseTimeStr = (t: string): number => {
      const match = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
      if (!match) return 0;
      let hours = parseInt(match[1]);
      const minutes = parseInt(match[2]);
      const period = match[3].toUpperCase();
      if (period === "PM" && hours !== 12) hours += 12;
      if (period === "AM" && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };
    return { start: parseTimeStr(startStr), end: parseTimeStr(endStr) };
  };

  for (let i = 0; i < timeSlots.length; i++) {
    const { start, end } = parseTime(timeSlots[i].time);
    if (currentMinutes >= start && currentMinutes < end) {
      return i;
    }
  }

  return -1;
}

export function getDayOrderFromDate(): string {
  const dayOfWeek = new Date().getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return "Day 1";
  return `Day ${dayOfWeek}`;
}

export function getPeriodTypeStyle(type: string): string {
  switch (type) {
    case "lab":
      return "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400";
    case "online":
      return "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400";
    case "library":
      return "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400";
    case "break":
      return "bg-muted/50 text-muted-foreground";
    case "free":
      return "bg-transparent text-muted-foreground";
    default:
      return "bg-primary/10 border-primary/30 text-primary";
  }
}
