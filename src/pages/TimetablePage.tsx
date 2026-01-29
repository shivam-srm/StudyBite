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
import { ChevronDown, Users, Clock, MapPin, ChevronLeft, ChevronRight, BookOpen, Laptop, Library, FlaskConical } from "lucide-react";

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "lab": return <FlaskConical className="w-4 h-4" />;
      case "online": return <Laptop className="w-4 h-4" />;
      case "library": return <Library className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">
            <span className="gradient-text">Class Timetable</span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            {metadata.semester} • {metadata.level}
          </p>
        </div>

        {/* Selector Dropdown */}
        <div className="flex justify-center mb-6 sm:mb-8 animate-fade-in relative z-40" style={{ animationDelay: "150ms" }}>
          <div className="relative w-full max-w-sm z-40">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-card border border-border rounded-xl text-foreground hover:bg-muted hover:border-primary/50 transition-all duration-300 card-hover group"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary group-hover:animate-bounce-soft" />
                <span className="font-medium truncate text-sm sm:text-base">{selectedClass}</span>
              </span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute z-50 w-full mt-2 bg-card border border-border rounded-xl shadow-2xl max-h-64 overflow-y-auto animate-scale-in">
                {classes.map((option, idx) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedClass(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 text-left text-sm hover:bg-muted transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
                      selectedClass === option
                        ? "bg-primary/10 text-primary font-medium border-l-2 border-l-primary"
                        : "text-foreground bg-card"
                    }`}
                    style={{ animationDelay: `${idx * 30}ms` }}
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
          <div className="flex items-center justify-between mb-4 bg-card rounded-xl border border-border p-2 animate-fade-in glass" style={{ animationDelay: "200ms" }}>
            <button
              onClick={() => navigateDay(-1)}
              className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1 sm:gap-2 overflow-x-auto py-1">
              {dayOrders.map((day, idx) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(idx)}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap ${
                    selectedDay === idx
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigateDay(1)}
              className="p-2 hover:bg-muted rounded-lg transition-all duration-200 hover:scale-110 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Period Cards */}
          <div className="space-y-3 stagger-children">
            {getMobilePeriods(dayOrders[selectedDay]).length > 0 ? (
              getMobilePeriods(dayOrders[selectedDay]).map((period: PeriodData, idx: number) => {
                const timeSlot = timeSlots.find((t) => t.slot === period.slot);
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border border-border card-hover ${getPeriodTypeStyle(period.type)}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-xl bg-background/50 backdrop-blur-sm flex items-center justify-center flex-shrink-0 shadow-inner">
                        {getTypeIcon(period.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-2">
                          {period.subject}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs opacity-80">
                          <span className="flex items-center gap-1.5 bg-background/30 px-2 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            {timeSlot?.time || period.slot}
                          </span>
                          {period.room && (
                            <span className="flex items-center gap-1.5 bg-background/30 px-2 py-1 rounded-full">
                              <MapPin className="w-3.5 h-3.5" />
                              Room {period.room}
                            </span>
                          )}
                        </div>
                        {period.code && (
                          <p className="text-xs opacity-60 mt-2 font-mono">{period.code}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-muted-foreground bg-card rounded-xl border border-border animate-fade-in">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-medium">No classes scheduled</p>
                <p className="text-sm opacity-70">Enjoy your free time on {dayOrders[selectedDay]}!</p>
              </div>
            )}
          </div>
        </div>

        {/* Desktop/Tablet View - Table Grid */}
        <div className="hidden lg:block bg-card rounded-2xl border border-border overflow-hidden animate-fade-in-up shadow-xl" style={{ animationDelay: "200ms" }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-border bg-gradient-to-r from-muted/80 to-muted/50">
                  <th className="p-3 text-left text-sm font-semibold text-foreground w-20 sticky left-0 bg-muted/80 backdrop-blur-sm z-10">
                    Day
                  </th>
                  {timeSlots.map((slot, idx) => (
                    <th
                      key={idx}
                      className={`p-2 text-center text-xs font-medium min-w-[100px] transition-colors ${
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
                {dayOrders.map((day, dayIdx) => {
                  const daySchedule = currentTimetable[day] || [];
                  
                  return (
                    <tr 
                      key={day} 
                      className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
                      style={{ animationDelay: `${dayIdx * 50}ms` }}
                    >
                      <td className="p-3 font-semibold text-foreground bg-muted/30 sticky left-0 z-10 backdrop-blur-sm">
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft"></span>
                          {day}
                        </span>
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
                            className={`p-2 text-center border-l border-border transition-all duration-200 hover:scale-[1.02] ${getPeriodTypeStyle(period.type)}`}
                          >
                            <div className="text-xs">
                              <div className="font-medium line-clamp-2">{period.subject}</div>
                              {period.room && (
                                <div className="text-[10px] opacity-70 mt-0.5 flex items-center justify-center gap-1">
                                  <MapPin className="w-2.5 h-2.5" />
                                  {period.room}
                                </div>
                              )}
                              {period.code && (
                                <div className="text-[10px] opacity-50 mt-0.5 font-mono">
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
        <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm animate-fade-in" style={{ animationDelay: "300ms" }}>
          {[
            { color: "bg-primary/20 border-primary/30", label: "Theory", icon: <BookOpen className="w-3 h-3" /> },
            { color: "bg-green-500/20 border-green-500/30", label: "Lab", icon: <FlaskConical className="w-3 h-3" /> },
            { color: "bg-purple-500/20 border-purple-500/30", label: "Online", icon: <Laptop className="w-3 h-3" /> },
            { color: "bg-amber-500/20 border-amber-500/30", label: "Library", icon: <Library className="w-3 h-3" /> },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full bg-card border border-border hover:border-primary/50 transition-all duration-200 tag-animate">
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded ${item.color} border flex items-center justify-center`}>
                {item.icon}
              </div>
              <span className="text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-card/50 backdrop-blur-sm rounded-xl text-xs sm:text-sm text-muted-foreground text-center border border-border/50 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <strong className="text-foreground">Note:</strong> Timetable follows Day Order system. Check your calendar for the
          actual day order. Valid from {metadata.valid_from}.
        </div>
      </div>
    </div>
  );
};

export default TimetablePage;
