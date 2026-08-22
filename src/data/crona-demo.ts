export type StreamVisibility = "private" | "shared";
export type IssueStatus =
  | "backlog"
  | "planned"
  | "ready"
  | "in_progress"
  | "blocked"
  | "in_review"
  | "done"
  | "abandoned";
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
  { id: 1, name: "Work", description: "The main work repository.", color: "#65d1c4" },
  { id: 2, name: "seed-qa", description: "Validation and quality work.", color: "#e5aa5c" },
];

export const streams: Stream[] = [
  {
    id: 11,
    repoId: 1,
    name: "Dev",
    description: "Active work development.",
    visibility: "private",
  },
  {
    id: 21,
    repoId: 2,
    name: "Dev",
    description: "Crona validation work.",
    visibility: "private",
  },
];

export const issues: Issue[] = [
  {
    id: 101,
    streamId: 11,
    repoName: "Work",
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
    streamId: 21,
    repoName: "seed-qa",
    streamName: "Dev",
    title: "Add responsive workflow demos",
    status: "ready",
    estimateMinutes: 45,
    workedSeconds: 0,
    pinnedDaily: true,
    todoForDate: demoToday,
  },
  {
    id: 103,
    streamId: 11,
    repoName: "Work",
    streamName: "Dev",
    title: "Refine the terminal wordmark",
    status: "done",
    estimateMinutes: 30,
    workedSeconds: 1920,
    pinnedDaily: true,
    todoForDate: undefined,
    completedAt: "2026-08-20T15:20:00Z",
  },
  {
    id: 104,
    streamId: 21,
    repoName: "seed-qa",
    streamName: "Dev",
    title: "Review habit history output",
    status: "planned",
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
    scheduleType: "daily",
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
  { id: 204, streamId: 21, name: "Review the queue", scheduleType: "daily", targetMinutes: 20, active: true },
];

export const legacySessions: Session[] = [
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

export const legacyHabitHistory: HabitHistoryEntry[] = [
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

export const legacyCheckIns: DailyCheckIn[] = [
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

const dateAtOffset = (daysFromToday: number) => {
  const date = new Date(`${demoToday}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + daysFromToday);
  return date;
};
const dateKey = (daysFromToday: number) => dateAtOffset(daysFromToday).toISOString().slice(0, 10);
const timestamp = (daysFromToday: number, hour: number, minute: number) => {
  const date = dateAtOffset(daysFromToday);
  date.setUTCHours(hour, minute, 0, 0);
  return date.toISOString();
};
const recentOffsets = Array.from({ length: 7 }, (_, index) => index - 6);

export const sessions: Session[] = recentOffsets.map((offset, index) => {
  const durationSeconds = 1800 + (index % 3) * 600;
  const startTime = timestamp(offset, 9 + (index % 3), 10);
  return {
    id: `session-${301 + index}`,
    issueId: index % 3 === 0 ? 103 : 101,
    source: index % 2 === 0 ? "tracked" : "manual",
    startTime,
    endTime: new Date(new Date(startTime).getTime() + durationSeconds * 1000).toISOString(),
    durationSeconds,
    notes: index % 2 === 0 ? "Moved the active work forward." : "Kept the context warm for the next pass.",
  };
});

const scheduledOn = (habit: Habit, date: Date) =>
  habit.scheduleType === "daily"
    ? true
    : habit.scheduleType === "weekdays"
      ? (habit.weekdays ?? []).includes(date.getUTCDay())
      : date.getUTCDay() === 1;

export const habitHistory: HabitHistoryEntry[] = recentOffsets.flatMap((offset, dayIndex) =>
  habits.filter((habit) => scheduledOn(habit, dateAtOffset(offset))).map((habit, habitIndex) => {
    const completed = (dayIndex + habitIndex) % 4 !== 1;
    const start = timestamp(offset, 8 + (habitIndex % 3), 15);
    const durationMinutes = completed ? habit.targetMinutes ?? 15 : 0;
    const stream = streams.find((item) => item.id === habit.streamId);
    const repo = repos.find((item) => item.id === stream?.repoId);
    return {
      id: 401 + dayIndex * habits.length + habitIndex,
      habitId: habit.id,
      habitName: habit.name,
      repoName: repo?.name,
      streamName: stream?.name,
      kind: habitIndex % 3 === 0 ? "focus" : "completion",
      date: dateKey(offset),
      status: completed ? "completed" : "failed",
      startedAt: completed ? start : undefined,
      endedAt: completed ? new Date(new Date(start).getTime() + durationMinutes * 60000).toISOString() : undefined,
      durationMinutes,
      notes: completed ? undefined : "Skipped while priorities shifted.",
      snapshotName: habit.name,
      snapshotDescription: habit.description,
      snapshotScheduleType: habit.scheduleType,
      snapshotWeekdays: habit.weekdays,
      snapshotTargetMinutes: habit.targetMinutes,
      createdAt: timestamp(offset, 12, 0),
      updatedAt: timestamp(offset, 12, 0),
    } satisfies HabitHistoryEntry;
  }),
);

export const checkIns: DailyCheckIn[] = recentOffsets.map((offset, index) => ({
  date: dateKey(offset),
  mood: 3 + (index % 3),
  energy: 3 + ((index + 1) % 3),
  sleepHours: 6.5 + (index % 4) * 0.5,
  sleepScore: 3 + (index % 3),
  screenTimeMinutes: 210 + (index % 4) * 35,
  notes: index === 6 ? "A focused start; keep the afternoon light." : "Keeping the next step visible.",
  createdAt: timestamp(offset, 8, 40),
  updatedAt: timestamp(offset, 8, 40),
}));

export const momentums: MomentumCard[] = [
  {
    id: "daily-reflection",
    name: "Daily reflection",
    description: "Keep a short daily check-in habit.",
    current: 4,
    longest: 9,
    habitNames: ["Plan the day"],
    targetNames: [],
    series: recentOffsets.map((offset) => ({
      bucketKey: dateKey(offset), label: dateAtOffset(offset).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
      startDate: dateKey(offset), endDate: dateKey(offset), count: checkIns.find((entry) => entry.date === dateKey(offset)) ? 1 : 0,
      target: 1, metTarget: true,
    })),
  },
];

export const legacyMomentums: MomentumCard[] = [
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

export interface DemoContext {
  repoId?: number;
  streamId?: number;
  repoName?: string;
  streamName?: string;
}

export const activeDemoContext: DemoContext | undefined = undefined;

export const contextForStream = (streamId: number): DemoContext => {
  const stream = findStream(streamId);
  const repo = stream ? findRepo(stream.repoId) : undefined;
  return { repoId: repo?.id, streamId: stream?.id, repoName: repo?.name, streamName: stream?.name };
};

export const issueMatchesContext = (issue: Issue, context?: DemoContext) => {
  if (!context) return true;
  if (context.streamId !== undefined) return issue.streamId === context.streamId;
  if (context.repoId !== undefined) {
    return streams.some((stream) => stream.id === issue.streamId && stream.repoId === context.repoId);
  }
  return true;
};

export const issuesDueForDate = (
  date: string,
  context?: DemoContext,
  dueDateOverrides: Record<number, string> = {},
) =>
  issues.filter(
    (issue) =>
      issue.pinnedDaily &&
      issueMatchesContext(issue, context) &&
      (dueDateOverrides[issue.id] ?? issue.todoForDate) === date,
  );

export const habitMatchesContext = (habit: Habit, context?: DemoContext) => {
  if (!context) return true;
  if (context.streamId !== undefined) return habit.streamId === context.streamId;
  if (context.repoId !== undefined) {
    return streams.some((stream) => stream.id === habit.streamId && stream.repoId === context.repoId);
  }
  return true;
};

export const habitsDueForDate = (date: string, context?: DemoContext) =>
  habits.filter((habit) => {
    if (!habit.active || !habitMatchesContext(habit, context)) return false;
    const value = new Date(`${date}T12:00:00Z`);
    if (habit.scheduleType === "daily") return true;
    if (habit.scheduleType === "weekdays") return (habit.weekdays ?? []).includes(value.getUTCDay());
    return value.getUTCDay() === 1;
  });

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
