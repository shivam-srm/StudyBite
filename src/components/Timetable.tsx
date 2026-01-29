import { useState } from "react";
import { Clock, MapPin, ChevronDown } from "lucide-react";

const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

// Sample classes from the Excel - users can select their class
const classes = [
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

// Time slots for the timetable
const timeSlots = [
  "8:15 - 9:05",
  "9:05 - 9:55",
  "9:55 - 10:45",
  "10:45 - 11:00",
  "11:00 - 11:45",
  "11:45 - 12:30",
  "12:30 - 1:25",
  "1:25 - 2:15",
  "2:15 - 3:05",
  "3:05 - 3:20",
  "3:20 - 4:05",
  "4:05 - 4:50",
];

// Sample timetable data based on Excel - I BCA DS A
const timetableData: Record<string, Record<string, Array<{
  time: string;
  subject: string;
  faculty: string;
  room: string;
  type: "lecture" | "lab" | "tutorial" | "break" | "online";
}>>> = {
  "I BCA DS A": {
    "Day 1": [
      { time: "9:55 - 10:45", subject: "Data Structures Theory", faculty: "Dr. Sivakumar", room: "Theory", type: "lecture" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 12:30", subject: "EDD Lab", faculty: "Dr. John Britto", room: "POLY 3", type: "lab" },
    ],
    "Day 2": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 11:45", subject: "EDD Theory", faculty: "Dr. John Britto", room: "Theory", type: "lecture" },
    ],
    "Day 3": [
      { time: "8:15 - 9:55", subject: "DS Lab", faculty: "Dr. Sivakumar", room: "POLY 3", type: "lab" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 11:45", subject: "EDD Theory", faculty: "Dr. John Britto", room: "Theory", type: "lecture" },
    ],
    "Day 4": [
      { time: "9:55 - 10:45", subject: "Data Structures Theory", faculty: "Dr. Sivakumar", room: "Theory", type: "lecture" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
    ],
    "Day 5": [
      { time: "8:15 - 9:05", subject: "DS Lab", faculty: "Dr. Sivakumar", room: "POLY 3", type: "lab" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 11:45", subject: "EDD Lab", faculty: "Dr. John Britto", room: "POLY 3", type: "lab" },
      { time: "11:45 - 12:30", subject: "DS Theory", faculty: "Dr. Sivakumar", room: "Theory", type: "lecture" },
      { time: "1:25 - 2:15", subject: "EDD Theory", faculty: "Dr. John Britto", room: "Theory", type: "lecture" },
    ],
  },
  "I BCA GEN AI A": {
    "Day 1": [
      { time: "9:05 - 9:55", subject: "EAI", faculty: "Dr. Thilagavathy", room: "Theory", type: "lecture" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:45 - 12:30", subject: "DS Theory", faculty: "Dr. Kiruthiga", room: "Theory", type: "lecture" },
    ],
    "Day 2": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
    ],
    "Day 3": [
      { time: "8:15 - 9:05", subject: "DS Theory", faculty: "Dr. Kiruthiga", room: "Theory", type: "lecture" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 11:45", subject: "DS Lab", faculty: "Dr. Kiruthiga", room: "POLY 3", type: "lab" },
    ],
    "Day 4": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:45 - 12:30", subject: "DS Lab", faculty: "Dr. Kiruthiga", room: "POLY 3", type: "lab" },
    ],
    "Day 5": [
      { time: "9:05 - 9:55", subject: "DS Lab", faculty: "Dr. Kiruthiga", room: "POLY 3", type: "lab" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 11:45", subject: "DS Theory", faculty: "Dr. Kiruthiga", room: "Theory", type: "lecture" },
      { time: "11:45 - 12:30", subject: "DS Theory", faculty: "Dr. Kiruthiga", room: "Theory", type: "lecture" },
    ],
  },
  "III BCA A": {
    "Day 1": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 12:30", subject: "SET Lab", faculty: "Dr. M.R. Sudha", room: "POLY 4", type: "lab" },
    ],
    "Day 2": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "1:25 - 3:05", subject: "Project Work", faculty: "PAJ", room: "403", type: "lab" },
    ],
    "Day 3": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 11:45", subject: "SET", faculty: "Dr. M.R. Sudha", room: "Theory", type: "lecture" },
      { time: "11:45 - 12:30", subject: "SET Lab", faculty: "Dr. M.R. Sudha", room: "POLY 2", type: "lab" },
      { time: "1:25 - 3:05", subject: "Project Work", faculty: "Dr. Lakshmi", room: "POLY 2", type: "lab" },
    ],
    "Day 4": [
      { time: "9:05 - 9:55", subject: "DS Elective Theory", faculty: "Dr. M.R. Sudha", room: "Theory", type: "lecture" },
      { time: "9:55 - 10:45", subject: "SET", faculty: "Dr. M.R. Sudha", room: "Theory", type: "lecture" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
    ],
    "Day 5": [
      { time: "9:55 - 10:45", subject: "SET", faculty: "Dr. M.R. Sudha", room: "Theory", type: "lecture" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:45 - 12:30", subject: "DS Elective Theory", faculty: "Dr. M.R. Sudha", room: "Theory", type: "lecture" },
    ],
  },
  "I MCA A": {
    "Day 1": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 11:45", subject: "Python Lab", faculty: "Dr. Srividhya", room: "908", type: "lab" },
      { time: "12:30 - 1:25", subject: "Python Theory", faculty: "Dr. Srividhya", room: "Online", type: "online" },
    ],
    "Day 2": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "11:00 - 11:45", subject: "Python Theory", faculty: "Dr. Srividhya", room: "Theory", type: "lecture" },
      { time: "12:30 - 1:25", subject: "AIML Theory", faculty: "Dr. Arunarani", room: "Theory", type: "lecture" },
    ],
    "Day 3": [
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
      { time: "1:25 - 3:05", subject: "AIML Lab", faculty: "Dr. Arunarani", room: "402", type: "lab" },
    ],
    "Day 4": [
      { time: "9:05 - 9:55", subject: "Python Theory", faculty: "Dr. Srividhya", room: "Theory", type: "lecture" },
      { time: "9:55 - 10:45", subject: "Python Lab", faculty: "Dr. Srividhya", room: "402", type: "lab" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
    ],
    "Day 5": [
      { time: "8:15 - 9:05", subject: "AIML Theory", faculty: "Dr. Arunarani", room: "Theory", type: "lecture" },
      { time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" },
    ],
  },
};

// Default empty schedule for classes without data
const emptySchedule = {
  "Day 1": [{ time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" as const }],
  "Day 2": [{ time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" as const }],
  "Day 3": [{ time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" as const }],
  "Day 4": [{ time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" as const }],
  "Day 5": [{ time: "10:45 - 11:00", subject: "Break", faculty: "", room: "", type: "break" as const }],
};

const getTypeStyles = (type: string) => {
  switch (type) {
    case "lecture":
      return "bg-primary/10 border-primary/30 text-foreground";
    case "lab":
      return "bg-green-500/10 border-green-500/30 text-foreground";
    case "tutorial":
      return "bg-secondary/30 border-secondary text-foreground";
    case "online":
      return "bg-purple-500/10 border-purple-500/30 text-foreground";
    case "break":
      return "bg-muted border-border text-muted-foreground";
    default:
      return "bg-card border-border";
  }
};

const Timetable = () => {
  const [activeDay, setActiveDay] = useState("Day 1");
  const [selectedClass, setSelectedClass] = useState("I BCA DS A");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const schedule = timetableData[selectedClass] || emptySchedule;

  return (
    <section className="py-8 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Weekly Timetable
        </h2>
        <p className="text-muted-foreground">
          Even Semester 2025-2026
        </p>
      </div>

      {/* Class Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-foreground mb-2">
          Select Your Class
        </label>
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full md:w-80 flex items-center justify-between px-4 py-3 bg-card border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
          >
            <span className="font-medium">{selectedClass}</span>
            <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute z-10 w-full md:w-80 mt-2 bg-card border border-border rounded-xl shadow-card-hover max-h-64 overflow-y-auto">
              {classes.map((cls) => (
                <button
                  key={cls}
                  onClick={() => {
                    setSelectedClass(cls);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl ${
                    selectedClass === cls ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          )}
        </div>
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
                : "bg-card text-foreground hover:bg-muted"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule */}
      <div className="space-y-3">
        {schedule[activeDay]?.length > 0 ? (
          schedule[activeDay].map((slot, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-card-hover ${getTypeStyles(slot.type)}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-start gap-4">
                  <div className="flex items-center gap-2 text-sm font-medium min-w-[120px]">
                    <Clock className="w-4 h-4" />
                    {slot.time}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{slot.subject}</h3>
                    {slot.faculty && (
                      <p className="text-sm text-muted-foreground">{slot.faculty}</p>
                    )}
                  </div>
                </div>
                {slot.room && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">{slot.room}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground bg-muted rounded-xl">
            No classes scheduled for this day
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-primary/30 border border-primary/50"></div>
          <span>Lecture</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-green-500/30 border border-green-500/50"></div>
          <span>Lab</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500/30 border border-purple-500/50"></div>
          <span>Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-muted border border-border"></div>
          <span>Break</span>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-4 bg-muted rounded-xl border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> Timetable data is based on Day Order system. Check your calendar for the actual day order.
        </p>
      </div>
    </section>
  );
};

export default Timetable;
