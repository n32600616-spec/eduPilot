import React, { useEffect, useMemo, useState } from "react";
import {
  Bell, BookOpen, Bot, CheckCircle2, ChevronDown, ChevronRight, CircleHelp,
  Clock3, Code2, Flame, GraduationCap, LayoutDashboard, LogOut, Menu,
  Moon, Search, Settings, Sparkles, Target, Trophy, Users, X, Zap, BarChart3
} from "lucide-react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { activity, achievements, recentActivity, subjects, student, weakAreas } from "./data/demoData";

const navItems = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/learn", "Learn", BookOpen],
  ["/practice", "Practice", CheckCircle2],
  ["/mentor", "AI Mentor", Bot],
  ["/progress", "Progress", BarChart3],
  ["/goals", "Goals", Target],
  ["/resources", "Resources", BookOpen],
  ["/teachers", "For Teachers", Users]
];

function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("edupilot-theme") !== "light");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("edupilot-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className="app-shell">
      <Sidebar mobileOpen={mobileOpen} close={() => setMobileOpen(false)} />
      <div className="app-main">
        <Topbar onMenu={() => setMobileOpen(true)} dark={dark} setDark={setDark} />
        <Routes>
          <Route path="/" element={<NavigateToDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          
          <Route path="/learn/python/functions" element={<LessonDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/progress" element={<Placeholder title="Progress Analytics" text="Mastery, weak areas and learning history will live here." />} />
          <Route path="/goals" element={<Placeholder title="My Goals" text="Set learning goals and track milestones." />} />
          <Route path="/resources" element={<Placeholder title="Resources" text="Notes, videos, practice sheets and study material." />} />
          <Route path="/teachers" element={<Placeholder title="Teacher Dashboard" text="Class insights and AI-generated remedial quizzes." />} />
          <Route path="/settings" element={<Placeholder title="Settings" text="Manage your EduPilot preferences." />} />
          <Route path="*" element={<Placeholder title="Page not found" text="This route does not exist." />} />
        </Routes>
      </div>
    </div>
  );
}

function NavigateToDashboard() {
  const navigate = useNavigate();
  useEffect(() => navigate("/dashboard", { replace: true }), [navigate]);
  return null;
}

function Sidebar({ mobileOpen, close }) {
  const location = useLocation();
  return (
    <>
      {mobileOpen && <div className="mobile-backdrop" onClick={close} />}
      <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">🚀</div>
          <div><strong>Edu<span>Pilot</span></strong><small>Learn Today. Lead Tomorrow.</small></div>
          {mobileOpen && <button className="icon-btn mobile-close" onClick={close}><X size={20}/></button>}
        </div>
        <nav>
          {navItems.map(([path, label, Icon]) => (
            <Link key={path} to={path} onClick={close} className={`nav-link ${location.pathname === path ? "active" : ""}`}>
              <Icon size={19}/><span>{label}</span>
              {label === "AI Mentor" && <span className="online-dot" />}
            </Link>
          ))}
        </nav>
        <div className="sidebar-divider" />
        <Link to="/settings" className="nav-link" onClick={close}><Settings size={19}/><span>Settings</span></Link>
        <button className="nav-link nav-button"><CircleHelp size={19}/><span>Help & Support</span></button>
        <div className="upgrade-card">
          <div className="upgrade-icon">👑</div>
          <strong>Upgrade Your<br/><span>Learning Journey</span></strong>
          <p>Unlock advanced features and personalized AI guidance.</p>
          <button onClick={() => alert("Premium demo: payment is not enabled.")}>Go Premium <ChevronRight size={15}/></button>
        </div>
      </aside>
    </>
  );
}

function Topbar({ onMenu, dark, setDark }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ["Python Programming", "Functions", "Mathematics", "Science", "OSI Model", "DBMS Normalization"]
      .filter(x => x.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    const handler = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.querySelector(".global-search input")?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="topbar">
      <button className="icon-btn hamburger" onClick={onMenu}><Menu size={22}/></button>
      <div className="global-search">
        <Search size={18}/>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search subjects, lessons, or ask EduPilot..." />
        <kbd>Ctrl K</kbd>
        {results.length > 0 && (
          <div className="search-results">
            {results.map(r => <button key={r} onClick={() => { setQuery(""); navigate(r === "Functions" || r === "Python Programming" ? "/learn" : "/learn"); }}>{r}<ChevronRight size={15}/></button>)}
          </div>
        )}
      </div>
      <div className="top-actions">
        <button className="icon-btn" onClick={() => setDark(!dark)} title="Toggle theme"><Moon size={19}/></button>
        <div className="relative">
          <button className="icon-btn notification" onClick={() => setNoticeOpen(!noticeOpen)}><Bell size={19}/><i /></button>
          {noticeOpen && <div className="dropdown notice"><strong>Notifications</strong><p>🎯 Your Functions practice is ready.</p><p>🔥 Keep your 7-day streak alive!</p></div>}
        </div>
        <div className="relative">
          <button className="profile" onClick={() => setProfileOpen(!profileOpen)}>
            <div className="avatar">N</div><div><strong>Nishant</strong><small>Student</small></div><ChevronDown size={15}/>
          </button>
          {profileOpen && <div className="dropdown profile-menu"><Link to="/settings">Profile & Settings</Link><button><LogOut size={15}/> Logout</button></div>}
        </div>
      </div>
    </header>
  );
}

function Dashboard() {
  return (
    <main className="dashboard">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">WELCOME BACK, NISHANT 👋</span>
          <h1>Keep Learning,<br/>Keep <em>Growing!</em></h1>
          <p>Your AI-powered learning companion to help you study smarter, practice better and achieve more.</p>
          <div className="hero-actions">
            <Link className="primary-btn" to="/learn">Continue Learning <ChevronRight size={17}/></Link>
            <Link className="secondary-btn" to="/mentor"><Bot size={17}/> Ask AI Mentor</Link>
          </div>
        </div>
        <div className="hero-art">
          <div className="sparkle s1">✦</div><div className="sparkle s2">✦</div>
          <div className="robot">🤖</div>
          <div className="floating-note">Small steps<br/><strong>Big progress!</strong></div>
          <div className="sunset-window" />
        </div>
      </section>

      <section className="stats-grid">
        <Stat icon={<BarChart3/>} value={`${student.mastery}%`} label="Overall Mastery" meta="↑ 12% this week" />
        <Stat icon={<Flame/>} value={`${student.streak} days`} label="Current Streak" meta="Keep it going!" />
        <Stat icon={<CheckCircle2/>} value={student.questions} label="Questions Solved" meta="↑ 18 this week" />
        <Stat icon={<Clock3/>} value={student.learningTime} label="Learning Time" meta="This month" />
      </section>

      <section className="two-col">
        <Card title="Continue Learning" subtitle="Pick up where you left off" action="View All →">
          <div className="course-row">
            <div className="python-icon">🐍</div>
            <div className="course-info">
              <h3>Python Programming</h3>
              <p>Functions · Chapter 4 · 3 lessons left</p>
              <div className="progress-line"><span style={{width:"78%"}} /></div>
            </div>
            <strong>78%</strong>
          </div>
          <Link className="primary-btn compact" to="/learn/python/functions">Continue Learning <ChevronRight size={16}/></Link>
        </Card>

        <Card title="AI Insight" subtitle="Personalized for your learning">
          <div className="ai-insight">
            <div className="ai-bulb"><Sparkles size={22}/></div>
            <div>
              <p>You're improving in Loops, but <strong>Functions</strong> need more practice. Keep going! 💪</p>
              <Link className="secondary-btn compact" to="/mentor"><Bot size={16}/> Ask EduPilot <ChevronRight size={15}/></Link>
            </div>
            <div className="mini-robot">🤖</div>
          </div>
        </Card>
      </section>

      <section className="two-col lower">
        <Card title="Weekly Activity" subtitle="Your learning activity over the last 7 days" action="This Week ▾">
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activity} barGap={5}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(130,150,190,.13)" />
                <XAxis dataKey="day" tick={{fill:"currentColor",fontSize:12}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fill:"currentColor",fontSize:11}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{background:"#0b1427",border:"1px solid rgba(145,112,255,.35)",borderRadius:12,color:"#fff"}}/>
                <Bar dataKey="study" name="Study time" radius={[6,6,0,0]} fill="#7b5cff"/>
                <Bar dataKey="questions" name="Questions" radius={[6,6,0,0]} fill="#2e8cff"/>
                <Bar dataKey="lessons" name="Lessons" radius={[6,6,0,0]} fill="#20d8cf"/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Subject Mastery" subtitle="Your current performance" action="View Details →">
          <div className="mastery-list">
            {subjects.map(s => <div className="mastery-item" key={s.name}><span className={`subject-icon ${s.tone}`}>{s.icon}</span><div><div className="mastery-top"><strong>{s.name}</strong><span>{s.mastery}%</span></div><div className="progress-line"><span style={{width:`${s.mastery}%`}} /></div></div></div>)}
          </div>
        </Card>
      </section>

      <section className="two-col lower">
        <Card title="Weak Areas" subtitle="Topics that need more attention" action="View All →">
          <div className="weak-list">
            {weakAreas.map(w => <div className="weak-item" key={w.name}><div className="weak-main"><span className="warning-icon">!</span><div><strong>{w.name}</strong><small>{w.note}</small></div></div><div className="weak-score">{w.mastery}%</div><Link className="tiny-btn" to="/practice">{w.action}</Link></div>)}
          </div>
        </Card>

        <Card title="Recommended Next Step" subtitle="AI recommendation">
          <div className="recommendation">
            <div className="target-icon"><Target size={25}/></div>
            <div><h3>Spend 15 minutes practicing Python Functions.</h3><p>Build confidence here before moving to OOP.</p><Link className="primary-btn compact" to="/practice">Start Practice <ChevronRight size={16}/></Link></div>
          </div>
        </Card>
      </section>

      <section className="two-col lower">
        <Card title="Recent Activity" action="View All →">
          <div className="activity-list">
            {recentActivity.map((a,i) => <div className="activity-item" key={i}><span className={`activity-dot ${a.type}`}>{a.icon}</span><div><strong>{a.title}</strong><small>{a.detail}</small></div><time>{a.time}</time></div>)}
          </div>
        </Card>
        <Card title="Achievements" action="View All →">
          <div className="achievement-grid">
            {achievements.map(([icon,name,desc,unlocked]) => <Achievement key={name} icon={icon} name={name} desc={desc} unlocked={unlocked}/>)}
          </div>
        </Card>
      </section>

      <section className="final-cta">
        <div><span>READY FOR WHAT'S NEXT?</span><h2>Let’s Build a <em>Brighter You!</em></h2><p>Keep learning, keep exploring and get closer to your goals with EduPilot.</p><Link className="primary-btn" to="/learn">Explore More <ChevronRight size={17}/></Link></div>
        <div className="cta-scenery"><div className="mountain" /><div className="student-silhouette">🎒</div></div>
      </section>

      <footer className="footer"><div className="footer-brand"><strong>🚀 Edu<span>Pilot</span></strong><small>Learn Today. Lead Tomorrow.</small></div><div className="footer-links"><span>About</span><span>Blog</span><span>Contact</span><span>Privacy</span><span>Terms</span></div><div className="footer-copy">Made with ❤️ for learners<br/>© 2026 EduPilot. All rights reserved.</div></footer>
    </main>
  );
}

