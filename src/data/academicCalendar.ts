export interface CalendarEvent {
  date: string;
  day: string;
  particulars: string;
  firstYear?: number | string;
  others?: number | string;
  dayOrder?: string;
  isHoliday?: boolean;
}

export interface MonthData {
  month: string;
  year: number;
  events: CalendarEvent[];
}

export interface SemesterDates {
  particulars: string;
  seniorDate?: string;
  freshersDate?: string;
  date?: string;
}

export const oddSemesterDates: SemesterDates[] = [
  { particulars: "Course Enrolment", seniorDate: "16-06-2026", freshersDate: "25-06-2026" },
  { particulars: "Commencement of Classes", seniorDate: "23-06-2026", freshersDate: "09-07-2026" },
  { particulars: "Cycle Test – I", seniorDate: "28-07-2026", freshersDate: "06-08-2026" },
  { particulars: "Cycle Test – II", seniorDate: "08-09-2026", freshersDate: "17-09-2026" },
  { particulars: "Question Paper Setting Last Date", seniorDate: "14-08-2026", freshersDate: "25-08-2026" },
  { particulars: "Model Practical Examination", seniorDate: "26-09-2026", freshersDate: "13-10-2026" },
  { particulars: "Model Theory Examination", seniorDate: "08-10-2026", freshersDate: "22-10-2026" },
  { particulars: "Detention List Submission", seniorDate: "21-10-2026", freshersDate: "03-11-2026" },
  { particulars: "Internal Marks Submission", seniorDate: "22-10-2026", freshersDate: "04-11-2026" },
  { particulars: "Project Viva-Voce Examination", seniorDate: "21-10-2026", freshersDate: "30-10-2026" },
  { particulars: "University Practical Examination", seniorDate: "21-10-2026", freshersDate: "30-10-2026" },
  { particulars: "University Theory Examination", seniorDate: "06-11-2026", freshersDate: "12-11-2026" },
  { particulars: "Central Valuation", seniorDate: "18-11-2026", freshersDate: "24-11-2026" },
  { particulars: "Last Working Day", seniorDate: "15-10-2026", freshersDate: "29-10-2026" },
  { particulars: "Commencement of Next Semester", date: "01-12-2026" },
];

export const evenSemesterDates: SemesterDates[] = [
  { particulars: "Course Enrolment", date: "26-11-2026" },
  { particulars: "Commencement of Classes", date: "01-12-2026" },
  { particulars: "Cycle Test – I", date: "21-01-2027" },
  { particulars: "Cycle Test – II", date: "02-03-2027" },
  { particulars: "Question Paper Setting Last Date", date: "28-01-2027" },
  { particulars: "Model Practical Examination", date: "18-03-2027" },
  { particulars: "Model Theory Examination", date: "26-03-2027" },
  { particulars: "Detention List Submission", date: "06-04-2027" },
  { particulars: "Internal Marks Submission", date: "08-04-2027" },
  { particulars: "Project Viva-Voce Examination", date: "06-04-2027" },
  { particulars: "University Practical Examination", date: "06-04-2027" },
  { particulars: "University Theory Examination", date: "22-04-2027" },
  { particulars: "Central Valuation", date: "08-05-2027" },
  { particulars: "Last Working Day", date: "02-04-2027" },
  { particulars: "Commencement of Next Semester", date: "24-06-2027" },
];

export const holidays2025: { date: string; name: string }[] = [
  { date: "06-07-2026", name: "Moharram" },
  { date: "15-08-2026", name: "Independence Day" },
  { date: "16-08-2026", name: "Krishna Jayanthi" },
  { date: "05-09-2026", name: "Teachers Day / Milad-Un-Nabi" },
  { date: "01-10-2026", name: "Ayutha Pooja" },
  { date: "02-10-2026", name: "Vijaya Dasami / Gandhi Jayanthi" },
  { date: "20-10-2026", name: "Diwali" },
  { date: "21-10-2026", name: "Diwali" },
  { date: "05-11-2026", name: "Deepavali" },
];

export const holidays2026: { date: string; name: string }[] = [
  { date: "14-01-2027", name: "Pongal" },
  { date: "15-01-2027", name: "Thiruvalluvar Day" },
  { date: "26-01-2027", name: "Republic Day" },
  { date: "26-02-2027", name: "Maha Shivaratri" },
  { date: "14-04-2027", name: "Tamil New Year" },
  { date: "01-05-2027", name: "May Day" },
];

export const metadata = {
  academicYear: "2026-2027",
  faculty: "Faculty of Science and Humanities",
  institution: "SRM Institute of Science and Technology",
  pdfUrl: "/Approved UG & PG Academic Calendar - Academic Year 2026-2027.pdf",
};
