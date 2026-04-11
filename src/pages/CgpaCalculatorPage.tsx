import { useState, useCallback, useRef, useEffect } from "react";
import { Calculator, Plus, Trash2, RotateCcw, GraduationCap, BarChart3, BookOpen, Award, PartyPopper, Sparkles } from "lucide-react";

interface Subject {
  id: number;
  name: string;
  credits: string;
  grade: string;
}

const GRADE_POINTS: Record<string, { points: number; range: string; description: string; status: "pass" | "fail" }> = {
  O:  { points: 10.0, range: "91-100", description: "Outstanding", status: "pass" },
  "A+": { points: 9.0, range: "81-90", description: "Excellent", status: "pass" },
  A:  { points: 8.0, range: "71-80", description: "Very Good", status: "pass" },
  "B+": { points: 7.0, range: "61-70", description: "Good", status: "pass" },
  B:  { points: 6.0, range: "51-60", description: "Average", status: "pass" },
  C:  { points: 5.0, range: "45-50", description: "Below Average", status: "pass" },
  D:  { points: 4.0, range: "40-44", description: "Poor", status: "pass" },
  F:  { points: 0.0, range: "0-39", description: "Fail", status: "fail" },
};

const GRADE_OPTIONS = Object.keys(GRADE_POINTS);

const getGradeColor = (grade: string) => {
  switch (grade) {
    case "O": return "text-emerald-500";
    case "A+": return "text-green-500";
    case "A": return "text-teal-500";
    case "B+": return "text-blue-500";
    case "B": return "text-sky-500";
    case "C": return "text-amber-500";
    case "D": return "text-orange-500";
    case "F": return "text-red-500";
    default: return "text-muted-foreground";
  }
};

const getGpaBadge = (gpa: number) => {
  if (gpa >= 9.0) return { label: "Outstanding", color: "from-emerald-500 to-green-500", icon: "🏆", celebrate: true };
  if (gpa >= 8.0) return { label: "Excellent", color: "from-green-500 to-teal-500", icon: "🌟", celebrate: true };
  if (gpa >= 7.0) return { label: "Very Good", color: "from-teal-500 to-blue-500", icon: "✨", celebrate: false };
  if (gpa >= 6.0) return { label: "Good", color: "from-blue-500 to-sky-500", icon: "👍", celebrate: false };
  if (gpa >= 5.0) return { label: "Average", color: "from-amber-500 to-yellow-500", icon: "📖", celebrate: false };
  if (gpa >= 4.0) return { label: "Below Average", color: "from-orange-500 to-red-400", icon: "⚠️", celebrate: false };
  return { label: "Needs Improvement", color: "from-red-500 to-rose-600", icon: "📝", celebrate: false };
};

const CONFETTI_COLORS = [
  "#10b981", "#34d399", "#6ee7b7", // greens
  "#3b82f6", "#60a5fa",             // blues
  "#f59e0b", "#fbbf24",             // yellows
  "#ec4899", "#f472b6",             // pinks
  "#8b5cf6", "#a78bfa",             // purples
  "#ef4444", "#f87171",             // reds
  "#ffffff",                         // white
];

const CELEBRATION_EMOJIS = ["🎉", "🎊", "🏆", "⭐", "💯", "🔥", "✨", "🥇", "🎓", "👏"];

const MOTIVATIONAL_MESSAGES = [
  "You're crushing it! 🔥",
  "Academic excellence unlocked! 🏆",
  "SRM ka topper! 🎓",
  "Parents will be proud! 👨‍👩‍👧",
  "Keep this energy going! ⚡",
  "Scholarship material! 💎",
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: "rect" | "circle" | "star";
}

interface EmojiParticle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  emoji: string;
  size: number;
  opacity: number;
  rotation: number;
}

let nextId = 1;
const createSubject = (): Subject => ({
  id: nextId++,
  name: "",
  credits: "",
  grade: "",
});

