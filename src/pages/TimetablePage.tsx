import { useState } from "react";
import {
  getClassTimetable,
  timeSlots,
  dayOrders,
  classes,
  metadata,
  getPeriodTypeStyle,
  PeriodData,
} from "@/data/timetable";
import { ChevronDown, Users } from "lucide-react";

const TimetablePage = () => {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentTimetable = getClassTimetable(selectedClass) || {};

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Class Timetable
          </h1>
          <p className="text-muted-foreground">
            {metadata.semester} • {metadata.level}
          </p>
        </div>

        {/* Selector Dropdown */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-sm">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-medium truncate">{selectedClass}</span>
              </span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-20 w-full mt-2 bg-card border border-border rounded-xl shadow-lg max-h-64 overflow-y-auto">
                {classes.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedClass(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left text-sm hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      selectedClass === option
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
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-3 text-left text-sm font-semibold text-foreground w-20 sticky left-0 bg-muted/50">
                    Day
                  </th>
                  {timeSlots.map((slot, idx) => (
                    <th
                      key={idx}
                      className={`p-2 text-center text-xs font-medium min-w-[100px] ${
                        slot.isBreak
                          ? "bg-muted text-muted-foreground"
                          : slot.isLunch
                          ? "bg-orange-500/10 text-orange-600 dark:text-orange-400"
                          : "text-foreground"
                      }`}
                    >
                      <div className="font-semibold">{slot.slot}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{slot.time}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dayOrders.map((day) => {
                  const daySchedule = currentTimetable[day] || [];
                  
                  return (
                    <tr key={day} className="border-b border-border last:border-b-0">
                      <td className="p-3 font-medium text-foreground bg-muted/30 sticky left-0">
                        {day}
                      </td>
                      {timeSlots.map((slot, idx) => {
                        const period = daySchedule.find((p: PeriodData) => p.slot === slot.slot);
                        
                        if (!period || period.type === "free" || period.subject === "None") {
                          return (
                            <td key={idx} className="p-2 text-center border-l border-border">
                              {slot.isBreak && <span className="text-xs text-muted-foreground">—</span>}
                            </td>
                          );
                        }

                        return (
                          <td
                            key={idx}
                            className={`p-2 text-center border-l border-border ${getPeriodTypeStyle(period.type)}`}
                          >
                            <div className="text-xs">
                              <div className="font-medium line-clamp-2">{period.subject}</div>
                              {period.room && (
                                <div className="text-[10px] opacity-70 mt-0.5">
                                  {period.room}
                                </div>
                              )}
                              {period.code && (
                                <div className="text-[10px] opacity-50 mt-0.5">
                                  {period.code}
                                </div>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/20 border border-primary/30"></div>
            <span className="text-muted-foreground">Theory</span>
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
            <div className="w-4 h-4 rounded bg-amber-500/20 border border-amber-500/30"></div>
            <span className="text-muted-foreground">Library</span>
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 p-4 bg-muted/50 rounded-xl text-sm text-muted-foreground text-center">
          <strong>Note:</strong> Timetable follows Day Order system. Check your calendar for the
          actual day order. Valid from {metadata.valid_from}.
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
