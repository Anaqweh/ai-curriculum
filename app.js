// ============================================================
// منهج الذكاء الاصطناعي - PWA
// ============================================================

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}

// ============================================================
// DATA
// ============================================================
const curriculum = [
  {
    id: 1, title: "ما هو الذكاء الاصطناعي؟", icon: "🤖", color: "#6C63FF",
    content: [
      { type: "p", text: "الذكاء الاصطناعي (AI) هو قدرة الحاسوب على تنفيذ مهام تتطلب عادةً ذكاءً بشرياً، مثل التعلم والتفكير وحل المشكلات." },
      { type: "h3", text: "أمثلة من حياتنا اليومية" },
      { type: "li", text: "المساعد الصوتي (سيري، أليكسا)" },
      { type: "li", text: "التوصيات في يوتيوب وسبوتيفاي" },
      { type: "li", text: "فلاتر الكاميرا الذكية" },
      { type: "li", text: "الترجمة الفورية" },
      { type: "h3", text: "متى بدأ الذكاء الاصطناعي؟" },
      { type: "p", text: "بدأت فكرة الذكاء الاصطناعي في الخمسينيات عندما طرح العالم آلان تورينج سؤاله الشهير: هل يمكن للآلة أن تفكر؟" },
    ],
    quiz: [
      { q: "ما هو الذكاء الاصطناعي؟", options: ["برنامج ألعاب فقط", "قدرة الحاسوب على تنفيذ مهام تشبه الذكاء البشري", "نوع من الإنترنت", "جهاز حاسوب خاص"], answer: 1 },
      { q: "من طرح سؤال 'هل يمكن للآلة أن تفكر؟'", options: ["ألبرت أينشتاين", "إيلون ماسك", "آلان تورينج", "بيل غيتس"], answer: 2 },
    ],
  },
  {
    id: 2, title: "أنواع الذكاء الاصطناعي", icon: "🧠", color: "#FF6584",
    content: [
      { type: "p", text: "ينقسم الذكاء الاصطناعي إلى ثلاثة أنواع رئيسية:" },
      { type: "h3", text: "١. الذكاء الاصطناعي الضيق (ANI)" },
      { type: "p", text: "يؤدي مهمة واحدة فقط بشكل ممتاز. مثال: برنامج التعرف على الوجوه." },
      { type: "h3", text: "٢. الذكاء الاصطناعي العام (AGI)" },
      { type: "p", text: "يستطيع أداء أي مهمة بشرية — لم يتحقق بعد!" },
      { type: "h3", text: "٣. الذكاء الاصطناعي الخارق (ASI)" },
      { type: "p", text: "يتجاوز الذكاء البشري في كل شيء — لا يزال في عالم الخيال العلمي." },
    ],
    quiz: [
      { q: "أي نوع من الذكاء الاصطناعي موجود حالياً؟", options: ["الذكاء الخارق", "الذكاء العام", "الذكاء الضيق", "الذكاء المطلق"], answer: 2 },
      { q: "ما الذي يميز الذكاء الاصطناعي العام (AGI)؟", options: ["يلعب الألعاب فقط", "يؤدي مهمة واحدة", "يستطيع أداء أي مهمة بشرية", "يتجاوز الذكاء البشري"], answer: 2 },
    ],
  },
  {
    id: 3, title: "كيف يتعلم الحاسوب؟", icon: "📊", color: "#43C6AC",
    content: [
      { type: "p", text: "الحاسوب يتعلم من البيانات — تماماً كما تعلمت أنت من التجربة!" },
      { type: "h3", text: "مراحل تعلم الحاسوب" },
      { type: "li", text: "جمع البيانات: آلاف الصور أو الجمل" },
      { type: "li", text: "التدريب: يدرس الحاسوب البيانات ويبحث عن أنماط" },
      { type: "li", text: "الاختبار: نجرب النموذج على بيانات جديدة" },
      { type: "li", text: "التحسين: نصحح الأخطاء ونكرر" },
      { type: "h3", text: "مثال عملي 🐱🐶" },
      { type: "p", text: "لتعليم الحاسوب التمييز بين القطط والكلاب نعطيه 10,000 صورة قطة و10,000 صورة كلب، فيتعلم الفروق تلقائياً!" },
    ],
    quiz: [
      { q: "ماذا يحتاج الحاسوب ليتعلم؟", options: ["كهرباء أكثر", "بيانات كثيرة", "إنترنت سريع", "ذاكرة كبيرة فقط"], answer: 1 },
      { q: "ما أول خطوة في تعليم الحاسوب؟", options: ["الاختبار", "التحسين", "جمع البيانات", "التدريب"], answer: 2 },
    ],
  },
  {
    id: 4, title: "الذكاء الاصطناعي في حياتنا", icon: "🌍", color: "#F7971E",
    content: [
      { type: "h3", text: "الطب والصحة 🏥" },
      { type: "li", text: "تشخيص الأمراض من الصور الطبية" },
      { type: "li", text: "اكتشاف أدوية جديدة بشكل أسرع" },
      { type: "h3", text: "التعليم 📚" },
      { type: "li", text: "تطبيقات تعلم اللغات مثل Duolingo" },
      { type: "li", text: "دروس مخصصة لكل طالب" },
      { type: "h3", text: "النقل 🚗" },
      { type: "li", text: "السيارات ذاتية القيادة" },
      { type: "li", text: "تطبيقات الخرائط الذكية" },
      { type: "h3", text: "الأمان 🔒" },
      { type: "li", text: "التعرف على الوجه لفتح الهاتف" },
      { type: "li", text: "كشف الاحتيال البنكي" },
    ],
    quiz: [
      { q: "كيف يستخدم Duolingo الذكاء الاصطناعي؟", options: ["لترجمة النصوص فقط", "لتقديم دروس مخصصة لكل مستخدم", "لتشغيل الإعلانات", "لتخزين البيانات"], answer: 1 },
      { q: "ما تطبيق الذكاء الاصطناعي في مجال الأمان؟", options: ["توصيات الأفلام", "كشف الاحتيال البنكي", "تعلم اللغات", "رسم الصور"], answer: 1 },
    ],
  },
];

