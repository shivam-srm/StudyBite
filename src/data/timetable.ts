export interface TimeSlot {
  time: string;
  startTime: string;
  endTime: string;
  isBreak?: boolean;
  isOnline?: boolean;
}

export interface ClassPeriod {
  subject: string;
  room?: string;
  faculty?: string;
  type: "lecture" | "lab" | "online" | "break" | "project";
}

export type DaySchedule = Record<number, ClassPeriod | null>;
export type ClassSchedule = Record<string, DaySchedule>;

export const timeSlots: TimeSlot[] = [
  { time: "8:15 - 9:05", startTime: "08:15", endTime: "09:05" },
  { time: "9:05 - 9:55", startTime: "09:05", endTime: "09:55" },
  { time: "9:55 - 10:45", startTime: "09:55", endTime: "10:45" },
  { time: "10:45 - 11:00", startTime: "10:45", endTime: "11:00", isBreak: true },
  { time: "11:00 - 11:45", startTime: "11:00", endTime: "11:45" },
  { time: "11:45 - 12:30", startTime: "11:45", endTime: "12:30" },
  { time: "12:30 - 1:25", startTime: "12:30", endTime: "13:25", isOnline: true },
  { time: "1:25 - 2:15", startTime: "13:25", endTime: "14:15" },
  { time: "2:15 - 3:05", startTime: "14:15", endTime: "15:05" },
  { time: "3:05 - 3:20", startTime: "15:05", endTime: "15:20", isBreak: true },
  { time: "3:20 - 4:05", startTime: "15:20", endTime: "16:05" },
  { time: "4:05 - 4:50", startTime: "16:05", endTime: "16:50" },
];

export const dayOrders = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

export const classes = [
  "I BCA DS A",
  "I BCA DS B",
  "I BCA GEN AI A",
  "I BCA GEN AI B",
  "II BCA A",
  "II BCA B",
  "III BCA A",
  "III BCA B",
  "III BCA C",
  "III BCA DS A",
  "III BCA DS C",
  "I MCA A",
  "I MCA B",
  "I MCA C",
  "I MCA D",
  "I MCA E",
  "I MCA F",
  "I MCA GEN AI A",
  "I MCA GEN AI B",
  "I MCA GEN AI D",
  "I MSC ADS A",
  "I MSC ADS B",
  "I MSC ADS C",
];

export const staff = [
  "Dr. P. Arul Leena Rose",
  "Mr. Venkatasubramanian (JVS)",
  "Dr. M.R. Sudha (MRS)",
  "Dr. Sivakumar (SK)",
  "Dr. M. Pandiyan (MP)",
  "Dr. Thilagavathy (RT)",
  "Dr. D. Helen (DH)",
  "Dr. S. Arunarani (SAR)",
  "Dr. P. Chanthini (PC)",
  "Dr. S. Lakshmi (SL)",
  "Dr. R. Kiruthiga (RK)",
  "Dr. Mothilal Nehru (MN)",
  "Dr. Srividhya (SV)",
  "Dr. John Britto (JB)",
  "Dr. J. Anita Smiles (AS)",
  "Dr. Brindha (SB)",
];

