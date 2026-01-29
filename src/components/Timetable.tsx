import { useState } from "react";
import { Clock, MapPin } from "lucide-react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const timetableData: Record<string, Array<{
  time: string;
  subject: string;
  faculty: string;
  room: string;
  type: "lecture" | "lab" | "tutorial" | "break";
}>> = {
  Monday: [
    { time: "9:00 - 9:50", subject: "Data Structures", faculty: "Dr. Ramesh K", room: "TP-401", type: "lecture" },
    { time: "10:00 - 10:50", subject: "Database Systems", faculty: "Prof. Anitha S", room: "TP-402", type: "lecture" },
    { time: "11:00 - 11:50", subject: "Computer Networks", faculty: "Dr. Suresh M", room: "TP-301", type: "lecture" },
    { time: "12:00 - 1:00", subject: "Lunch Break", faculty: "", room: "Mess", type: "break" },
    { time: "2:00 - 3:50", subject: "DS Lab", faculty: "Dr. Ramesh K", room: "Lab-201", type: "lab" },
    { time: "4:00 - 4:50", subject: "Soft Skills", faculty: "Ms. Priya R", room: "TP-105", type: "tutorial" },
  ],
  Tuesday: [
    { time: "9:00 - 9:50", subject: "Operating Systems", faculty: "Dr. Kumar V", room: "TP-403", type: "lecture" },
    { time: "10:00 - 10:50", subject: "Data Structures", faculty: "Dr. Ramesh K", room: "TP-401", type: "lecture" },
    { time: "11:00 - 11:50", subject: "Mathematics III", faculty: "Prof. Lakshmi N", room: "TP-201", type: "lecture" },
    { time: "12:00 - 1:00", subject: "Lunch Break", faculty: "", room: "Mess", type: "break" },
    { time: "2:00 - 3:50", subject: "DBMS Lab", faculty: "Prof. Anitha S", room: "Lab-202", type: "lab" },
    { time: "4:00 - 4:50", subject: "Environmental Science", faculty: "Dr. Meena K", room: "TP-101", type: "lecture" },
  ],
  Wednesday: [
    { time: "9:00 - 9:50", subject: "Computer Networks", faculty: "Dr. Suresh M", room: "TP-301", type: "lecture" },
    { time: "10:00 - 10:50", subject: "Operating Systems", faculty: "Dr. Kumar V", room: "TP-403", type: "lecture" },
    { time: "11:00 - 11:50", subject: "Database Systems", faculty: "Prof. Anitha S", room: "TP-402", type: "lecture" },
    { time: "12:00 - 1:00", subject: "Lunch Break", faculty: "", room: "Mess", type: "break" },
    { time: "2:00 - 3:50", subject: "CN Lab", faculty: "Dr. Suresh M", room: "Lab-203", type: "lab" },
    { time: "4:00 - 4:50", subject: "Library", faculty: "", room: "Central Library", type: "tutorial" },
  ],
  Thursday: [
    { time: "9:00 - 9:50", subject: "Mathematics III", faculty: "Prof. Lakshmi N", room: "TP-201", type: "lecture" },
    { time: "10:00 - 10:50", subject: "Data Structures", faculty: "Dr. Ramesh K", room: "TP-401", type: "lecture" },
    { time: "11:00 - 11:50", subject: "Operating Systems", faculty: "Dr. Kumar V", room: "TP-403", type: "lecture" },
    { time: "12:00 - 1:00", subject: "Lunch Break", faculty: "", room: "Mess", type: "break" },
    { time: "2:00 - 3:50", subject: "OS Lab", faculty: "Dr. Kumar V", room: "Lab-204", type: "lab" },
    { time: "4:00 - 4:50", subject: "Sports", faculty: "", room: "Ground", type: "tutorial" },
  ],
  Friday: [
    { time: "9:00 - 9:50", subject: "Database Systems", faculty: "Prof. Anitha S", room: "TP-402", type: "lecture" },
    { time: "10:00 - 10:50", subject: "Computer Networks", faculty: "Dr. Suresh M", room: "TP-301", type: "lecture" },
    { time: "11:00 - 11:50", subject: "Mathematics III", faculty: "Prof. Lakshmi N", room: "TP-201", type: "lecture" },
    { time: "12:00 - 1:00", subject: "Lunch Break", faculty: "", room: "Mess", type: "break" },
    { time: "2:00 - 2:50", subject: "Data Structures", faculty: "Dr. Ramesh K", room: "TP-401", type: "lecture" },
    { time: "3:00 - 4:50", subject: "Project Work", faculty: "Dr. Ramesh K", room: "Lab-201", type: "lab" },
  ],
  Saturday: [
    { time: "9:00 - 9:50", subject: "Environmental Science", faculty: "Dr. Meena K", room: "TP-101", type: "lecture" },
    { time: "10:00 - 10:50", subject: "Soft Skills", faculty: "Ms. Priya R", room: "TP-105", type: "tutorial" },
    { time: "11:00 - 12:50", subject: "Mini Project", faculty: "Mentors", room: "Lab-201", type: "lab" },
  ],
};

const getTypeStyles = (type: string) => {
  switch (type) {
    case "lecture":
      return "bg-primary/10 border-primary/30 text-foreground";
    case "lab":
      return "bg-green-500/10 border-green-500/30 text-foreground";
    case "tutorial":
      return "bg-secondary/30 border-secondary text-foreground";
    case "break":
      return "bg-muted border-border text-muted-foreground";
    default:
      return "bg-card border-border";
  }
};

const Timetable = () => {
  const [activeDay, setActiveDay] = useState("Monday");
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const currentDay = days.includes(today) ? today : "Monday";

  return (
    <section className="py-8 animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">
          Weekly Timetable
        </h2>
        <p className="text-muted-foreground">
          CSE Department • III Year • Section A
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
                : day === currentDay
                ? "bg-secondary text-secondary-foreground"
                : "bg-card text-foreground hover:bg-muted"
            }`}
          >
            {day.slice(0, 3)}
            {day === currentDay && activeDay !== day && (
              <span className="ml-1 text-xs">(Today)</span>
            )}
          </button>
        ))}
      </div>

      {/* Schedule */}
      <div className="space-y-3">
        {timetableData[activeDay]?.map((slot, index) => (
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
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{slot.room}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timetable;