// ============================================================
// STATE
// ============================================================
const STORAGE_KEY = "ai_pwa_progress_v1";
let state = {
  screen: "home",
  activeLesson: null,
  lessonTab: "content", // content | quiz
  quizIdx: 0,
  quizSelected: null,
  quizScore: 0,
  quizDone: false,
  gameCards: [],
  gameFlipped: [],
  gameMatched: [],
  gameMoves: 0,
  progress: loadProgress(),
};

function loadProgress() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { completed: [], scores: {} }; }
  catch { return { completed: [], scores: {} }; }
}
function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress)); } catch {}
}
function getTotalStars() {
  return Object.values(state.progress.scores).reduce((a, b) => a + b, 0);
}

// ============================================================
// RENDER ENGINE
// ============================================================
function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "style" && typeof v === "object") Object.assign(e.style, v);
    else if (k.startsWith("on")) e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c == null) continue;
    e.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
  }
  return e;
}

function render() {
  const root = document.getElementById("root");
  root.innerHTML = "";
  root.appendChild(buildScreen());
}

// ============================================================
// SCREENS
// ============================================================
function buildScreen() {
  switch (state.screen) {
    case "home": return buildHome();
    case "lesson": return buildLesson();
    case "quiz": return buildQuiz();
    case "games": return buildGames();
    case "stats": return buildStats();
    default: return buildHome();
  }
}

