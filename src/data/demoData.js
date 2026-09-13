export const student = {
  name: "Nishant",
  mastery: 78,
  streak: 7,
  questions: 126,
  learningTime: "18h 42m"
};

export const subjects = [
  { name: "Mathematics", icon: "π", mastery: 84, tone: "blue" },
  { name: "Science", icon: "⚗", mastery: 76, tone: "cyan" },
  { name: "English", icon: "▤", mastery: 91, tone: "pink" },
  { name: "Computer Science", icon: "</>", mastery: 68, tone: "purple" },
  { name: "Social Studies", icon: "◎", mastery: 72, tone: "teal" }
];

export const weakAreas = [
  { name: "Python Functions", mastery: 42, note: "You frequently struggle with parameters.", action: "Practice Now" },
  { name: "DBMS Normalization", mastery: 51, note: "2NF and 3NF questions need revision.", action: "Review Topic" },
  { name: "OSI Model", mastery: 58, note: "Layer responsibilities are getting mixed up.", action: "Take Quiz" }
];

export const activity = [
  { day: "Mon", study: 3.1, questions: 2, lessons: 1 },
  { day: "Tue", study: 5.2, questions: 3, lessons: 2 },
  { day: "Wed", study: 7.0, questions: 4, lessons: 2 },
  { day: "Thu", study: 4.1, questions: 3, lessons: 2 },
  { day: "Fri", study: 4.3, questions: 4, lessons: 2 },
  { day: "Sat", study: 5.6, questions: 5, lessons: 3 },
  { day: "Sun", study: 2.4, questions: 2, lessons: 2 }
];

export const recentActivity = [
  { icon: "✓", title: "Functions Lesson", detail: "Completed • Python Programming", time: "10:42 AM", type: "success" },
  { icon: "✓", title: "Python Quiz", detail: "Score: 8/10 • Functions", time: "11:05 AM", type: "success" },
  { icon: "✓", title: "Loops Practice", detail: "Score: 7/10 • Python Programming", time: "Yesterday", type: "info" },
  { icon: "✓", title: "DBMS Normalization Lesson", detail: "Completed • Database Management", time: "Yesterday", type: "success" }
];

export const achievements = [
  ["🔥", "7 Day Streak", "Study for 7 consecutive days", true],
  ["🎯", "First Quiz", "Complete your first quiz", true],
  ["🧠", "100 Questions", "Solve 100 questions", true],
  ["📚", "10 Lessons", "Complete 10 lessons", true],
  ["⚡", "90% Quiz Score", "Score 90% or higher", false],
  ["⭐", "Consistent Learner", "Maintain a learning streak", false],
  ["👑", "Subject Explorer", "Explore 5 subjects", false],
  ["💎", "Rising Star", "Reach 90% mastery", false]
];