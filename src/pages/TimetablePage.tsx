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
import { ChevronDown, Users, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const TimetablePage = () => {
  const [selectedClass, setSelectedClass] = useState(classes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const currentTimetable = getClassTimetable(selectedClass) || {};

  const navigateDay = (direction: number) => {
    setSelectedDay((prev) => {
      const newDay = prev + direction;
      if (newDay < 0) return dayOrders.length - 1;
      if (newDay >= dayOrders.length) return 0;
      return newDay;
    });
  };

  // Filter periods for mobile view
  const getMobilePeriods = (day: string) => {
    const daySchedule = currentTimetable[day] || [];
    return daySchedule.filter(
      (p: PeriodData) => p.type !== "break" && p.subject !== "Break" && p.subject !== "None" && p.type !== "free"
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            Class Timetable
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            {metadata.semester} • {metadata.level}
          </p>
        </div>

        {/* Selector Dropdown */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="relative w-full max-w-sm">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-card border border-border rounded-xl text-foreground hover:bg-muted transition-colors"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-medium truncate text-sm sm:text-base">{selectedClass}</span>
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
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm hover:bg-muted transition-colors first:rounded-t-xl last:rounded-b-xl ${
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

        {/* Mobile View - Card Based */}
        <div className="lg:hidden">
          {/* Day Navigation */}
          <div className="flex items-center justify-between mb-4 bg-card rounded-xl border border-border p-3">
            <button
              onClick={() => navigateDay(-1)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1 sm:gap-2 overflow-x-auto">
              {dayOrders.map((day, idx) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(idx)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedDay === idx
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigateDay(1)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Period Cards */}
          <div className="space-y-3">
            {getMobilePeriods(dayOrders[selectedDay]).length > 0 ? (
              getMobilePeriods(dayOrders[selectedDay]).map((period: PeriodData, idx: number) => {
                const timeSlot = timeSlots.find((t) => t.slot === period.slot);
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border border-border ${getPeriodTypeStyle(period.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {period.type === "lab" ? "L" : period.type === "online" ? "O" : period.type === "library" ? "📚" : "T"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base line-clamp-2">
                          {period.subject}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs opacity-80">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {timeSlot?.time || period.slot}
                          </span>
                          {period.room && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              Room {period.room}
                            </span>
                          )}
                        </div>
                        {period.code && (
                          <p className="text-xs opacity-60 mt-1">{period.code}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-muted-foreground bg-card rounded-xl border border-border">
                <p>No classes scheduled for {dayOrders[selectedDay]}</p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop/Tablet View - Table Grid */}
        <div className="hidden lg:block bg-card rounded-2xl border border-border overflow-hidden animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-3 text-left text-sm font-semibold text-foreground w-20 sticky left-0 bg-muted/50 z-10">
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
                      <td className="p-3 font-medium text-foreground bg-muted/30 sticky left-0 z-10">
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
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-primary/20 border border-primary/30"></div>
            <span className="text-muted-foreground">Theory</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-500/20 border border-green-500/30"></div>
            <span className="text-muted-foreground">Lab</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-purple-500/20 border border-purple-500/30"></div>
            <span className="text-muted-foreground">Online</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-amber-500/20 border border-amber-500/30"></div>
            <span className="text-muted-foreground">Library</span>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-muted/50 rounded-xl text-xs sm:text-sm text-muted-foreground text-center">
          <strong>Note:</strong> Timetable follows Day Order system. Check your calendar for the
          actual day order. Valid from {metadata.valid_from}.
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