const CgpaCalculatorPage = () => {
  const [subjects, setSubjects] = useState<Subject[]>(() => [createSubject(), createSubject(), createSubject(), createSubject(), createSubject()]);
  const [showGradeRef, setShowGradeRef] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const emojisRef = useRef<EmojiParticle[]>([]);
  const prevGpaRef = useRef<number>(0);
  const hasCelebratedRef = useRef<boolean>(false);

  const addSubject = useCallback(() => {
    setSubjects((prev) => [...prev, createSubject()]);
  }, []);

  const removeSubject = useCallback((id: number) => {
    setSubjects((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));
  }, []);

  const updateSubject = useCallback((id: number, field: keyof Subject, value: string) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  }, []);

  const resetAll = useCallback(() => {
    nextId = 1;
    setSubjects([createSubject(), createSubject(), createSubject(), createSubject(), createSubject()]);
  }, []);

  // Calculate GPA
  const validSubjects = subjects.filter((s) => s.credits && s.grade && Number(s.credits) > 0);
  const totalCredits = validSubjects.reduce((sum, s) => sum + Number(s.credits), 0);
  const totalGradePoints = validSubjects.reduce((sum, s) => sum + Number(s.credits) * GRADE_POINTS[s.grade].points, 0);
  const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  const gpaBadge = getGpaBadge(gpa);

  // Confetti launcher
  const launchConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate particles from multiple burst points
    const particles: Particle[] = [];
    const emojis: EmojiParticle[] = [];
    const burstPoints = [
      { x: canvas.width * 0.2, y: canvas.height * 0.5 },
      { x: canvas.width * 0.5, y: canvas.height * 0.3 },
      { x: canvas.width * 0.8, y: canvas.height * 0.5 },
    ];

    burstPoints.forEach((origin) => {
      for (let i = 0; i < 60; i++) {
        const angle = (Math.random() * Math.PI * 2);
        const speed = 3 + Math.random() * 8;
        particles.push({
          x: origin.x,
          y: origin.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          size: 4 + Math.random() * 8,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          opacity: 1,
          shape: (["rect", "circle", "star"] as const)[Math.floor(Math.random() * 3)],
        });
      }
    });

    // Emoji particles floating up
    for (let i = 0; i < 15; i++) {
      emojis.push({
        x: Math.random() * canvas.width,
        y: canvas.height + 50 + Math.random() * 200,
        vy: -(2 + Math.random() * 3),
        vx: (Math.random() - 0.5) * 2,
        emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
        size: 24 + Math.random() * 20,
        opacity: 1,
        rotation: (Math.random() - 0.5) * 0.5,
      });
    }

    particlesRef.current = particles;
    emojisRef.current = emojis;

    const drawStar = (cx: number, cy: number, size: number) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const method = i === 0 ? "moveTo" : "lineTo";
        ctx[method](cx + Math.cos(angle) * size, cy + Math.sin(angle) * size);
      }
      ctx.closePath();
      ctx.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      // Draw confetti particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.99; // air resistance
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.005;

        if (p.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;

          if (p.shape === "rect") {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          } else if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            drawStar(0, 0, p.size / 2);
          }
          ctx.restore();
        }
      });

      // Draw emoji particles
      emojisRef.current.forEach((e) => {
        e.y += e.vy;
        e.x += e.vx;
        e.opacity -= 0.004;

        if (e.opacity > 0 && e.y > -50) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.min(e.opacity, 1);
          ctx.font = `${e.size}px serif`;
          ctx.textAlign = "center";
          ctx.translate(e.x, e.y);
          ctx.rotate(e.rotation);
          ctx.fillText(e.emoji, 0, 0);
          ctx.restore();
        }
      });

      if (alive) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    cancelAnimationFrame(animationRef.current);
    animate();
  }, []);

  // Trigger celebration when GPA crosses threshold
  useEffect(() => {
    if (gpa >= 8.0 && validSubjects.length >= 2 && !hasCelebratedRef.current) {
      hasCelebratedRef.current = true;
      const msg = MOTIVATIONAL_MESSAGES[Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length)];
      setCelebrationMessage(msg);
      setShowCelebration(true);
      launchConfetti();

      // Second burst after a short delay
      setTimeout(() => launchConfetti(), 800);

      // Hide celebration banner after some time
      setTimeout(() => setShowCelebration(false), 5000);
    }
    // Reset celebration flag when GPA drops below threshold
    if (gpa < 8.0) {
      hasCelebratedRef.current = false;
    }
    prevGpaRef.current = gpa;
  }, [gpa, validSubjects.length, launchConfetti]);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Handle window resize for canvas
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[var(--gradient-mesh)] bg-no-repeat relative">
      {/* Confetti Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[100]"
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* Celebration Banner */}
      {showCelebration && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[101] animate-fade-in-up">
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-2xl shadow-2xl shadow-green-500/30 border border-white/20 backdrop-blur-sm">
            <PartyPopper className="w-6 h-6 animate-bounce-soft" />
            <div>
              <div className="font-bold text-base">Congratulations! 🎉</div>
              <div className="text-sm text-white/90">{celebrationMessage}</div>
            </div>
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      )}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in-up">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">
            <span className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-2xl border border-primary/30 shadow-lg shadow-primary/10 animate-glow">
              <span className="text-primary font-bold">CGPA Calculator</span>
            </span>
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
            SRM University • 10-Point Grading System
          </p>
        </div>

        {/* Result Card (always visible) */}
        <div
          className="mb-6 bg-card rounded-2xl border border-border overflow-hidden animate-fade-in-up shadow-xl"
          style={{ animationDelay: "150ms" }}
        >
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              {/* GPA Circle */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${(gpa / 10) * 326.73} 326.73`}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-foreground">{gpa.toFixed(2)}</span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">out of 10</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 w-full">
                {validSubjects.length > 0 ? (
                  <div className="space-y-3">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${gpaBadge.color} text-white text-sm font-medium shadow-lg`}>
                      <span>{gpaBadge.icon}</span>
                      <span>{gpaBadge.label}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="p-3 bg-muted/50 rounded-xl text-center">
                        <BookOpen className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <div className="text-lg font-bold text-foreground">{validSubjects.length}</div>
                        <div className="text-[10px] text-muted-foreground">Subjects</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-xl text-center">
                        <Award className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <div className="text-lg font-bold text-foreground">{totalCredits}</div>
                        <div className="text-[10px] text-muted-foreground">Credits</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-xl text-center">
                        <BarChart3 className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <div className="text-lg font-bold text-foreground">{totalGradePoints.toFixed(1)}</div>
                        <div className="text-[10px] text-muted-foreground">Total Points</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-muted-foreground">Enter your subjects, credits, and grades below to calculate your CGPA.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Subject Inputs */}
        <div
          className="bg-card rounded-2xl border border-border overflow-hidden animate-fade-in-up shadow-xl"
          style={{ animationDelay: "200ms" }}
        >
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-[1fr_100px_120px_40px] gap-3 p-4 bg-gradient-to-r from-muted/80 to-muted/50 border-b border-border text-sm font-semibold text-foreground">
            <span>Subject Name</span>
            <span className="text-center">Credits</span>
            <span className="text-center">Grade</span>
            <span></span>
          </div>

          {/* Subject Rows */}
          <div className="divide-y divide-border/50 stagger-children">
            {subjects.map((subject, idx) => (
              <div
                key={subject.id}
                className="grid grid-cols-1 sm:grid-cols-[1fr_100px_120px_40px] gap-2 sm:gap-3 p-3 sm:p-4 hover:bg-muted/30 transition-colors group"
              >
                {/* Subject Name */}
                <div>
                  <label className="sm:hidden text-xs text-muted-foreground mb-1 block">Subject</label>
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                    placeholder={`Subject ${idx + 1}`}
                    className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                  />
                </div>

                <div className="flex gap-2 sm:contents">
                  {/* Credits */}
                  <div className="flex-1 sm:flex-none">
                    <label className="sm:hidden text-xs text-muted-foreground mb-1 block">Credits</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={subject.credits}
                      onChange={(e) => updateSubject(subject.id, "credits", e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 text-sm text-center bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>

                  {/* Grade */}
                  <div className="flex-1 sm:flex-none">
                    <label className="sm:hidden text-xs text-muted-foreground mb-1 block">Grade</label>
                    <select
                      value={subject.grade}
                      onChange={(e) => updateSubject(subject.id, "grade", e.target.value)}
                      className={`w-full px-3 py-2 text-sm text-center bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none cursor-pointer font-semibold ${subject.grade ? getGradeColor(subject.grade) : "text-muted-foreground/50"}`}
                    >
                      <option value="">--</option>
                      {GRADE_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                          {g} ({GRADE_POINTS[g].points})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Delete Button */}
                  <div className="flex items-end sm:items-center">
                    <button
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length <= 1}
                      className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
                      title="Remove subject"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="p-4 border-t border-border/50 flex flex-wrap gap-2 justify-between items-center bg-muted/30">
            <div className="flex gap-2">
              <button
                onClick={addSubject}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                Add Subject
              </button>
              <button
                onClick={resetAll}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-full hover:bg-destructive/10 hover:text-destructive border border-border transition-all duration-300 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
            <button
              onClick={() => setShowGradeRef(!showGradeRef)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full hover:bg-primary/20 border border-primary/20 transition-all duration-300 active:scale-95"
            >
              <GraduationCap className="w-4 h-4" />
              {showGradeRef ? "Hide" : "View"} Grade Scale
            </button>
          </div>
        </div>

        {/* Grade Reference Table */}
        {showGradeRef && (
          <div className="mt-6 bg-card rounded-2xl border border-border overflow-hidden animate-scale-in shadow-xl">
            <div className="p-4 border-b border-border/50 bg-gradient-to-r from-primary/10 to-transparent">
              <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                <BarChart3 className="w-5 h-5 text-primary" />
                Grade Scale Reference
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="p-3 text-left font-semibold text-foreground">Grade</th>
                    <th className="p-3 text-center font-semibold text-foreground">Points</th>
                    <th className="p-3 text-center font-semibold text-foreground">Range</th>
                    <th className="p-3 text-left font-semibold text-foreground">Description</th>
                    <th className="p-3 text-center font-semibold text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {GRADE_OPTIONS.map((grade) => {
                    const info = GRADE_POINTS[grade];
                    return (
                      <tr key={grade} className="border-b border-border/50 last:border-b-0 hover:bg-muted/30 transition-colors">
                        <td className={`p-3 font-bold text-base ${getGradeColor(grade)}`}>{grade}</td>
                        <td className="p-3 text-center font-semibold text-foreground">{info.points.toFixed(1)}</td>
                        <td className="p-3 text-center text-muted-foreground">{info.range}</td>
                        <td className="p-3 text-muted-foreground">{info.description}</td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              info.status === "pass"
                                ? "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/20"
                                : "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20"
                            }`}
                          >
                            {info.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Note */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-card/50 backdrop-blur-sm rounded-xl text-xs sm:text-sm text-muted-foreground text-center border border-border/50 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <strong className="text-foreground">Note:</strong> This calculator follows the SRM University 10-point grading scale. CGPA = Σ(Credit × Grade Point) / Σ(Credit).
        </div>
      </div>
    </div>
  );
};

export default CgpaCalculatorPage;
