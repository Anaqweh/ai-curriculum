// ============================================================
// منهج الذكاء الاصطناعي - PWA with Supabase Auth
// ============================================================

const SUPABASE_URL = "https://urzwahnalea6carhaydm.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyendhaG5ha2V0aWNhcmhheWRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MzIyOTUsImV4cCI6MjA5NTIwODI5NX0.ukkCi4DR4XnbQSTk2lMQkuXQivzmSnFt3nq6cUUCdnw";

// Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js"));
}

// ============================================================
// SUPABASE CLIENT
// ============================================================
const sb = {
  async req(path, opts = {}) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${sb.token || SUPABASE_KEY}`,
        "Content-Type": "application/json",
        Prefer: opts.prefer || "",
        ...opts.headers,
      },
      ...opts,
    });
    if (!res.ok && res.status !== 204) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || res.statusText);
    }
    return res.status === 204 ? null : res.json();
  },

  async authReq(path, body) {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error_description || data.msg || "خطأ في المصادقة");
    return data;
  },

  token: null,
  userId: null,
  userEmail: null,

  async signUp(email, password) {
    const data = await sb.authReq("signup", { email, password });
    if (data.access_token) { sb.token = data.access_token; sb.userId = data.user.id; sb.userEmail = email; }
    return data;
  },

  async signIn(email, password) {
    const data = await sb.authReq("token?grant_type=password", { email, password });
    sb.token = data.access_token;
    sb.userId = data.user.id;
    sb.userEmail = data.user.email;
    return data;
  },

  async signOut() {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${sb.token}` },
    });
    sb.token = null; sb.userId = null; sb.userEmail = null;
  },

  async getProgress() {
    const rows = await sb.req(`progress?user_id=eq.${sb.userId}&select=*`);
    return rows && rows[0] ? rows[0] : null;
  },

  async saveProgress(completed, scores) {
    await sb.req(`progress?user_id=eq.${sb.userId}`, {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({ completed_lessons: completed, scores, updated_at: new Date().toISOString() }),
    });
  },
};

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
let state = {
  screen: "login", // login | register | home | lesson | quiz | games | stats
  authMode: "login",
  authEmail: "",
  authPassword: "",
  authError: "",
  authLoading: false,
  activeLesson: null,
  quizIdx: 0,
  quizSelected: null,
  quizScore: 0,
  quizDone: false,
  gameCards: [],
  gameFlipped: [],
  gameMatched: [],
  gameMoves: 0,
  syncStatus: "",
  progress: { completed: [], scores: {} },
};

// ============================================================
// PROGRESS SYNC
// ============================================================
async function loadCloudProgress() {
  try {
    const row = await sb.getProgress();
    if (row) {
      state.progress = {
        completed: row.completed_lessons || [],
        scores: row.scores || {},
      };
    }
  } catch (e) {
    console.error("Load error:", e);
  }
}

async function saveCloudProgress() {
  try {
    state.syncStatus = "saving";
    await sb.saveProgress(state.progress.completed, state.progress.scores);
    state.syncStatus = "saved";
    setTimeout(() => { state.syncStatus = ""; render(); }, 2000);
  } catch (e) {
    state.syncStatus = "error";
    console.error("Save error:", e);
  }
}

// ============================================================
// RENDER ENGINE
// ============================================================
function el(tag, attrs = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "style" && typeof v === "object") Object.assign(e.style, v);
    else if (k.startsWith("on")) e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "value") e.value = v;
    else if (k === "placeholder") e.placeholder = v;
    else if (k === "type") e.type = v;
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

function buildScreen() {
  if (state.screen === "login" || state.screen === "register") return buildAuth();
  if (state.screen === "home") return buildHome();
  if (state.screen === "lesson") return buildLesson();
  if (state.screen === "quiz") return buildQuiz();
  if (state.screen === "games") return buildGames();
  if (state.screen === "stats") return buildStats();
  return buildAuth();
}

