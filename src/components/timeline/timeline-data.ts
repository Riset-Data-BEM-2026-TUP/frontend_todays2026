// Tipe data tampilan timeline (kartu hari). Data ASLI diambil dari backend
// (GET /timeline) lalu dipetakan di ExpandingTimelineGrid — tidak ada lagi data hardcoded.


export interface DayTimelineData {
  id: string;
  dayNumber: string; // e.g. "01"
  dayLabel: string; // e.g. "Rabu"
  dateStr: string; // e.g. "03 September 2026"
  title: string;
  summary: string;
  timeRange: string;
  location: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  dresscode: string | null;
  checklist: string[];
  mapUrl?: string;
}