function Stat({icon,value,label,meta}) {
  return <div className="stat-card"><div className="stat-icon">{icon}</div><div><strong>{value}</strong><span>{label}</span><small>{meta}</small></div></div>
}
function Card({title,subtitle,action,children}) {
  return <section className="panel"><div className="panel-head"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action && <button className="panel-action">{action}</button>}</div>{children}</section>
}
function Achievement({icon,name,desc,unlocked}) {
  return <button className={`achievement ${unlocked ? "unlocked":""}`} onClick={() => alert(`${name}\\n${desc}`)}><span>{icon}</span><strong>{name}</strong><small>{unlocked ? "Unlocked" : "Locked"}</small></button>
}
function Learn() {
  const [selectedSubject, setSelectedSubject] = useState("Computer Science");
  const [search, setSearch] = useState("");

  const subjects = [
    { name: "Computer Science", icon: "💻", progress: 78 },
    { name: "Mathematics", icon: "📐", progress: 72 },
    { name: "Science", icon: "🔬", progress: 65 },
    { name: "English", icon: "📚", progress: 84 },
    { name: "Social Studies", icon: "🌍", progress: 58 }
  ];

  const chapters = {
    "Computer Science": [
      {
        title: "Python Programming",
        lessons: [
          "Variables & Data Types",
          "Conditional Statements",
          "Loops",
          "Functions",
          "Lists & Dictionaries"
        ]
      },
      {
        title: "Database Management",
        lessons: [
          "Introduction to DBMS",
          "SQL Basics",
          "Normalization",
          "Keys & Relationships"
        ]
      },
      {
        title: "Computer Networks",
        lessons: [
          "Introduction to Networks",
          "OSI Model",
          "TCP/IP",
          "Network Security"
        ]
      }
    ],

    Mathematics: [
      {
        title: "Algebra",
        lessons: [
          "Linear Equations",
          "Quadratic Equations",
          "Polynomials",
          "Sequences"
        ]
      },
      {
        title: "Calculus",
        lessons: [
          "Limits",
          "Derivatives",
          "Applications of Derivatives",
          "Integration"
        ]
      }
    ],

    Science: [
      {
        title: "Physics",
        lessons: [
          "Motion",
          "Force & Laws of Motion",
          "Work & Energy",
          "Electricity"
        ]
      },
      {
        title: "Chemistry",
        lessons: [
          "Atoms & Molecules",
          "Chemical Reactions",
          "Acids & Bases",
          "Periodic Table"
        ]
      }
    ],

    English: [
      {
        title: "Grammar",
        lessons: [
          "Parts of Speech",
          "Tenses",
          "Active & Passive Voice",
          "Direct & Indirect Speech"
        ]
      },
      {
        title: "Writing",
        lessons: [
          "Essay Writing",
          "Letter Writing",
          "Story Writing"
        ]
      }
    ],

    "Social Studies": [
      {
        title: "History",
        lessons: [
          "Ancient Civilizations",
          "Medieval India",
          "Modern India"
        ]
      },
      {
        title: "Geography",
        lessons: [
          "Earth & Maps",
          "Climate",
          "Natural Resources"
        ]
      }
    ]
  };

  const currentChapters = chapters[selectedSubject] || [];

  const filteredChapters = currentChapters
    .map(chapter => ({
      ...chapter,
      lessons: chapter.lessons.filter(lesson =>
        `${chapter.title} ${lesson}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    }))
    .filter(chapter => chapter.lessons.length > 0);

  return (
    <main className="learn-page">

      <section className="learn-hero">
        <div>
          <div className="eyebrow">
            <Sparkles size={15} />
            PERSONALIZED LEARNING
          </div>

          <h1>
            Learn smarter.
            <span> Grow faster.</span>
          </h1>

          <p>
            Explore subjects, master concepts and learn at your own pace
            with EduPilot.
          </p>
        </div>

        <div className="learn-hero-card">
          <Bot size={22} />
          <div>
            <strong>AI Recommendation</strong>
            <span>Continue with Python Functions</span>
          </div>
        </div>
      </section>

      <div className="learn-search">
        <Search size={19} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chapters or lessons..."
        />
        {search && (
          <button onClick={() => setSearch("")}>
            <X size={17} />
          </button>
        )}
      </div>

      <section className="subject-section">
        <div className="section-heading">
          <div>
            <h2>Choose a subject</h2>
            <p>Pick a subject to continue learning.</p>
          </div>
        </div>

        <div className="subject-grid">
          {subjects.map(subject => (
            <button
              key={subject.name}
              className={`subject-card ${
                selectedSubject === subject.name ? "active" : ""
              }`}
              onClick={() => {
                setSelectedSubject(subject.name);
                setSearch("");
              }}
            >
              <div className="subject-icon">
                {subject.icon}
              </div>

              <div className="subject-info">
                <strong>{subject.name}</strong>

                <div className="subject-progress">
                  <div>
                    <span>Mastery</span>
                    <b>{subject.progress}%</b>
                  </div>

                  <div className="progress-track">
                    <div
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <ChevronRight size={18} />
            </button>
          ))}
        </div>
      </section>

      <div className="learn-content">

        <section className="chapters-section">
          <div className="section-heading">
            <div>
              <h2>{selectedSubject}</h2>
              <p>Chapters & lessons</p>
            </div>
          </div>

          {filteredChapters.map((chapter, chapterIndex) => (
            <div className="chapter-card" key={chapter.title}>

              <div className="chapter-header">
                <div className="chapter-number">
                  {String(chapterIndex + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3>{chapter.title}</h3>
                  <span>
                    {chapter.lessons.length} lessons
                  </span>
                </div>
              </div>

              <div className="lesson-list">
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <button
                    key={lesson}
                    className="lesson-row"
                    onClick={() => {
                      if (
                        selectedSubject === "Computer Science" &&
                        lesson === "Functions"
                      ) {
                        window.location.href =
                          "/learn/python/functions";
                      }
                    }}
                  >
                    <div className="lesson-left">
                      <div className="lesson-number">
                        {lessonIndex + 1}
                      </div>

                      <div>
                        <strong>{lesson}</strong>
                        <span>
                          {lesson === "Functions"
                            ? "Recommended • 12 min"
                            : "Lesson • 10 min"}
                        </span>
                      </div>
                    </div>

                    <ChevronRight size={17} />
                  </button>
                ))}
              </div>
            </div>
          ))}

          {filteredChapters.length === 0 && (
            <div className="empty-learn">
              <Search size={30} />
              <h3>No lessons found</h3>
              <p>Try another search.</p>
            </div>
          )}
        </section>

        <aside className="learn-sidebar">

          <div className="learn-ai-card">
            <div className="ai-card-icon">
              <Sparkles size={20} />
            </div>

            <span className="ai-label">AI RECOMMENDATION</span>

            <h3>Strengthen Python Functions</h3>

            <p>
              Your recent practice shows that parameters and
              return values need more attention.
            </p>

            <button
              onClick={() =>
                window.location.href = "/learn/python/functions"
              }
            >
              Start Recommended Lesson
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="continue-card">
            <span>CONTINUE LEARNING</span>

            <h3>Python Functions</h3>

            <p>Computer Science • 42% complete</p>

            <div className="progress-track">
              <div style={{ width: "42%" }} />
            </div>

            <button
              onClick={() =>
                window.location.href = "/learn/python/functions"
              }
            >
              Continue
              <ChevronRight size={17} />
            </button>
          </div>

        </aside>

      </div>
    </main>
  );
}
function LessonDetail() {
  const [activeTab, setActiveTab] = useState("learn");

  return (
    <main className="lesson-page">

      <div className="lesson-breadcrumb">
        <Link to="/learn">Learn</Link>
        <ChevronRight size={14} />
        <span>Python Programming</span>
        <ChevronRight size={14} />
        <span>Functions</span>
      </div>

      <section className="lesson-header">
        <div>
          <div className="eyebrow">
            <Code2 size={15} />
            COMPUTER SCIENCE • PYTHON
          </div>

          <h1>Python Functions</h1>

          <p>
            Learn how to create reusable blocks of code using
            functions, parameters and return values.
          </p>
        </div>

        <div className="lesson-progress">
          <span>Lesson Progress</span>
          <strong>42%</strong>

          <div className="progress-track">
            <div style={{ width: "42%" }} />
          </div>
        </div>
      </section>

      <div className="lesson-layout">

        <section className="lesson-main">

          <div className="lesson-tabs">
            <button
              className={activeTab === "learn" ? "active" : ""}
              onClick={() => setActiveTab("learn")}
            >
              <BookOpen size={16} />
              Learn
            </button>

            <button
              className={activeTab === "example" ? "active" : ""}
              onClick={() => setActiveTab("example")}
            >
              <Code2 size={16} />
              Example
            </button>

            <button
              className={activeTab === "remember" ? "active" : ""}
              onClick={() => setActiveTab("remember")}
            >
              <Sparkles size={16} />
              Remember
            </button>
          </div>

          {activeTab === "learn" && (
            <div className="lesson-content card">

              <div className="concept-label">
                CONCEPT
              </div>

              <h2>What is a function?</h2>

              <p>
                A function is a reusable block of code that performs
                a specific task. Instead of writing the same code
                repeatedly, you can put it inside a function and
                call it whenever you need it.
              </p>

              <div className="info-box">
                <Sparkles size={18} />

                <div>
                  <strong>Think of it like this</strong>
                  <p>
                    A function is like a small machine. You give it
                    some input, it performs a task, and it can give
                    you an output.
                  </p>
                </div>
              </div>

              <h2>Creating a function</h2>

              <p>
                Python uses the <code>def</code> keyword to create
                a function.
              </p>

              <div className="code-block">
                <div className="code-header">
                  <span>Python</span>

                  <button
                    onClick={() =>
                      navigator.clipboard?.writeText(
`def add(a, b):
    return a + b`
                      )
                    }
                  >
                    Copy
                  </button>
                </div>

                <pre>{`def add(a, b):
    return a + b`}</pre>
              </div>

              <h2>Parameters and return values</h2>

              <div className="key-points">

                <div>
                  <span>01</span>
                  <strong>Parameters</strong>
                  <p>
                    Parameters are values that a function receives
                    as input.
                  </p>
                </div>

                <div>
                  <span>02</span>
                  <strong>Return value</strong>
                  <p>
                    The return statement sends a result back to
                    the code that called the function.
                  </p>
                </div>

              </div>

            </div>
          )}

          {activeTab === "example" && (
            <div className="lesson-content card">

              <div className="concept-label">
                WORKED EXAMPLE
              </div>

              <h2>Calling a function</h2>

              <p>
                Once a function is created, you can call it by
                writing its name and providing the required values.
              </p>

              <div className="code-block">
                <div className="code-header">
                  <span>Python</span>
                </div>

                <pre>{`def greet(name):
    return "Hello " + name

message = greet("Nishant")

print(message)`}</pre>
              </div>

              <div className="info-box">
                <CheckCircle2 size={18} />

                <div>
                  <strong>Output</strong>
                  <p>Hello Nishant</p>
                </div>
              </div>

            </div>
          )}

          {activeTab === "remember" && (
            <div className="lesson-content card">

              <div className="concept-label">
                QUICK REVISION
              </div>

              <h2>Remember these 3 things</h2>

              <div className="key-points">

                <div>
                  <span>01</span>
                  <strong>def</strong>
                  <p>
                    Used to define a Python function.
                  </p>
                </div>

                <div>
                  <span>02</span>
                  <strong>Parameters</strong>
                  <p>
                    Allow functions to receive input.
                  </p>
                </div>

                <div>
                  <span>03</span>
                  <strong>return</strong>
                  <p>
                    Sends a result back from the function.
                  </p>
                </div>

              </div>

            </div>
          )}

        </section>

        <aside className="lesson-sidebar">

          <div className="lesson-ai-card card">

            <div className="ai-card-icon">
              <Bot size={21} />
            </div>

            <span className="ai-label">
              AI MENTOR
            </span>

            <h3>Need help understanding?</h3>

            <p>
              Ask EduPilot's AI Mentor to explain this concept
              in a simpler way.
            </p>

            <button
              onClick={() => window.location.href = "/mentor"}
            >
              Ask AI Mentor
              <ChevronRight size={17} />
            </button>

          </div>

          <div className="lesson-next card">

            <span>NEXT STEP</span>

            <h3>Test your understanding</h3>

            <p>
              Answer a few adaptive questions based on this lesson.
            </p>

            <button
              onClick={() => window.location.href = "/practice"}
            >
              Start Practice
              <ChevronRight size={17} />
            </button>

          </div>

        </aside>

      </div>

    </main>
  );
}
function Practice() {
  const questions = [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "define", "def", "func"],
      answer: 2,
      explanation: "Python uses the `def` keyword to define a function."
    },
    {
      question: "What will add(3, 4) return?",
      options: ["34", "7", "12", "Error"],
      answer: 1,
      explanation: "The function adds 3 and 4, so the result is 7."
    },
    {
      question: "What are values passed into a function called?",
      options: ["Arguments", "Loops", "Classes", "Modules"],
      answer: 0,
      explanation: "Values passed to a function when calling it are called arguments."
    },
    {
      question: "Which statement sends a value back from a function?",
      options: ["send", "return", "output", "break"],
      answer: 1,
      explanation: "The `return` statement sends a result back to the caller."
    },
    {
      question: "What does this function return?\n\ndef square(x):\n    return x * x",
      options: ["x + x", "x", "x × x", "Nothing"],
      answer: 2,
      explanation: "The function multiplies x by itself, so it returns x × x."
    }
  ];

  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
const [aiFeedback, setAiFeedback] = useState("");
const [mistakes, setMistakes] = useState([]);
  const question = questions[current];

  const checkAnswer = async () => {
  if (selected === null || checked) return;

  setChecked(true);

if (selected === question.answer) {
  setScore(prev => prev + 1);
} else {
  setMistakes(prev => [
    ...prev,
    {
      question: question.question,
      selectedAnswer: question.options[selected],
      correctAnswer: question.options[question.answer]
    }
  ]);
}

  setAiFeedback("Analyzing your answer...");

  try {
    const response = await fetch("http://localhost:5000/api/mentor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: `
You are EduPilot AI Mentor.

Analyze this student's practice answer.

Topic: Python Functions
Question: ${question.question}
Options:
${question.options.map((option, index) => `${index}: ${option}`).join("\n")}

Student selected: ${question.options[selected]}
Correct answer: ${question.options[question.answer]}
Basic explanation: ${question.explanation}
Previous mistakes:
${mistakes.length === 0
  ? "No previous mistakes."
  : mistakes.map((m, i) =>
      `${i + 1}. Question: ${m.question}
Student answer: ${m.selectedAnswer}
Correct answer: ${m.correctAnswer}`
    ).join("\n")}
Give short, beginner-friendly feedback.

If the student is wrong:
1. Explain why their answer is wrong.
2. Explain the correct concept simply.
3. Give one small tip to avoid this mistake.

If the student is correct:
1. Explain why the answer is correct.
2. Give one useful tip to remember the concept.

Keep the response under 100 words.
If previous mistakes show a pattern, focus your feedback on that weak area.
        `
      })
    });

    const data = await response.json();

    if (data.success) {
      setAiFeedback(data.reply);
    } else {
      setAiFeedback("AI feedback is temporarily unavailable.");
    }
  } catch (error) {
    console.error("AI feedback error:", error);
    setAiFeedback("AI feedback is temporarily unavailable.");
  }
};

  const nextQuestion = () => {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent(prev => prev + 1);
    setSelected(null);
    setChecked(false);
    setAiFeedback("");
  };

  const restart = () => {
    setStarted(false);
    setCurrent(0);
    setSelected(null);
    setChecked(false);
    setAiFeedback("");
    setScore(0);
    setFinished(false);
  };

  if (!started) {
    return (
      <main className="practice-page">
        <section className="practice-start card">

          <div className="practice-icon">
            <Target size={30} />
          </div>

          <div className="eyebrow">
            <Sparkles size={14} />
            SMART PRACTICE
          </div>

          <h1>Test your understanding</h1>

          <p>
            Practice Python Functions with questions designed
            to check your understanding.
          </p>

          <div className="practice-meta">
            <div>
              <strong>5</strong>
              <span>Questions</span>
            </div>

            <div>
              <strong>Adaptive</strong>
              <span>Difficulty</span>
            </div>

            <div>
              <strong>~5 min</strong>
              <span>Estimated</span>
            </div>
          </div>

          <button
            className="primary-practice-btn"
            onClick={() => setStarted(true)}
          >
            Start Practice
            <ChevronRight size={18} />
          </button>

        </section>
      </main>
    );
  }

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    return (
      <main className="practice-page">

        <section className="practice-result card">

          <div className="result-icon">
            <Trophy size={34} />
          </div>

          <span className="eyebrow">
            PRACTICE COMPLETE
          </span>

          <h1>
            {percentage >= 80
              ? "Excellent work! 🎉"
              : percentage >= 60
              ? "Good progress! 💪"
              : "Keep practicing! 🚀"}
          </h1>

          <div className="score-circle">
            <strong>{percentage}%</strong>
            <span>Score</span>
          </div>

          <div className="result-stats">

            <div>
              <CheckCircle2 size={19} />
              <strong>{score}</strong>
              <span>Correct</span>
            </div>

            <div>
              <CircleHelp size={19} />
              <strong>{questions.length - score}</strong>
              <span>Incorrect</span>
            </div>

            <div>
              <Target size={19} />
              <strong>{questions.length}</strong>
              <span>Total</span>
            </div>

          </div>

          <div className="feedback-card">
            <Sparkles size={18} />

            <div>
              <strong>EduPilot Feedback</strong>

              <p>
                {percentage >= 80
                  ? "You have a strong understanding of Python Functions. Try a harder set next."
                  : percentage >= 60
                  ? "You understand the basics. Review parameters and return values once more."
                  : "Let's strengthen the fundamentals. Revisit the lesson and try again."}
              </p>
            </div>
          </div>

          <div className="result-actions">
            <button onClick={restart}>
              Practice Again
            </button>

            <button
              onClick={() =>
                window.location.href = "/mentor"
              }
            >
              <Bot size={17} />
              Ask AI Mentor
            </button>
          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="practice-page">

      <div className="practice-top">

        <div>
          <span className="eyebrow">
            COMPUTER SCIENCE • PYTHON
          </span>

          <h1>Python Functions</h1>
        </div>

        <div className="question-count">
          {current + 1} / {questions.length}
        </div>

      </div>

      <div className="question-progress">
        <div
          style={{
            width: `${((current + 1) / questions.length) * 100}%`
          }}
        />
      </div>

      <section className="question-layout">

        <div className="question-card card">

          <span className="question-label">
            QUESTION {current + 1}
          </span>

          <h2>
            {question.question}
          </h2>

          <div className="answer-options">

            {question.options.map((option, index) => {

              let className = "answer-option";

              if (selected === index) {
                className += " selected";
              }

              if (checked && index === question.answer) {
                className += " correct";
              }

              if (
                checked &&
                selected === index &&
                selected !== question.answer
              ) {
                className += " wrong";
              }

              return (
                <button
                  key={option}
                  className={className}
                  onClick={() => {
                    if (!checked) {
                      setSelected(index);
                    }
                  }}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option}</span>

                  {checked && index === question.answer && (
                    <CheckCircle2 size={19} />
                  )}
                </button>
              );
            })}

          </div>

          {checked && (
            <div className="question-explanation">

              {selected === question.answer ? (
                <CheckCircle2 size={20} />
              ) : (
                <CircleHelp size={20} />
              )}

              <div>
                <strong>
                  {selected === question.answer
                    ? "Correct!"
                    : "Not quite."}
                </strong>

                <p>{question.explanation}</p>
                {aiFeedback && (
  <div className="ai-feedback-box">
    <div className="ai-feedback-title">
      <Sparkles size={16} />
      <strong>AI Mentor Feedback</strong>
    </div>

    <p>{aiFeedback}</p>
  </div>
)}
              </div>

            </div>
          )}

          <div className="question-actions">

            {!checked ? (
              <button
                className="primary-practice-btn"
                disabled={selected === null}
                onClick={checkAnswer}
              >
                Check Answer
                <ChevronRight size={18} />
              </button>
            ) : (
              <button
                className="primary-practice-btn"
                onClick={nextQuestion}
              >
                {current === questions.length - 1
                  ? "See Results"
                  : "Next Question"}
                <ChevronRight size={18} />
              </button>
            )}

          </div>

        </div>

        <aside className="practice-side">

          <div className="card practice-side-card">

            <div className="side-title">
              <Zap size={18} />
              Smart Practice
            </div>

            <p>
              Questions are focused on the topic you're
              currently learning.
            </p>

            <div className="practice-topic">
              <span>Topic</span>
              <strong>Python Functions</strong>
            </div>

            <div className="practice-topic">
              <span>Mode</span>
              <strong>Adaptive</strong>
            </div>

          </div>

        </aside>

      </section>

    </main>
  );
}
function Mentor() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm your EduPilot AI Mentor 👋\nI can explain concepts, help with mistakes, and create practice questions for you."
    }
  ]);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const suggestions = [
    "Explain Python Functions simply",
    "Why do I make mistakes in parameters?",
    "Give me a practice question",
    "Explain OSI Model"
  ];

  const sendMessage = (value = input) => {
    const text = value.trim();

    if (!text || typing) return;

    setMessages(prev => [
      ...prev,
      {
        role: "user",
        text
      }
    ]);

    setInput("");
    setTyping(true);

fetch("http://localhost:5000/api/mentor", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: text
  })
})
  .then(async response => {
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }

    return data;
  })
  .then(data => {
    setMessages(prev => [
      ...prev,
      {
        role: "ai",
        text: data.reply
      }
    ]);
  })
  .catch(error => {
    console.error("Mentor error:", error);

    setMessages(prev => [
      ...prev,
      {
        role: "ai",
        text: "Sorry, I couldn't connect to the AI Mentor right now. Please try again."
      }
    ]);
  })
  .finally(() => {
    setTyping(false);
  });
  };

  return (
    <main className="mentor-page">

      {/* HEADER */}
      <section className="mentor-heading">
        <div>
          <div className="eyebrow">
            <Bot size={15} />
            PERSONAL AI TUTOR
          </div>

          <h1>
            Your AI <span>Mentor</span>
          </h1>

          <p>
            Learn concepts, understand mistakes and get
            personalized guidance whenever you need it.
          </p>
        </div>

        <div className="mentor-online">
          <span></span>
          Mentor Online
        </div>
      </section>

      <div className="mentor-grid">

        {/* CHAT */}
        <section className="mentor-chat card">

          <div className="mentor-chat-header">

            <div className="mentor-avatar">
              <Bot size={22} />
            </div>

            <div>
              <strong>EduPilot Mentor</strong>
              <span>Personalized learning assistant</span>
            </div>

          </div>

          <div className="mentor-messages">

            {messages.map((message, index) => (
              <div
                key={index}
                className={`mentor-message ${message.role}`}
              >

                {message.role === "ai" && (
                  <div className="small-avatar">
                    <Bot size={15} />
                  </div>
                )}

                <div className="mentor-bubble">
                  {message.text.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </div>

              </div>
            ))}

            {typing && (
              <div className="mentor-message ai">

                <div className="small-avatar">
                  <Bot size={15} />
                </div>

                <div className="typing-bubble">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

              </div>
            )}

          </div>

          {/* SUGGESTIONS */}
          <div className="mentor-suggestions">

            {suggestions.map(item => (
              <button
                key={item}
                onClick={() => sendMessage(item)}
              >
                <Sparkles size={13} />
                {item}
              </button>
            ))}

          </div>

          {/* INPUT */}
          <div className="mentor-input">

            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask your mentor anything..."
            />

            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || typing}
            >
              <ChevronRight size={20} />
            </button>

          </div>

          <div className="mentor-note">
            <Sparkles size={12} />
            AI responses will be powered by DeepSeek.
          </div>

        </section>

        {/* CONTEXT SIDEBAR */}
        <aside className="mentor-sidebar">

          <div className="card mentor-context-card">

            <div className="mentor-side-title">
              <Target size={17} />
              Your Learning Context
            </div>

            <div className="context-item">
              <span>Current Subject</span>
              <strong>Computer Science</strong>
            </div>

            <div className="context-item">
              <span>Current Topic</span>
              <strong>Python Functions</strong>
            </div>

            <div className="context-item">
              <span>Current Mastery</span>
              <strong>78%</strong>
            </div>

          </div>

          <div className="card mentor-insight">

            <div className="mentor-side-title">
              <Sparkles size={17} />
              Learning Insight
            </div>

            <div className="insight-icon">
              <Zap size={18} />
            </div>

            <h3>Focus on Parameters</h3>

            <p>
              Your recent learning activity suggests that
              parameters and return values deserve more practice.
            </p>

            <button
              onClick={() =>
                window.location.href = "/practice"
              }
            >
              Practice This Topic
              <ChevronRight size={16} />
            </button>

          </div>

          <div className="card mentor-tools">

            <div className="mentor-side-title">
              <Zap size={17} />
              Mentor Tools
            </div>

            <button onClick={() => sendMessage("Explain Python Functions simply")}>
              <BookOpen size={16} />
              Explain a concept
            </button>

            <button onClick={() => sendMessage("Give me a practice question")}>
              <Target size={16} />
              Generate practice
            </button>

            <button onClick={() => sendMessage("Why do I make mistakes in parameters?")}>
              <CircleHelp size={16} />
              Understand my mistakes
            </button>

          </div>

        </aside>

      </div>

    </main>
  );
}
function Placeholder({title,text}) {
  return <main className="placeholder"><div className="placeholder-icon"><Sparkles size={30}/></div><span className="eyebrow">EDUPILOT MODULE</span><h1>{title}</h1><p>{text}</p><Link className="primary-btn" to="/dashboard">Back to Dashboard</Link></main>
}

export default App;