// ============================================================
// AUTH SCREEN
// ============================================================
function buildAuth() {
  const isLogin = state.screen === "login";
  return el("div", { style: S.authRoot },
    el("div", { style: S.authGlow }),
    el("div", { style: S.authLogo }, "🤖"),
    el("h1", { style: S.authTitle }, "منهج الذكاء الاصطناعي"),
    el("p", { style: S.authSub }, "المرحلة المتوسطة"),

    el("div", { style: S.authCard },
      el("div", { style: S.authTabs },
        el("button", {
          style: { ...S.authTab, ...(isLogin ? S.authTabActive : {}) },
          onclick: () => { state.screen = "login"; state.authError = ""; render(); },
        }, "تسجيل الدخول"),
        el("button", {
          style: { ...S.authTab, ...(!isLogin ? S.authTabActive : {}) },
          onclick: () => { state.screen = "register"; state.authError = ""; render(); },
        }, "حساب جديد"),
      ),

      el("div", { style: S.authForm },
        el("label", { style: S.authLabel }, "البريد الإلكتروني"),
        el("input", {
          style: S.authInput,
          type: "email",
          placeholder: "example@email.com",
          value: state.authEmail,
          oninput: (e) => state.authEmail = e.target.value,
        }),
        el("label", { style: S.authLabel }, "كلمة المرور"),
        el("input", {
          style: S.authInput,
          type: "password",
          placeholder: "••••••••",
          value: state.authPassword,
          oninput: (e) => state.authPassword = e.target.value,
        }),

        state.authError ? el("div", { style: S.authError }, "⚠️ " + state.authError) : null,

        el("button", {
          style: { ...S.authBtn, opacity: state.authLoading ? 0.6 : 1 },
          onclick: async () => {
            if (state.authLoading) return;
            state.authError = "";
            state.authLoading = true;
            render();
            try {
              if (isLogin) {
                await sb.signIn(state.authEmail, state.authPassword);
              } else {
                await sb.signUp(state.authEmail, state.authPassword);
              }
              await loadCloudProgress();
              state.screen = "home";
              state.authLoading = false;
              render();
            } catch (e) {
              state.authError = e.message;
              state.authLoading = false;
              render();
            }
          },
        }, state.authLoading ? "جاري التحميل..." : isLogin ? "دخول 🚀" : "إنشاء حساب ✨"),
      ),
    ),
  );
}

// ============================================================
// HOME SCREEN
// ============================================================
function buildHome() {
  const done = state.progress.completed.length;
  const pct = Math.round((done / curriculum.length) * 100);
  const stars = Object.values(state.progress.scores).reduce((a, b) => a + b, 0);

  return el("div", { style: S.root },
    el("div", { style: S.header },
      el("div", { style: S.headerGlow }),
      el("div", { style: S.logo }, "🤖"),
      el("h1", { style: S.title }, "منهج الذكاء الاصطناعي"),
      el("p", { style: S.subtitle }, sb.userEmail || ""),
      el("div", { style: S.badgesRow },
        el("span", { style: S.starBadge }, `⭐ ${stars} نجمة`),
        el("span", { style: S.progressBadge }, `${done}/${curriculum.length} درس`),
        state.syncStatus === "saved" ? el("span", { style: S.syncBadge }, "☁️ محفوظ") :
        state.syncStatus === "saving" ? el("span", { style: S.syncBadge }, "⏳ حفظ...") :
        state.syncStatus === "error" ? el("span", { style: { ...S.syncBadge, color: "#FF6584" } }, "⚠️ خطأ") : null,
      ),
    ),
    el("div", { style: S.progressTrack },
      el("div", { style: { ...S.progressFill, width: `${pct}%` } }),
    ),
    buildNav("home"),
    el("div", { style: S.lessons },
      ...curriculum.map((lesson, i) => buildLessonCard(lesson, i)),
    ),
    el("button", {
      style: S.logoutBtn,
      onclick: async () => {
        await sb.signOut();
        state.screen = "login";
        state.progress = { completed: [], scores: {} };
        render();
      },
    }, "تسجيل الخروج →"),
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
      state.screen = "lesson";
      render();
    },
  },
    el("div", { style: S.cardIcon }, locked ? "🔒" : lesson.icon),
    el("div", { style: S.cardBody },
      el("div", { style: S.cardTitle }, lesson.title),
      el("div", { style: S.cardMeta },
        done ? el("span", { style: { color: "#43C6AC", fontSize: "13px" } }, "✅ مكتمل")
          : locked ? el("span", { style: { color: "#777", fontSize: "13px" } }, "🔒 مقفل")
          : el("span", { style: { color: lesson.color, fontSize: "13px" } }, "ابدأ الآن ←"),
        state.progress.scores[lesson.id] != null
          ? el("span", { style: S.scoreTag }, `⭐ ${state.progress.scores[lesson.id]}`)
          : null,
      ),
    ),
  );
}