// ---- HOME ----
function buildHome() {
  const done = state.progress.completed.length;
  const pct = Math.round((done / curriculum.length) * 100);
  const stars = getTotalStars();

  return el("div", { style: S.root },
    // Header
    el("div", { style: S.header },
      el("div", { style: S.headerGlow }),
      el("div", { style: S.logo }, "🤖"),
      el("h1", { style: S.title }, "منهج الذكاء الاصطناعي"),
      el("p", { style: S.subtitle }, "المرحلة المتوسطة"),
      el("div", { style: S.badgesRow },
        el("span", { style: S.starBadge }, `⭐ ${stars} نجمة`),
        el("span", { style: S.progressBadge }, `${done}/${curriculum.length} درس`),
      ),
    ),
    // Progress bar
    el("div", { style: S.progressTrack },
      el("div", { style: { ...S.progressFill, width: `${pct}%` } }),
    ),
    // Nav
    buildNav("home"),
    // Lessons
    el("div", { style: S.lessons },
      ...curriculum.map((lesson, i) => buildLessonCard(lesson, i)),
    ),
    // Install hint
    el("div", { style: S.installHint },
      el("span", { style: S.installIcon }, "📲"),
      el("span", {}, "اضغط على ＂مشاركة＂ ثم ＂إضافة للشاشة الرئيسية＂ لتثبيت التطبيق"),
    ),
  );
}

function buildLessonCard(lesson, i) {
  const done = state.progress.completed.includes(lesson.id);
  const locked = i > 0 && !state.progress.completed.includes(curriculum[i - 1].id);
  return el("div", {
    style: { ...S.card, borderRight: `5px solid ${lesson.color}`, opacity: locked ? 0.45 : 1 },
    onclick: () => {
      if (locked) return;
      state.activeLesson = lesson;
      state.lessonTab = "content";
      state.screen = "lesson";
      render();
    },
  },
    el("div", { style: S.cardIcon }, locked ? "🔒" : lesson.icon),
    el("div", { style: S.cardBody },
      el("div", { style: S.cardTitle }, lesson.title),
      el("div", { style: S.cardMeta },
        done
          ? el("span", { style: { color: "#43C6AC", fontSize: "13px" } }, "✅ مكتمل")
          : locked
            ? el("span", { style: { color: "#777", fontSize: "13px" } }, "🔒 مقفل")
            : el("span", { style: { color: lesson.color, fontSize: "13px" } }, "ابدأ الآن ←"),
        state.progress.scores[lesson.id] != null
          ? el("span", { style: S.scoreTag }, `⭐ ${state.progress.scores[lesson.id]}`)
          : null,
      ),
    ),
  );
}

// ---- LESSON ----
function buildLesson() {
  const lesson = state.activeLesson;
  return el("div", { style: S.root },
    buildBack("home"),
    el("div", { style: { ...S.lessonHeader, background: lesson.color } },
      el("div", { style: S.lessonHeaderIcon }, lesson.icon),
      el("h2", { style: S.lessonTitle }, lesson.title),
    ),
    el("div", { style: S.lessonContent },
      ...lesson.content.map(block => {
        if (block.type === "h3") return el("h3", { style: S.h3 }, block.text);
        if (block.type === "li") return el("div", { style: S.li }, el("span", { style: { color: lesson.color } }, "▸ "), block.text);
        return el("p", { style: S.p }, block.text);
      }),
    ),
    el("div", { style: S.lessonFooter },
      el("button", {
        style: { ...S.btn, background: lesson.color },
        onclick: () => {
          state.progress.completed = state.progress.completed.includes(lesson.id)
            ? state.progress.completed
            : [...state.progress.completed, lesson.id];
          saveProgress();
          state.quizIdx = 0;
          state.quizSelected = null;
          state.quizScore = 0;
          state.quizDone = false;
          state.screen = "quiz";
          render();
        },
      }, "اختبر نفسك 🎯"),
    ),
  );
}

