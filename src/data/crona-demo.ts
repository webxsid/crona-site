export type StreamVisibility = "private" | "shared";
export type IssueStatus = "open" | "in_progress" | "completed" | "abandoned";
export type SessionSource = "tracked" | "manual";
export type HabitScheduleType = "daily" | "weekdays" | "weekly";
export type HabitHistoryKind = "completion" | "focus";
export type HabitCompletionStatus = "completed" | "failed";

export const demoToday = new Date().toISOString().slice(0, 10);

export interface Repo {
  id: number;
  name: string;
  description?: string;
  color?: string;
}
export interface Stream {
  id: number;
  repoId: number;
  name: string;
  description?: string;
  visibility: StreamVisibility;
}
export interface Issue {
  id: number;
  streamId: number;
  repoName?: string;
  streamName?: string;
  title: string;
  description?: string;
  status: IssueStatus;
  estimateMinutes?: number;
  workedSeconds: number;
  notes?: string;
  pinnedDaily: boolean;
  todoForDate?: string;
  completedAt?: string;
  abandonedAt?: string;
}
export interface Habit {
  id: number;
  streamId: number;
  name: string;
  description?: string;
  scheduleType: HabitScheduleType;
  weekdays?: number[];
  targetMinutes?: number;
  active: boolean;
}
export interface Session {
  id: string;
  issueId: number;
  source: SessionSource;
  startTime: string;
  endTime?: string;
  durationSeconds?: number;
  notes?: string;
}
export interface HabitHistoryEntry {
  id: number;
  habitId: number;
  habitName?: string;
  repoName?: string;
  streamName?: string;
  kind: HabitHistoryKind;
  date: string;
  status: HabitCompletionStatus;
  startedAt?: string;
  endedAt?: string;
  durationMinutes?: number;
  notes?: string;
  snapshotName?: string;
  snapshotDescription?: string;
  snapshotScheduleType?: HabitScheduleType;
  snapshotWeekdays?: number[];
  snapshotTargetMinutes?: number;
  createdAt: string;
  updatedAt: string;
}
export interface DailyCheckIn {
  date: string;
  mood: number;
  energy: number;
  sleepHours?: number;
  sleepScore?: number;
  screenTimeMinutes?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
export interface MomentumSeriesPoint {
  bucketKey: string;
  label: string;
  startDate: string;
  endDate: string;
  count: number;
  target: number;
  metTarget: boolean;
}
export interface MomentumCard {
  id: string;
  name: string;
  description?: string;
  current: number;
  longest: number;
  habitNames: string[];
  targetNames: string[];
  series: MomentumSeriesPoint[];
}

export const repos: Repo[] = [
  { id: 1, name: "crona-site", description: "The public Crona website.", color: "#65d1c4" },
  { id: 2, name: "crona", description: "The local-first work tracker.", color: "#e5aa5c" },
];

export const streams: Stream[] = [
  {
    id: 11,
    repoId: 1,
    name: "Dev",
    description: "Active site development.",
    visibility: "private",
  },
  {
    id: 12,
    repoId: 1,
    name: "Design",
    description: "Product and visual direction.",
    visibility: "private",
  },
  {
    id: 21,
    repoId: 2,
    name: "seed-qa",
    description: "Crona validation work.",
    visibility: "private",
  },
];

export const issues: Issue[] = [
  {
    id: 101,
    streamId: 11,
    repoName: "crona-site",
    streamName: "Dev",
    title: "Build the Daily view",
    description: "Turn the empty TUI panes into a readable workday.",
    status: "in_progress",
    estimateMinutes: 90,
    workedSeconds: 2340,
    pinnedDaily: true,
    todoForDate: demoToday,
  },
  {
    id: 102,
    streamId: 11,
    repoName: "crona-site",
    streamName: "Dev",
    title: "Add responsive workflow demos",
    status: "open",
    estimateMinutes: 45,
    workedSeconds: 0,
    pinnedDaily: true,
    todoForDate: demoToday,
  },
  {
    id: 103,
    streamId: 12,
    repoName: "crona-site",
    streamName: "Design",
    title: "Refine the terminal wordmark",
    status: "completed",
    estimateMinutes: 30,
    workedSeconds: 1920,
    pinnedDaily: false,
    completedAt: "2026-08-20T15:20:00Z",
  },
  {
    id: 104,
    streamId: 11,
    repoName: "crona-site",
    streamName: "Dev",
    title: "Review habit history output",
    status: "open",
    estimateMinutes: 60,
    workedSeconds: 720,
    pinnedDaily: true,
  },
];

export const habits: Habit[] = [
  {
    id: 201,
    streamId: 11,
    name: "Plan the day",
    description: "Choose the work that matters before starting.",
    scheduleType: "daily",
    targetMinutes: 10,
    active: true,
  },
  {
    id: 202,
    streamId: 11,
    name: "Close the loop",
    description: "Leave a useful note before switching context.",
    scheduleType: "weekdays",
    weekdays: [1, 2, 3, 4, 5],
    targetMinutes: 15,
    active: true,
  },
  {
    id: 203,
    streamId: 21,
    name: "Review momentum",
    scheduleType: "weekly",
    targetMinutes: 25,
    active: true,
  },
  { id: 204, streamId: 11, name: "Cardio", scheduleType: "daily", targetMinutes: 30, active: true },
  {
    id: 205,
    streamId: 11,
    name: "Journal target",
    scheduleType: "daily",
    targetMinutes: 20,
    active: true,
  },
  {
    id: 206,
    streamId: 11,
    name: "Post Lunch movement",
    scheduleType: "daily",
    targetMinutes: 15,
    active: true,
  },
  {
    id: 207,
    streamId: 11,
    name: "Reading target",
    scheduleType: "daily",
    targetMinutes: 15,
    active: true,
  },
  {
    id: 208,
    streamId: 11,
    name: "Track Macros",
    scheduleType: "daily",
    targetMinutes: 10,
    active: true,
  },
  {
    id: 209,
    streamId: 11,
    name: "Strength Training",
    scheduleType: "daily",
    targetMinutes: 60,
    active: true,
  },
];

export const sessions: Session[] = [
  {
    id: "session-301",
    issueId: 101,
    source: "tracked",
    startTime: "2026-08-21T09:10:00Z",
    endTime: "2026-08-21T09:49:00Z",
    durationSeconds: 2340,
    notes: "Mapped the Daily view panes.",
  },
  {
    id: "session-302",
    issueId: 103,
    source: "manual",
    startTime: "2026-08-20T14:48:00Z",
    endTime: "2026-08-20T15:20:00Z",
    durationSeconds: 1920,
    notes: "Final pass on the wordmark alignment.",
  },
];

export const habitHistory: HabitHistoryEntry[] = [
  {
    id: 401,
    habitId: 201,
    habitName: "Plan the day",
    repoName: "crona-site",
    streamName: "Dev",
    kind: "completion",
    date: "2026-08-21",
    status: "completed",
    durationMinutes: 10,
    snapshotName: "Plan the day",
    snapshotScheduleType: "daily",
    snapshotTargetMinutes: 10,
    createdAt: "2026-08-21T08:58:00Z",
    updatedAt: "2026-08-21T08:58:00Z",
  },
  {
    id: 402,
    habitId: 202,
    habitName: "Close the loop",
    repoName: "crona-site",
    streamName: "Dev",
    kind: "focus",
    date: "2026-08-20",
    status: "completed",
    startedAt: "2026-08-20T16:00:00Z",
    endedAt: "2026-08-20T16:15:00Z",
    durationMinutes: 15,
    createdAt: "2026-08-20T16:15:00Z",
    updatedAt: "2026-08-20T16:15:00Z",
  },
  {
    id: 403,
    habitId: 201,
    habitName: "Plan the day",
    repoName: "crona-site",
    streamName: "Dev",
    kind: "completion",
    date: "2026-08-20",
    status: "failed",
    notes: "Started late.",
    createdAt: "2026-08-20T12:00:00Z",
    updatedAt: "2026-08-20T12:00:00Z",
  },
  ...[
    [404, 204, "Cardio", "completed", 30],
    [405, 205, "Journal target", "failed", 0],
    [406, 206, "Post Lunch movement", "completed", 15],
    [407, 207, "Reading target", "failed", 0],
    [408, 208, "Track Macros", "failed", 0],
    [409, 209, "Strength Training", "completed", 60],
  ].map(([id, habitId, habitName, status, durationMinutes]) => ({
    id: id as number,
    habitId: habitId as number,
    habitName: habitName as string,
    kind: "completion" as const,
    date: "2026-08-21",
    status: status as "completed" | "failed",
    durationMinutes: durationMinutes as number,
    createdAt: "2026-08-21T12:00:00Z",
    updatedAt: "2026-08-21T12:00:00Z",
  })),
];

export const checkIns: DailyCheckIn[] = [
  {
    date: "2026-08-21",
    mood: 4,
    energy: 4,
    sleepHours: 7.5,
    sleepScore: 4,
    screenTimeMinutes: 210,
    notes: "A focused start; keep the afternoon light.",
    createdAt: "2026-08-21T08:50:00Z",
    updatedAt: "2026-08-21T08:50:00Z",
  },
  {
    date: "2026-08-20",
    mood: 3,
    energy: 3,
    sleepHours: 6.5,
    sleepScore: 3,
    screenTimeMinutes: 360,
    notes: "Too much context switching.",
    createdAt: "2026-08-20T09:05:00Z",
    updatedAt: "2026-08-20T09:05:00Z",
  },
  {
    date: "2026-08-19",
    mood: 5,
    energy: 4,
    sleepHours: 8,
    sleepScore: 5,
    screenTimeMinutes: 180,
    createdAt: "2026-08-19T08:40:00Z",
    updatedAt: "2026-08-19T08:40:00Z",
  },
];

export const momentums: MomentumCard[] = [
  {
    id: "daily-reflection",
    name: "Daily reflection",
    description: "Keep a short daily check-in habit.",
    current: 4,
    longest: 9,
    habitNames: ["Plan the day"],
    targetNames: [],
    series: [
      {
        bucketKey: "2026-08-19",
        label: "Aug 19",
        startDate: "2026-08-19",
        endDate: "2026-08-19",
        count: 1,
        target: 1,
        metTarget: true,
      },
      {
        bucketKey: "2026-08-20",
        label: "Aug 20",
        startDate: "2026-08-20",
        endDate: "2026-08-20",
        count: 0,
        target: 1,
        metTarget: false,
      },
      {
        bucketKey: "2026-08-21",
        label: "Aug 21",
        startDate: "2026-08-21",
        endDate: "2026-08-21",
        count: 1,
        target: 1,
        metTarget: true,
      },
    ],
  },
  {
    id: "daily-context-any",
    name: "Context kept",
    description: "Make progress inside the active context.",
    current: 6,
    longest: 12,
    habitNames: ["Close the loop"],
    targetNames: ["crona-site / Dev"],
    series: [
      {
        bucketKey: "2026-08-19",
        label: "Aug 19",
        startDate: "2026-08-19",
        endDate: "2026-08-19",
        count: 2,
        target: 1,
        metTarget: true,
      },
      {
        bucketKey: "2026-08-20",
        label: "Aug 20",
        startDate: "2026-08-20",
        endDate: "2026-08-20",
        count: 1,
        target: 1,
        metTarget: true,
      },
      {
        bucketKey: "2026-08-21",
        label: "Aug 21",
        startDate: "2026-08-21",
        endDate: "2026-08-21",
        count: 2,
        target: 1,
        metTarget: true,
      },
    ],
  },
];

export const demoData = {
  repos,
  streams,
  issues,
  habits,
  sessions,
  habitHistory,
  checkIns,
  momentums,
};

export const activeDemoContext = {
  repoId: 1,
  streamId: 11,
  repoName: "crona-site",
  streamName: "Dev",
} as const;

export const findRepo = (id: number) => repos.find((repo) => repo.id === id);
export const findStream = (id: number) => streams.find((stream) => stream.id === id);
export const findIssue = (id: number) => issues.find((issue) => issue.id === id);
export const findHabit = (id: number) => habits.find((habit) => habit.id === id);
export const issuesForStream = (streamId: number) =>
  issues.filter((issue) => issue.streamId === streamId);
export const habitsForStream = (streamId: number) =>
  habits.filter((habit) => habit.streamId === streamId);
export const sessionsForIssue = (issueId: number) =>
  sessions.filter((session) => session.issueId === issueId);
export const historyForHabit = (habitId: number) =>
  habitHistory.filter((entry) => entry.habitId === habitId);
export const checkInForDate = (date: string) => checkIns.find((checkIn) => checkIn.date === date);