// ============================================================
// LESSON SCREEN
// ============================================================
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
        onclick: async () => {
          if (!state.progress.completed.includes(lesson.id)) {
            state.progress.completed = [...state.progress.completed, lesson.id];
            await saveCloudProgress();
          }
          state.quizIdx = 0; state.quizSelected = null;
          state.quizScore = 0; state.quizDone = false;
          state.screen = "quiz";
          render();
        },
      }, "اختبر نفسك 🎯"),
    ),
  );
}

// ============================================================
// QUIZ SCREEN
// ============================================================
function buildQuiz() {
  const lesson = state.activeLesson;
  if (state.quizDone) {
    return el("div", { style: S.root },
      buildBack("home"),
      el("div", { style: S.resultBox },
        el("div", { style: S.resultEmoji }, state.quizScore / lesson.quiz.length >= 0.8 ? "🏆" : state.quizScore / lesson.quiz.length >= 0.5 ? "👍" : "💪"),
        el("h2", { style: S.resultTitle }, state.quizScore / lesson.quiz.length >= 0.8 ? "ممتاز!" : state.quizScore / lesson.quiz.length >= 0.5 ? "جيد!" : "حاول مرة أخرى"),
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
        el("div", { style: { ...S.quizFill, width: `${(state.quizIdx / lesson.quiz.length) * 100}%`, background: lesson.color } }),
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
            onclick: async () => {
              if (state.quizSelected !== null) return;
              const correct = i === q.answer;
              state.quizSelected = i;
              if (correct) state.quizScore++;
              render();
              setTimeout(async () => {
                if (state.quizIdx + 1 >= lesson.quiz.length) {
                  state.quizDone = true;
                  const best = Math.max(state.progress.scores[lesson.id] || 0, state.quizScore);
                  state.progress.scores[lesson.id] = best;
                  await saveCloudProgress();
                } else {
                  state.quizIdx++;
                  state.quizSelected = null;
                }
                render();
              }, 900);
            },
          },
            opt,
            state.quizSelected !== null && i === q.answer ? el("span", { style: { color: "#43C6AC" } }, " ✅") : null,
            state.quizSelected === i && i !== q.answer ? el("span", { style: { color: "#FF6584" } }, " ❌") : null,
          );
        }),
      ),
    ),
  );
}

// ============================================================
// GAMES SCREEN
// ============================================================
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
          el("h2", { style: S.resultTitle }, "أحسنت!"),
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
  state.gameCards = [
    ...pairs.map((p, i) => ({ id: i * 2, text: p.term, pairId: i })),
    ...pairs.map((p, i) => ({ id: i * 2 + 1, text: p.def, pairId: i })),
  ].sort(() => Math.random() - 0.5);
  state.gameFlipped = [];
  state.gameMatched = [];
  state.gameMoves = 0;
}