// ---- QUIZ ----
function buildQuiz() {
  const lesson = state.activeLesson;
  if (state.quizDone) {
    const pct = Math.round((state.quizScore / lesson.quiz.length) * 100);
    // Save score
    state.progress.scores[lesson.id] = Math.max(state.progress.scores[lesson.id] || 0, state.quizScore);
    saveProgress();
    return el("div", { style: S.root },
      buildBack("home"),
      el("div", { style: S.resultBox },
        el("div", { style: S.resultEmoji }, pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"),
        el("h2", { style: S.resultTitle }, pct >= 80 ? "ممتاز!" : pct >= 50 ? "جيد!" : "حاول مرة أخرى"),
        el("div", { style: S.resultScore }, `${state.quizScore} / ${lesson.quiz.length}`),
        el("div", { style: S.resultStars }, ...Array.from({ length: state.quizScore }, () => el("span", {}, "⭐"))),
        el("button", {
          style: { ...S.btn, background: lesson.color, marginTop: "24px" },
          onclick: () => { state.screen = "home"; render(); },
        }, "العودة للدروس 🏠"),
      ),
    );
  }

  const q = lesson.quiz[state.quizIdx];
  return el("div", { style: S.root },
    buildBack("lesson"),
    el("div", { style: S.quizHeader },
      el("div", { style: S.quizCounter }, `السؤال ${state.quizIdx + 1} من ${lesson.quiz.length}`),
      el("div", { style: S.quizTrack },
        el("div", { style: { ...S.quizFill, width: `${((state.quizIdx) / lesson.quiz.length) * 100}%`, background: lesson.color } }),
      ),
    ),
    el("div", { style: S.quizBox },
      el("h3", { style: S.quizQ }, q.q),
      el("div", { style: S.options },
        ...q.options.map((opt, i) => {
          let bg = "#1a1d2e", border = "2px solid #2a2d3e";
          if (state.quizSelected !== null) {
            if (i === q.answer) { bg = "#43C6AC18"; border = "2px solid #43C6AC"; }
            else if (i === state.quizSelected) { bg = "#FF658418"; border = "2px solid #FF6584"; }
          }
          return el("button", {
            style: { ...S.option, background: bg, border },
            onclick: () => {
              if (state.quizSelected !== null) return;
              const correct = i === q.answer;
              state.quizSelected = i;
              if (correct) state.quizScore++;
              render();
              setTimeout(() => {
                if (state.quizIdx + 1 >= lesson.quiz.length) state.quizDone = true;
                else { state.quizIdx++; state.quizSelected = null; }
                render();
              }, 900);
            },
          },
            opt,
            state.quizSelected !== null && i === q.answer ? el("span", { style: { color: "#43C6AC", marginRight: "8px" } }, " ✅") : null,
            state.quizSelected === i && i !== q.answer ? el("span", { style: { color: "#FF6584", marginRight: "8px" } }, " ❌") : null,
          );
        }),
      ),
    ),
  );
}

// ---- GAMES ----
function buildGames() {
  if (state.gameCards.length === 0) initGame();
  const allMatched = state.gameMatched.length === 4;

  return el("div", { style: S.root },
    buildBack("home"),
    el("div", { style: S.gameHeader },
      el("h2", { style: S.gameTitle }, "🎮 لعبة المطابقة"),
      el("p", { style: S.gameSub }, "طابق كل مصطلح مع تعريفه"),
      el("div", { style: S.gameStats },
        el("span", { style: S.movesTag }, `🕹️ حركات: ${state.gameMoves}`),
        el("span", { style: S.matchedTag }, `✅ مطابق: ${state.gameMatched.length}/4`),
      ),
    ),
    allMatched
      ? el("div", { style: S.resultBox },
          el("div", { style: S.resultEmoji }, "🏆"),
          el("h2", { style: S.resultTitle }, "أحسنت! أكملت اللعبة!"),
          el("div", { style: S.resultScore }, `${state.gameMoves} حركة`),
          el("button", {
            style: { ...S.btn, background: "#6C63FF", marginTop: "20px" },
            onclick: () => { initGame(); render(); },
          }, "العب مجدداً 🔄"),
        )
      : el("div", { style: S.gameGrid },
          ...state.gameCards.map(card => buildGameCard(card)),
        ),
  );
}

function initGame() {
  const pairs = [
    { term: "الذكاء الاصطناعي", def: "قدرة الحاسوب على التفكير" },
    { term: "البيانات", def: "المعلومات التي يتعلم منها الحاسوب" },
    { term: "AGI", def: "الذكاء الاصطناعي العام" },
    { term: "تورينج", def: "سأل: هل تفكر الآلة؟" },
  ];
  const cards = [
    ...pairs.map((p, i) => ({ id: i * 2, text: p.term, pairId: i })),
    ...pairs.map((p, i) => ({ id: i * 2 + 1, text: p.def, pairId: i })),
  ].sort(() => Math.random() - 0.5);
  state.gameCards = cards;
  state.gameFlipped = [];
  state.gameMatched = [];
  state.gameMoves = 0;
}

function buildGameCard(card) {
  const isFlipped = state.gameFlipped.includes(card.id) || state.gameMatched.includes(card.pairId);
  const isMatched = state.gameMatched.includes(card.pairId);
  return el("div", {
    style: {
      ...S.gameCard,
      ...(isFlipped ? S.gameCardFlipped : {}),
      ...(isMatched ? S.gameCardMatched : {}),
    },
    onclick: () => {
      if (isFlipped || state.gameFlipped.length === 2) return;
      const newFlipped = [...state.gameFlipped, card.id];
      state.gameMoves++;
      if (newFlipped.length === 2) {
        const [a, b] = newFlipped.map(id => state.gameCards.find(c => c.id === id));
        if (a.pairId === b.pairId) {
          state.gameMatched = [...state.gameMatched, a.pairId];
          state.gameFlipped = [];
        } else {
          state.gameFlipped = newFlipped;
          render();
          setTimeout(() => { state.gameFlipped = []; render(); }, 1000);
          return;
        }
      } else {
        state.gameFlipped = newFlipped;
      }
      render();
    },
  }, isFlipped ? card.text : "?");
}

// ---- STATS ----
function buildStats() {
  const done = state.progress.completed.length;
  const stars = getTotalStars();
  return el("div", { style: S.root },
    buildBack("home"),
    el("div", { style: S.statsHeader },
      el("div", { style: { fontSize: "52px", marginBottom: "6px" } }, "📈"),
      el("h2", { style: S.statsTitle }, "تقدمي"),
    ),
    el("div", { style: S.statsGrid },
      buildStatCard(done.toString(), "دروس مكتملة", "#6C63FF"),
      buildStatCard(stars.toString(), "مجموع النجوم", "#FFD700"),
      buildStatCard(`${Math.round((done / curriculum.length) * 100)}%`, "نسبة الإتمام", "#43C6AC"),
    ),
    el("div", { style: S.scoresList },
      el("h3", { style: S.scoresTitle }, "نتائج الاختبارات"),
      ...curriculum.map(l =>
        el("div", { style: S.scoreRow },
          el("span", { style: { fontSize: "14px" } }, `${l.icon} ${l.title}`),
          el("span", { style: { color: l.color, fontSize: "13px", fontWeight: "700" } },
            state.progress.scores[l.id] != null
              ? `${state.progress.scores[l.id]}/${l.quiz.length} ⭐`
              : "لم يُختبر بعد",
          ),
        ),
      ),
    ),
    el("button", {
      style: { ...S.btn, background: "#FF6584", margin: "20px 16px 0", width: "calc(100% - 32px)" },
      onclick: () => {
        if (confirm("هل تريد إعادة تعيين كل التقدم؟")) {
          state.progress = { completed: [], scores: {} };
          saveProgress();
          render();
        }
      },
    }, "إعادة تعيين التقدم 🔄"),
  );
}

function buildStatCard(num, label, color) {
  return el("div", { style: S.statCard },
    el("div", { style: { ...S.statNum, color } }, num),
    el("div", { style: S.statLabel }, label),
  );
}

// ---- SHARED ----
function buildNav(active) {
  const tabs = [
    { id: "home", icon: "📚", label: "الدروس" },
    { id: "games", icon: "🎮", label: "الألعاب" },
    { id: "stats", icon: "📈", label: "تقدمي" },
  ];
  return el("div", { style: S.nav },
    ...tabs.map(t => el("button", {
      style: { ...S.navBtn, ...(active === t.id ? S.navBtnActive : {}) },
      onclick: () => { state.screen = t.id; render(); },
    }, `${t.icon} ${t.label}`)),
  );
}

function buildBack(to) {
  return el("button", {
    style: S.back,
    onclick: () => { state.screen = to; render(); },
  }, "← رجوع");
}

// ============================================================
// STYLES
// ============================================================
const S = {
  root: { fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif", background: "#0f1120", minHeight: "100dvh", color: "#fff", direction: "rtl", maxWidth: "480px", margin: "0 auto", paddingBottom: "env(safe-area-inset-bottom, 20px)", overflowX: "hidden" },
  header: { position: "relative", overflow: "hidden", padding: "52px 20px 20px", textAlign: "center" },
  headerGlow: { position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(108,99,255,0.25), transparent 70%)", borderRadius: "50%", pointerEvents: "none" },
  logo: { fontSize: "60px", marginBottom: "8px", display: "block" },
  title: { fontSize: "24px", fontWeight: "800", margin: "0 0 4px", background: "linear-gradient(135deg,#6C63FF,#43C6AC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { color: "#888", margin: "0 0 12px", fontSize: "14px" },
  badgesRow: { display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" },
  starBadge: { background: "rgba(255,215,0,0.12)", color: "#FFD700", padding: "4px 14px", borderRadius: "20px", fontSize: "13px" },
  progressBadge: { background: "rgba(108,99,255,0.12)", color: "#6C63FF", padding: "4px 14px", borderRadius: "20px", fontSize: "13px" },
  progressTrack: { height: "5px", background: "#1e2235", margin: "0 20px 14px" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#6C63FF,#43C6AC)", borderRadius: "3px", transition: "width .5s" },
  nav: { display: "flex", gap: "8px", padding: "0 16px 14px", justifyContent: "center" },
  navBtn: { flex: 1, padding: "9px 4px", borderRadius: "12px", border: "1.5px solid #2a2d3e", background: "transparent", color: "#888", fontSize: "12px", cursor: "pointer", fontFamily: "inherit" },
  navBtnActive: { background: "rgba(108,99,255,0.15)", borderColor: "#6C63FF", color: "#6C63FF" },
  lessons: { padding: "0 16px" },
  card: { display: "flex", alignItems: "center", gap: "14px", background: "#1a1d2e", borderRadius: "16px", padding: "16px", marginBottom: "12px", cursor: "pointer", boxShadow: "0 2px 16px rgba(0,0,0,0.3)" },
  cardIcon: { fontSize: "34px", minWidth: "44px", textAlign: "center" },
  cardBody: { flex: 1 },
  cardTitle: { fontWeight: "700", fontSize: "15px", marginBottom: "4px" },
  cardMeta: { display: "flex", gap: "10px", alignItems: "center" },
  scoreTag: { background: "rgba(255,215,0,0.12)", color: "#FFD700", padding: "2px 8px", borderRadius: "10px", fontSize: "12px" },
  installHint: { margin: "20px 16px 0", background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.2)", borderRadius: "14px", padding: "12px 16px", display: "flex", gap: "10px", alignItems: "center", fontSize: "12px", color: "#aaa", lineHeight: "1.5" },
  installIcon: { fontSize: "22px", flexShrink: 0 },
  back: { background: "none", border: "none", color: "#6C63FF", fontSize: "15px", cursor: "pointer", padding: "16px 20px", display: "block", fontFamily: "inherit" },
  lessonHeader: { borderRadius: "0 0 28px 28px", padding: "28px 20px 24px", textAlign: "center" },
  lessonHeaderIcon: { fontSize: "52px", marginBottom: "8px" },
  lessonTitle: { color: "#fff", fontSize: "20px", margin: 0, fontWeight: "800" },
  lessonContent: { padding: "20px", lineHeight: "1.8" },
  h3: { color: "#6C63FF", fontSize: "15px", marginTop: "18px", marginBottom: "6px" },
  li: { marginBottom: "6px", fontSize: "14px", color: "#ddd", paddingRight: "4px" },
  p: { margin: "6px 0", fontSize: "14px", color: "#ddd", lineHeight: "1.7" },
  lessonFooter: { padding: "0 16px 20px" },
  btn: { width: "100%", padding: "15px", borderRadius: "14px", border: "none", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" },
  quizHeader: { padding: "10px 20px 0" },
  quizCounter: { textAlign: "center", color: "#888", fontSize: "13px", marginBottom: "8px" },
  quizTrack: { height: "4px", background: "#1e2235", borderRadius: "2px" },
  quizFill: { height: "100%", borderRadius: "2px", transition: "width .3s" },
  quizBox: { padding: "20px" },
  quizQ: { fontSize: "17px", fontWeight: "700", marginBottom: "22px", lineHeight: "1.6", textAlign: "center" },
  options: { display: "flex", flexDirection: "column", gap: "10px" },
  option: { padding: "14px 16px", borderRadius: "13px", color: "#fff", fontSize: "14px", cursor: "pointer", textAlign: "right", transition: "all .2s", fontFamily: "inherit", lineHeight: "1.4" },
  resultBox: { textAlign: "center", padding: "40px 20px" },
  resultEmoji: { fontSize: "72px", marginBottom: "12px" },
  resultTitle: { fontSize: "26px", fontWeight: "800", margin: "0 0 8px" },
  resultScore: { fontSize: "20px", color: "#aaa" },
  resultStars: { fontSize: "28px", margin: "8px 0" },
  gameHeader: { textAlign: "center", padding: "10px 20px 16px" },
  gameTitle: { fontSize: "22px", fontWeight: "800", margin: "0 0 4px" },
  gameSub: { color: "#888", margin: "0 0 10px", fontSize: "13px" },
  gameStats: { display: "flex", gap: "10px", justifyContent: "center" },
  movesTag: { background: "rgba(108,99,255,0.12)", color: "#6C63FF", padding: "4px 12px", borderRadius: "20px", fontSize: "13px" },
  matchedTag: { background: "rgba(67,198,172,0.12)", color: "#43C6AC", padding: "4px 12px", borderRadius: "20px", fontSize: "13px" },
  gameGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", padding: "0 16px" },
  gameCard: { background: "#1a1d2e", borderRadius: "14px", padding: "18px 10px", textAlign: "center", cursor: "pointer", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "700", transition: "all .2s", border: "2px solid #2a2d3e" },
  gameCardFlipped: { background: "rgba(108,99,255,0.12)", border: "2px solid #6C63FF", fontSize: "12px", fontWeight: "600", color: "#ddd" },
  gameCardMatched: { background: "rgba(67,198,172,0.12)", border: "2px solid #43C6AC", opacity: 0.65 },
  statsHeader: { textAlign: "center", padding: "20px 20px 10px" },
  statsTitle: { fontSize: "22px", fontWeight: "800", marginTop: "4px" },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", padding: "0 16px 16px" },
  statCard: { background: "#1a1d2e", borderRadius: "14px", padding: "16px 8px", textAlign: "center" },
  statNum: { fontSize: "26px", fontWeight: "800" },
  statLabel: { fontSize: "11px", color: "#888", marginTop: "4px" },
  scoresList: { padding: "0 16px" },
  scoresTitle: { fontSize: "15px", fontWeight: "700", marginBottom: "12px" },
  scoreRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e2235" },
};

// ============================================================
// BOOT
// ============================================================
render();