// Class timetables
export const classTimetables: Record<string, ClassSchedule> = {
  "I BCA DS A": {
    "Day 1": {
      2: { subject: "DS Theory", room: "", type: "lecture", faculty: "Dr. Sivakumar" },
      3: null,
      4: { subject: "EDD Lab", room: "POLY 3", type: "lab", faculty: "Dr. John Britto" },
      5: { subject: "EDD Lab", room: "POLY 3", type: "lab", faculty: "Dr. John Britto" },
    },
    "Day 2": {
      4: { subject: "EDD Theory", room: "", type: "lecture", faculty: "Dr. John Britto" },
    },
    "Day 3": {
      0: { subject: "DS Lab", room: "POLY 3", type: "lab", faculty: "Dr. Sivakumar" },
      1: { subject: "DS Lab", room: "POLY 3", type: "lab", faculty: "Dr. Sivakumar" },
      4: { subject: "EDD Theory", room: "", type: "lecture", faculty: "Dr. John Britto" },
    },
    "Day 4": {
      2: { subject: "DS Theory", room: "", type: "lecture", faculty: "Dr. Sivakumar" },
    },
    "Day 5": {
      0: { subject: "DS Lab", room: "POLY 3", type: "lab", faculty: "Dr. Sivakumar" },
      4: { subject: "EDD Lab", room: "POLY 3", type: "lab", faculty: "Dr. John Britto" },
      5: { subject: "DS Theory", room: "", type: "lecture", faculty: "Dr. Sivakumar" },
      7: { subject: "EDD Theory", room: "", type: "lecture", faculty: "Dr. John Britto" },
    },
  },
  "III BCA A": {
    "Day 1": {
      4: { subject: "SET Lab", room: "POLY 4", type: "lab", faculty: "Dr. M.R. Sudha" },
      5: { subject: "SET Lab", room: "POLY 4", type: "lab", faculty: "Dr. M.R. Sudha" },
    },
    "Day 2": {
      7: { subject: "Project", room: "403", type: "project", faculty: "PAJ" },
      8: { subject: "Project", room: "403", type: "project", faculty: "PAJ" },
    },
    "Day 3": {
      4: { subject: "SET", room: "", type: "lecture", faculty: "Dr. M.R. Sudha" },
      5: { subject: "SET Lab", room: "POLY 2", type: "lab", faculty: "Dr. M.R. Sudha" },
      7: { subject: "Project", room: "POLY 2", type: "project", faculty: "Dr. Lakshmi" },
      8: { subject: "Project", room: "POLY 2", type: "project", faculty: "Dr. Lakshmi" },
    },
    "Day 4": {
      1: { subject: "DS Elective Theory", room: "", type: "lecture", faculty: "Dr. M.R. Sudha" },
      2: { subject: "SET", room: "", type: "lecture", faculty: "Dr. M.R. Sudha" },
    },
    "Day 5": {
      2: { subject: "SET", room: "", type: "lecture", faculty: "Dr. M.R. Sudha" },
      5: { subject: "DS Elective Theory", room: "", type: "lecture", faculty: "Dr. M.R. Sudha" },
    },
  },
  "I MCA A": {
    "Day 1": {
      4: { subject: "Python Lab", room: "908", type: "lab", faculty: "Dr. Srividhya" },
      6: { subject: "Python Theory", room: "Online", type: "online", faculty: "Dr. Srividhya" },
    },
    "Day 2": {
      4: { subject: "Python Theory", room: "", type: "lecture", faculty: "Dr. Srividhya" },
      6: { subject: "AIML Theory", room: "", type: "lecture", faculty: "Dr. Arunarani" },
    },
    "Day 3": {
      7: { subject: "AIML Lab", room: "402", type: "lab", faculty: "Dr. Arunarani" },
      8: { subject: "AIML Lab", room: "402", type: "lab", faculty: "Dr. Arunarani" },
    },
    "Day 4": {
      1: { subject: "Python Theory", room: "", type: "lecture", faculty: "Dr. Srividhya" },
      2: { subject: "Python Lab", room: "402", type: "lab", faculty: "Dr. Srividhya" },
    },
    "Day 5": {
      0: { subject: "AIML Theory", room: "", type: "lecture", faculty: "Dr. Arunarani" },
    },
  },
  "I MCA B": {
    "Day 1": {
      4: { subject: "OS Theory", room: "", type: "lecture", faculty: "Dr. M. Pandiyan" },
      5: { subject: "OS Lab", room: "908", type: "lab", faculty: "Dr. M. Pandiyan" },
    },
    "Day 2": {
      4: { subject: "OS Lab", room: "908", type: "lab", faculty: "Dr. M. Pandiyan" },
      10: { subject: "IOT Theory", room: "", type: "lecture", faculty: "Dr. P. Chanthini" },
    },
    "Day 3": {
      6: { subject: "OS Theory", room: "", type: "lecture", faculty: "Dr. M. Pandiyan" },
    },
    "Day 4": {
      1: { subject: "IOT Theory", room: "", type: "lecture", faculty: "Dr. P. Chanthini" },
      5: { subject: "IOT Lab", room: "Online", type: "online", faculty: "Dr. P. Chanthini" },
      8: { subject: "IOT Lab", room: "908", type: "lab", faculty: "Dr. P. Chanthini" },
    },
    "Day 5": {
      5: { subject: "OS Theory", room: "", type: "lecture", faculty: "Dr. M. Pandiyan" },
    },
  },
};