function buildGameCard(card) {
  const isFlipped = state.gameFlipped.includes(card.id) || state.gameMatched.includes(card.pairId);
  const isMatched = state.gameMatched.includes(card.pairId);
  return el("div", {
    style: { ...S.gameCard, ...(isFlipped ? S.gameCardFlipped : {}), ...(isMatched ? S.gameCardMatched : {}) },
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

// ============================================================
// STATS SCREEN
// ============================================================
function buildStats() {
  const done = state.progress.completed.length;
  const stars = Object.values(state.progress.scores).reduce((a, b) => a + b, 0);
  return el("div", { style: S.root },
    buildBack("home"),
    el("div", { style: S.statsHeader },
      el("div", { style: { fontSize: "52px", marginBottom: "6px" } }, "📈"),
      el("h2", { style: S.statsTitle }, "تقدمي"),
      el("p", { style: { color: "#888", fontSize: "13px", margin: 0 } }, sb.userEmail),
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
            state.progress.scores[l.id] != null ? `${state.progress.scores[l.id]}/${l.quiz.length} ⭐` : "لم يُختبر بعد"),
        ),
      ),
    ),
    el("button", {
      style: { ...S.btn, background: "#FF6584", margin: "20px 16px 0", width: "calc(100% - 32px)" },
      onclick: async () => {
        if (confirm("هل تريد إعادة تعيين كل التقدم؟")) {
          state.progress = { completed: [], scores: {} };
          await saveCloudProgress();
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
  root: { fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif", background: "#0f1120", minHeight: "100dvh", color: "#fff", direction: "rtl", maxWidth: "480px", margin: "0 auto", paddingBottom: "40px" },
  authRoot: { fontFamily: "'Segoe UI', Tahoma, Arial, sans-serif", background: "#0f1120", minHeight: "100dvh", color: "#fff", direction: "rtl", maxWidth: "480px", margin: "0 auto", padding: "60px 20px 40px", position: "relative", overflow: "hidden" },
  authGlow: { position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(108,99,255,0.2), transparent 70%)", borderRadius: "50%", pointerEvents: "none" },
  authLogo: { fontSize: "64px", textAlign: "center", display: "block", marginBottom: "10px" },
  authTitle: { fontSize: "22px", fontWeight: "800", textAlign: "center", background: "linear-gradient(135deg,#6C63FF,#43C6AC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", margin: "0 0 4px" },
  authSub: { textAlign: "center", color: "#888", fontSize: "14px", marginBottom: "32px" },
  authCard: { background: "#1a1d2e", borderRadius: "20px", padding: "24px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" },
  authTabs: { display: "flex", gap: "8px", marginBottom: "24px", background: "#0f1120", borderRadius: "12px", padding: "4px" },
  authTab: { flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: "transparent", color: "#888", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", fontWeight: "600" },
  authTabActive: { background: "#6C63FF", color: "#fff" },
  authForm: { display: "flex", flexDirection: "column", gap: "12px" },
  authLabel: { fontSize: "13px", color: "#aaa", marginBottom: "-6px" },
  authInput: { padding: "14px 16px", borderRadius: "12px", border: "2px solid #2a2d3e", background: "#0f1120", color: "#fff", fontSize: "15px", fontFamily: "inherit", outline: "none", direction: "ltr", textAlign: "left" },
  authError: { background: "rgba(255,101,132,0.12)", border: "1px solid rgba(255,101,132,0.3)", borderRadius: "10px", padding: "10px 14px", fontSize: "13px", color: "#FF6584" },
  authBtn: { padding: "15px", borderRadius: "14px", border: "none", background: "linear-gradient(135deg, #6C63FF, #43C6AC)", color: "#fff", fontSize: "16px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", marginTop: "8px" },
  header: { position: "relative", overflow: "hidden", padding: "52px 20px 20px", textAlign: "center" },
  headerGlow: { position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(108,99,255,0.25), transparent 70%)", borderRadius: "50%", pointerEvents: "none" },
  logo: { fontSize: "60px", marginBottom: "8px", display: "block" },
  title: { fontSize: "22px", fontWeight: "800", margin: "0 0 4px", background: "linear-gradient(135deg,#6C63FF,#43C6AC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  subtitle: { color: "#888", margin: "0 0 10px", fontSize: "12px", direction: "ltr" },
  badgesRow: { display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" },
  starBadge: { background: "rgba(255,215,0,0.12)", color: "#FFD700", padding: "4px 12px", borderRadius: "20px", fontSize: "12px" },
  progressBadge: { background: "rgba(108,99,255,0.12)", color: "#6C63FF", padding: "4px 12px", borderRadius: "20px", fontSize: "12px" },
  syncBadge: { background: "rgba(67,198,172,0.12)", color: "#43C6AC", padding: "4px 12px", borderRadius: "20px", fontSize: "12px" },
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
  logoutBtn: { display: "block", margin: "16px auto", background: "none", border: "1px solid #2a2d3e", color: "#888", padding: "8px 20px", borderRadius: "20px", fontSize: "13px", cursor: "pointer", fontFamily: "inherit" },
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
  option: { padding: "14px 16px", borderRadius: "13px", color: "#fff", fontSize: "14px", cursor: "pointer", textAlign: "right", fontFamily: "inherit", lineHeight: "1.4" },
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
  gameCard: { background: "#1a1d2e", borderRadius: "14px", padding: "18px 10px", textAlign: "center", cursor: "pointer", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "700", border: "2px solid #2a2d3e" },
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
