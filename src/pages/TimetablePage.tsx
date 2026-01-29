import { useState } from "react";
import {
  classTimetables,
  staffTimetables,
  timeSlots,
  dayOrders,
  classes,
  staff,
  ClassPeriod,
} from "@/data/timetable";
import { ChevronDown, User, Users } from "lucide-react";

type ViewMode = "class" | "staff";

const TimetablePage = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("class");
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [selectedStaff, setSelectedStaff] = useState(staff[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentSchedule =
    viewMode === "class"
      ? classTimetables[selectedClass] || {}
      : staffTimetables[selectedStaff] || {};

  const currentSelection = viewMode === "class" ? selectedClass : selectedStaff;
  const options = viewMode === "class" ? classes : staff;

  const getPeriodStyle = (period: ClassPeriod | null, isBreak: boolean, isOnline: boolean) => {
    if (isBreak) return "bg-muted/50 text-muted-foreground";
    if (!period) return "bg-transparent";

    switch (period.type) {
      case "lab":
        return "bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-400";
      case "online":
        return "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-400";
      case "project":
        return "bg-orange-500/10 border-orange-500/30 text-orange-700 dark:text-orange-400";
      default:
        return "bg-primary/10 border-primary/30 text-primary";
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class Timetable
          </h1>
          <p className="text-muted-foreground">Even Semester 2025-2026</p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-card rounded-xl border border-border p-1">
            <button
              onClick={() => setViewMode("class")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "class"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="w-4 h-4" />
              My Timetable
            </button>
            <button
              onClick={() => setViewMode("staff")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                viewMode === "staff"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-4 h-4" />
              Staff Timetable
            </button>
          </div>
        </div>

        {/* Selector Dropdown */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-sm">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
            >
              <span className="font-medium truncate">{currentSelection}</span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (viewMode === "class") {
                        setSelectedClass(option);
                      } else {
                        setSelectedStaff(option);
                      }
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      currentSelection === option
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-3 text-left text-sm font-semibold text-foreground w-24">
                    Day/Time
                  </th>
                  {timeSlots.map((slot, idx) => (
                    <th
                      key={idx}
                      className={`p-2 text-center text-xs font-medium ${
                        slot.isBreak
                          ? "bg-muted text-muted-foreground"
                          : slot.isOnline
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : "text-foreground"
                      }`}
                    >
                      <div>{slot.time.split(" - ")[0]}</div>
                      <div className="text-muted-foreground">{slot.time.split(" - ")[1]}</div>
                      {slot.isBreak && <div className="text-[10px] mt-1">BREAK</div>}
                      {slot.isOnline && <div className="text-[10px] mt-1">ONLINE</div>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dayOrders.map((day) => (
                  <tr key={day} className="border-b border-border last:border-b-0">
                    <td className="p-3 font-medium text-foreground bg-muted/30">{day}</td>
                    {timeSlots.map((slot, idx) => {
                      const period = currentSchedule[day]?.[idx] || null;
                      const style = getPeriodStyle(period, !!slot.isBreak, !!slot.isOnline);

                      return (
                        <td
                          key={idx}
                          className={`p-2 text-center border-l border-border ${style}`}
                        >
                          {slot.isBreak ? (
                            <span className="text-xs">—</span>
                          ) : period ? (
                            <div className="text-xs">
                              <div className="font-medium line-clamp-2">{period.subject}</div>
                              {period.room && (
                                <div className="text-[10px] opacity-70 mt-0.5">
                                  {period.room}
                                </div>
                              )}
                            </div>
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30"></div>
            <span className="text-muted-foreground">Lecture</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/30"></div>
            <span className="text-muted-foreground">Lab</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-purple-500/20 border border-purple-500/30"></div>
            <span className="text-muted-foreground">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-500/20 border border-orange-500/30"></div>
            <span className="text-muted-foreground">Project</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted border border-border"></div>
            <span className="text-muted-foreground">Break</span>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-muted/50 rounded-xl text-sm text-muted-foreground text-center">
          <strong>Note:</strong> Timetable follows Day Order system. Check your calendar for the
          actual day order.
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