// Staff timetables
export const staffTimetables: Record<string, ClassSchedule> = {
  "Dr. Sivakumar (SK)": {
    "Day 1": {
      2: { subject: "I BCA DS A DS Theory", room: "", type: "lecture" },
      5: { subject: "I MCA GEN AI B Python Theory", room: "", type: "lecture" },
    },
    "Day 2": {
      0: { subject: "I MCA GEN AI B Python Theory", room: "", type: "lecture" },
      1: { subject: "I MCA GEN AI B PY Lab", room: "403", type: "lab" },
    },
    "Day 3": {
      0: { subject: "I BCA DS A DS Lab", room: "POLY 3", type: "lab" },
      1: { subject: "I BCA DS A DS Lab", room: "POLY 3", type: "lab" },
      4: { subject: "I MCA GEN AI B PY Lab", room: "403", type: "lab" },
    },
    "Day 4": {
      2: { subject: "I BCA DS A DS Theory", room: "", type: "lecture" },
      6: { subject: "I MCA GEN AI B Python Theory", room: "", type: "lecture" },
    },
    "Day 5": {
      0: { subject: "I BCA DS A DS Lab", room: "POLY 3", type: "lab" },
      5: { subject: "I BCA DS A DS Theory", room: "", type: "lecture" },
    },
  },
  "Dr. M.R. Sudha (MRS)": {
    "Day 1": {
      1: { subject: "I MCA Elective Lab", room: "POLY 2", type: "lab" },
      2: { subject: "I MCA Elective Lab", room: "POLY 2", type: "lab" },
      4: { subject: "III BCA A SET Lab", room: "POLY 4", type: "lab" },
      5: { subject: "III BCA A SET Lab", room: "POLY 4", type: "lab" },
    },
    "Day 2": {
      2: { subject: "III BCA DS Elective Lab", room: "POLY 2", type: "lab" },
    },
    "Day 3": {
      1: { subject: "I MCA Elective", room: "902", type: "lecture" },
      2: { subject: "III BCA DS Elective Lab", room: "POLY 2", type: "lab" },
      4: { subject: "III BCA A SET", room: "", type: "lecture" },
      5: { subject: "III BCA DS Elective Theory", room: "", type: "lecture" },
      6: { subject: "III BCA A SET Lab", room: "POLY 2", type: "lab" },
    },
    "Day 4": {
      1: { subject: "III BCA DS Elective Theory", room: "", type: "lecture" },
      2: { subject: "III BCA A SET", room: "", type: "lecture" },
      4: { subject: "I MCA Elective", room: "902", type: "lecture" },
    },
    "Day 5": {
      1: { subject: "I MCA Elective", room: "902", type: "lecture" },
      2: { subject: "III BCA A SET", room: "", type: "lecture" },
      5: { subject: "III BCA DS Elective Theory", room: "", type: "lecture" },
    },
  },
  "Dr. P. Arul Leena Rose": {
    "Day 1": {
      1: { subject: "III BCA B SET", room: "", type: "lecture" },
      6: { subject: "III BCA B SET Lab", room: "POLY 2", type: "lab" },
    },
    "Day 2": {
      7: { subject: "III BCA A Project", room: "403", type: "project" },
      8: { subject: "III BCA A Project", room: "403", type: "project" },
    },
    "Day 3": {
      4: { subject: "III BCA B SET", room: "", type: "lecture" },
      7: { subject: "III BCA B Project", room: "402", type: "project" },
      8: { subject: "III BCA B Project", room: "402", type: "project" },
    },
    "Day 4": {
      4: { subject: "III BCA B SET", room: "", type: "lecture" },
    },
    "Day 5": {
      0: { subject: "III BCA B SET Lab", room: "POLY 5", type: "lab" },
      1: { subject: "III BCA B SET Lab", room: "POLY 5", type: "lab" },
    },
  },
  "Mr. Venkatasubramanian (JVS)": {
    "Day 1": {
      2: { subject: "III BCA A ML", room: "", type: "lecture" },
      5: { subject: "III BCA C WC", room: "", type: "lecture" },
      6: { subject: "III BCA A ML Lab", room: "POLY 1", type: "lab" },
    },
    "Day 2": {
      4: { subject: "III BCA A ML Lab", room: "POLY 1", type: "lab" },
      5: { subject: "III BCA A ML", room: "", type: "lecture" },
    },
    "Day 3": {
      0: { subject: "III BCA C WC", room: "", type: "lecture" },
      2: { subject: "III BCA A ML", room: "", type: "lecture" },
    },
    "Day 4": {
      4: { subject: "III BCA C WC", room: "", type: "lecture" },
    },
    "Day 5": {
      0: { subject: "III BCA C WC", room: "", type: "lecture" },
      5: { subject: "III BCA A ML Lab", room: "POLY 1", type: "lab" },
    },
  },
};

export function getCurrentPeriodIndex(): number {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (let i = 0; i < timeSlots.length; i++) {
    const [startH, startM] = timeSlots[i].startTime.split(":").map(Number);
    const [endH, endM] = timeSlots[i].endTime.split(":").map(Number);
    const start = startH * 60 + startM;
    const end = endH * 60 + endM;

    if (currentMinutes >= start && currentMinutes < end) {
      return i;
    }
  }

  return -1;
}

export function getDayOrderFromDate(): string {
  // Simple mapping - in real app this would come from a calendar
  const dayOfWeek = new Date().getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return "Day 1"; // Weekend defaults to Day 1
  return `Day ${dayOfWeek}`;
}
