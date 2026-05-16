import { theorySections } from "./theory.js";
import {
  questions,
  questionTopics,
  pickMockQuestions,
  MOCK_DURATION_MIN,
  MOCK_QUESTION_COUNT,
} from "./questions.js";

const app = document.getElementById("app");
const navEl = document.getElementById("nav");
const layoutEl = document.getElementById("layout");

let mockTimerId = null;
function clearMockTimer() {
  if (mockTimerId) {
    clearInterval(mockTimerId);
    mockTimerId = null;
  }
}

const ROUTES = {
  home: "home",
  theory: "theory",
  theoryDetail: "theoryDetail",
  practice: "practice",
  mock: "mock",
};

function parseHash() {
  const raw = (location.hash || "#/").slice(1).replace(/^\//, "");
  const [path, query = ""] = raw.split("?");
  const parts = path.split("/").filter(Boolean);
  const params = new URLSearchParams(query);
  return { parts, params };
}

function setHash(path) {
  location.hash = `#/${path}`;
}

function navTemplate(active) {
  const link = (href, label, id) =>
    `<a href="#/${href}" class="${active === id ? "active" : ""}" data-nav="${id}">${label}</a>`;
  return `
    ${link("", "Trang chủ", "home")}
    <div class="nav-group">Lý thuyết</div>
    ${theorySections.map((s) => link(`theory/${s.slug}`, s.title, `t-${s.slug}`)).join("")}
    <div class="nav-group">Luyện tập</div>
    ${link("practice", "Câu hỏi theo chủ đề", "practice")}
    ${link(
      "mock",
      `<span class="nav-text-full">Thi thử (${MOCK_QUESTION_COUNT} câu · ${MOCK_DURATION_MIN} phút)</span><span class="nav-text-short">Thi thử</span>`,
      "mock"
    )}
  `;
}

function renderNav(activeId) {
  navEl.innerHTML = navTemplate(activeId);
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* ---------- Home ---------- */
function renderHome() {
  renderNav("home");
  app.innerHTML = `
    <div class="panel">
      <p><span class="tag">Unofficial</span><span class="tag">Static / GitHub Pages</span></p>
      <h1>Ôn luyện Web Developer Specialist (OutSystems 11)</h1>
      <p>Website này tổng hợp <strong>lý thuyết</strong> theo các chủ đề thường gặp trong lộ trình chuyên môn Web (mô tả công khai: best practices, async, integrations, troubleshooting…) và cung cấp <strong>câu hỏi trắc nghiệm</strong> cùng <strong>bài thi thử</strong> chạy hoàn toàn trên trình duyệt — không backend.</p>
      <div class="callout ok">
        <strong>Lưu ý:</strong> Đây không phải tài liệu hay đề thi chính thức của OutSystems. Hãy dùng guided path, exam details và docs trên <a class="link" href="https://www.outsystems.com/certifications/" target="_blank" rel="noopener">outsystems.com/certifications</a> làm nguồn chuẩn.
      </div>
      <div class="grid-cards">
        <a class="card" href="#/theory/tong-quan-ky-thi">
          <h3>Bắt đầu lý thuyết</h3>
          <p>Tổng quan kỳ thi, mẹo chuẩn bị, lộ trình ôn.</p>
        </a>
        <a class="card" href="#/practice">
          <h3>Luyện theo chủ đề</h3>
          <p>Chọn chủ đề, xem giải thích ngay sau mỗi câu.</p>
        </a>
        <a class="card" href="#/mock">
          <h3>Thi thử</h3>
          <p>${MOCK_QUESTION_COUNT} câu, bấm giờ ${MOCK_DURATION_MIN} phút, chấm điểm cuối.</p>
        </a>
      </div>
      <h2>Triển khai GitHub Pages</h2>
      <p>Đặt nguồn site là thư mục <code>docs/</code> trong repo (Settings → Pages). Nếu site nằm dưới đường dẫn con <code>/tên-repo/</code>, mọi đường dẫn tương đối trong project này vẫn hoạt động vì chỉ dùng hash routing.</p>
    </div>
  `;
}

/* ---------- Theory ---------- */
function renderTheoryList() {
  renderNav("theory");
  app.innerHTML = `
    <div class="panel">
      <h1>Mục lục lý thuyết</h1>
      <p>Chọn một chủ đề để đọc chi tiết.</p>
      <ul>
        ${theorySections.map((s) => `<li><a class="link" href="#/theory/${s.slug}">${esc(s.title)}</a></li>`).join("")}
      </ul>
    </div>
  `;
}

function renderTheoryDetail(slug) {
  const sec = theorySections.find((s) => s.slug === slug);
  if (!sec) {
    renderTheoryList();
    return;
  }
  renderNav(`t-${slug}`);
  app.innerHTML = `
    <div class="panel">
      <p><a class="link" href="#/theory">← Mục lục lý thuyết</a></p>
      <h1>${esc(sec.title)}</h1>
      ${sec.html}
      <div class="btn-row">
        <a class="btn btn-primary" href="#/practice?topic=all">Luyện câu hỏi</a>
      </div>
    </div>
  `;
}

/* ---------- Practice quiz ---------- */
let practiceState = {
  topic: "all",
  index: 0,
  order: [],
  answered: false,
  selected: null,
};

function shuffle(arr, rng = Math.random) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function filterQuestions(topic) {
  if (topic === "all") return [...questions];
  return questions.filter((q) => q.topic === topic);
}

function renderPractice(params) {
  renderNav("practice");
  const topic = params.get("topic") || "all";
  const pool = filterQuestions(topic);
  if (practiceState.topic !== topic || practiceState.order.length !== pool.length) {
    practiceState = {
      topic,
      index: 0,
      order: shuffle(pool.map((_, i) => i)).map((si) => pool[si]),
      answered: false,
      selected: null,
    };
  }

  const q = practiceState.order[practiceState.index];

  const opts = ["A", "B", "C", "D"]
    .map(
      (k) => `
      <button type="button" class="option ${practiceState.selected === k ? "selected" : ""} ${
        practiceState.answered
          ? k === q.correct
            ? "correct"
            : practiceState.selected === k && k !== q.correct
              ? "wrong"
              : ""
          : ""
      }" data-key="${k}">
        <span class="option-key">${k}</span>
        <span>${esc(q.options[k])}</span>
      </button>
    `
    )
    .join("");

  app.innerHTML = `
    <div class="panel">
      <h1>Luyện theo chủ đề</h1>
      <div class="topic-toolbar">
        <label>Chủ đề
          <select id="topicSelect" class="topic-select" aria-label="Chọn chủ đề">
            ${questionTopics
              .map(
                (t) =>
                  `<option value="${esc(t.id)}" ${t.id === topic ? "selected" : ""}>${esc(t.label)}</option>`
              )
              .join("")}
          </select>
        </label>
        <span class="topic-progress">Câu ${practiceState.index + 1} / ${practiceState.order.length}</span>
      </div>
      <div class="quiz-q">${esc(q.question)}</div>
      <div class="options" id="practiceOptions">${opts}</div>
      ${
        practiceState.answered
          ? `<div class="explain"><strong>Giải thích:</strong> ${esc(q.explain)}</div>`
          : ""
      }
      <div class="btn-row">
        <button type="button" class="btn" id="btnPrev" ${practiceState.index === 0 ? "disabled" : ""}>← Trước</button>
        <button type="button" class="btn btn-primary" id="btnNext">
          ${practiceState.index === practiceState.order.length - 1 ? "Kết thúc / Xáo trộn lại" : "Tiếp →"}
        </button>
      </div>
    </div>
  `;

  document.getElementById("topicSelect").addEventListener("change", (e) => {
    setHash(`practice?topic=${encodeURIComponent(e.target.value)}`);
  });

  document.getElementById("practiceOptions").addEventListener("click", (e) => {
    const btn = e.target.closest(".option");
    if (!btn || practiceState.answered) return;
    const key = btn.getAttribute("data-key");
    practiceState.selected = key;
    practiceState.answered = true;
    renderPractice(params);
  });

  document.getElementById("btnPrev").addEventListener("click", () => {
    if (practiceState.index > 0) {
      practiceState.index--;
      practiceState.answered = false;
      practiceState.selected = null;
      renderPractice(params);
    }
  });

  document.getElementById("btnNext").addEventListener("click", () => {
    if (practiceState.index < practiceState.order.length - 1) {
      practiceState.index++;
      practiceState.answered = false;
      practiceState.selected = null;
      renderPractice(params);
    } else {
      practiceState.order = shuffle(filterQuestions(topic));
      practiceState.index = 0;
      practiceState.answered = false;
      practiceState.selected = null;
      renderPractice(params);
    }
  });
}

/* ---------- Mock exam ---------- */
const MOCK_KEY = "oswebspec_mock_v1";

function loadMock() {
  try {
    return JSON.parse(sessionStorage.getItem(MOCK_KEY) || "null");
  } catch {
    return null;
  }
}

function saveMock(data) {
  sessionStorage.setItem(MOCK_KEY, JSON.stringify(data));
}

function clearMock() {
  sessionStorage.removeItem(MOCK_KEY);
}

function formatMs(ms) {
  if (ms <= 0) return "00:00";
  const s = Math.floor(ms / 1000);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function renderMockIntro() {
  clearMockTimer();
  renderNav("mock");
  app.innerHTML = `
    <div class="panel">
      <h1>Thi thử</h1>
      <p>Chế độ mô phỏng: <strong>${MOCK_QUESTION_COUNT}</strong> câu hỏi được chọn (xáo trộn có seed trong phiên), thời gian <strong>${MOCK_DURATION_MIN} phút</strong> — trùng thời lượng công bố của kỳ thi thật. Số lượng câu hỏi trong kỳ thật có thể khác; đây chỉ là luyện tập.</p>
      <ul>
        <li>Không hiện đáp án đúng cho tới khi nộp bài.</li>
        <li>Refresh trang có thể mất tiến độ (lưu trong sessionStorage).</li>
      </ul>
      <div class="btn-row">
        <button type="button" class="btn btn-primary" id="startMock">Bắt đầu thi thử</button>
        <button type="button" class="btn" id="clearMock">Xóa phiên đang lưu</button>
      </div>
    </div>
  `;
  document.getElementById("startMock").addEventListener("click", () => {
    const seed = Date.now() % 2147483647;
    const list = pickMockQuestions(seed);
    const ends = Date.now() + MOCK_DURATION_MIN * 60 * 1000;
    const state = {
      seed,
      endsAt: ends,
      questions: list.map((q) => q.id),
      answers: {},
      current: 0,
      submitted: false,
    };
    saveMock(state);
    renderMockExam();
  });
  document.getElementById("clearMock").addEventListener("click", () => {
    clearMock();
    alert("Đã xóa phiên thi trong sessionStorage.");
  });
}

function getQuestionById(id) {
  return questions.find((q) => q.id === id);
}

function renderMockExam() {
  renderNav("mock");
  const state = loadMock();
  if (!state || state.submitted) {
    if (state && state.submitted) {
      return renderMockResult(state);
    }
    return renderMockIntro();
  }

  const ids = state.questions;
  const q = getQuestionById(ids[state.current]);
  const remaining = Math.max(0, state.endsAt - Date.now());
  const timerClass = remaining < 5 * 60 * 1000 ? (remaining < 60 * 1000 ? "danger" : "warn") : "";

  const pills = ids
    .map((id, i) => {
      const answered = state.answers[id] != null;
      const cur = i === state.current;
      return `<button type="button" class="q-pill ${cur ? "current" : ""} ${answered ? "answered" : ""}" data-i="${i}">${i + 1}</button>`;
    })
    .join("");

  const sel = state.answers[q.id] || null;

  const opts = ["A", "B", "C", "D"]
    .map(
      (k) => `
      <button type="button" class="option ${sel === k ? "selected" : ""}" data-key="${k}">
        <span class="option-key">${k}</span>
        <span>${esc(q.options[k])}</span>
      </button>
    `
    )
    .join("");

  app.innerHTML = `
    <div class="panel">
      <div class="mock-sticky-head">
        <div class="timer-bar ${timerClass}">
          <span>Thời gian còn: <strong>${formatMs(remaining)}</strong></span>
          <span>Câu ${state.current + 1} / ${ids.length}</span>
        </div>
        <div class="question-nav" role="toolbar" aria-label="Chuyển câu">${pills}</div>
      </div>
      <div class="quiz-q">${esc(q.question)}</div>
      <div class="options" id="mockOptions">${opts}</div>
      <div class="btn-row">
        <button type="button" class="btn" id="mPrev" ${state.current === 0 ? "disabled" : ""}>← Trước</button>
        <button type="button" class="btn" id="mNext" ${state.current === ids.length - 1 ? "disabled" : ""}>Tiếp →</button>
        <button type="button" class="btn btn-primary" id="mSubmit">Nộp bài</button>
      </div>
    </div>
  `;

  if (remaining <= 0) {
    state.submitted = true;
    saveMock(state);
    clearMockTimer();
    return renderMockResult(state);
  }

  clearMockTimer();
  mockTimerId = setInterval(() => {
    const st = loadMock();
    if (!st || st.submitted) {
      clearMockTimer();
      return;
    }
    const left = st.endsAt - Date.now();
    const strong = document.querySelector(".timer-bar strong");
    if (strong) strong.textContent = formatMs(Math.max(0, left));
    const bar = document.querySelector(".timer-bar");
    if (bar) {
      bar.classList.remove("warn", "danger");
      if (left < 5 * 60 * 1000 && left >= 60 * 1000) bar.classList.add("warn");
      if (left < 60 * 1000) bar.classList.add("danger");
    }
    if (left <= 0) {
      st.submitted = true;
      saveMock(st);
      clearMockTimer();
      renderMockResult(st);
    }
  }, 1000);

  document.getElementById("mockOptions").addEventListener("click", (e) => {
    const btn = e.target.closest(".option");
    if (!btn) return;
    const key = btn.getAttribute("data-key");
    state.answers[q.id] = key;
    saveMock(state);
    renderMockExam();
  });

  document.getElementById("mPrev").addEventListener("click", () => {
    if (state.current > 0) {
      state.current--;
      saveMock(state);
      renderMockExam();
    }
  });
  document.getElementById("mNext").addEventListener("click", () => {
    if (state.current < ids.length - 1) {
      state.current++;
      saveMock(state);
      renderMockExam();
    }
  });
  document.querySelectorAll(".q-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      state.current = Number(pill.getAttribute("data-i"));
      saveMock(state);
      renderMockExam();
    });
  });
  document.getElementById("mSubmit").addEventListener("click", () => {
    if (confirm("Nộp bài? Bạn vẫn có thể xem kết quả sau.")) {
      state.submitted = true;
      saveMock(state);
      clearMockTimer();
      renderMockResult(state);
    }
  });
}

function renderMockResult(state) {
  clearMockTimer();
  renderNav("mock");
  let correct = 0;
  const rows = state.questions
    .map((id) => {
      const q = getQuestionById(id);
      const ans = state.answers[id];
      const ok = ans === q.correct;
      if (ok) correct++;
      return `<tr>
        <td>${esc(q.question.slice(0, 72))}${q.question.length > 72 ? "…" : ""}</td>
        <td>${esc(ans || "—")}</td>
        <td>${esc(q.correct)}</td>
        <td style="color:${ok ? "var(--ok)" : "#ff8a8a"}">${ok ? "Đúng" : "Sai"}</td>
      </tr>`;
    })
    .join("");

  app.innerHTML = `
    <div class="panel">
      <h1>Kết quả thi thử</h1>
      <p><strong>${correct}</strong> / ${state.questions.length} câu đúng (${Math.round((correct / state.questions.length) * 100)}%).</p>
      <div class="btn-row mock-actions">
        <button type="button" class="btn btn-primary" id="againMock">Làm bài mới</button>
      </div>
      <div class="table-scroll-wrap">
        <table class="results-table">
          <thead><tr><th>Câu (rút gọn)</th><th>Bạn chọn</th><th>Đáp án</th><th>Kết quả</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <h2>Giải thích từng câu</h2>
      ${state.questions
        .map((id) => {
          const q = getQuestionById(id);
          const ans = state.answers[id];
          const ok = ans === q.correct;
          return `<div class="explain" style="margin-bottom:0.75rem;border-color:${ok ? "var(--ok)" : "var(--border)"}">
            <strong>${ok ? "✓" : "✗"}</strong> ${esc(q.question)}<br/>
            <span style="color:var(--muted);font-size:0.85rem;">Bạn: ${esc(ans || "—")} · Đúng: ${esc(q.correct)}</span><br/>
            ${esc(q.explain)}
          </div>`;
        })
        .join("")}
    </div>
  `;
  document.getElementById("againMock").addEventListener("click", () => {
    clearMock();
    renderMockIntro();
  });
}

/* ---------- Router ---------- */
function route() {
  const { parts, params } = parseHash();
  if (parts.length === 0) return renderHome();
  const [a, b] = parts;
  if (a === "theory") {
    if (!b) return renderTheoryList();
    return renderTheoryDetail(b);
  }
  if (a === "practice") return renderPractice(params);
  if (a === "mock") {
    const st = loadMock();
    if (st && !st.submitted) return renderMockExam();
    if (st && st.submitted) return renderMockResult(st);
    return renderMockIntro();
  }
  return renderHome();
}

function closeMobileNav() {
  if (!layoutEl) return;
  layoutEl.classList.remove("nav-open");
  const toggle = document.getElementById("menuToggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Mở điều hướng");
  }
  document.documentElement.classList.remove("nav-locked");
}

function initMobileNav() {
  const toggle = document.getElementById("menuToggle");
  const backdrop = document.getElementById("navBackdrop");
  if (!layoutEl || !toggle || toggle.dataset.bound === "1") return;
  toggle.dataset.bound = "1";

  const open = () => {
    layoutEl.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Đóng điều hướng");
    document.documentElement.classList.add("nav-locked");
  };

  toggle.addEventListener("click", () => {
    if (layoutEl.classList.contains("nav-open")) closeMobileNav();
    else open();
  });

  backdrop?.addEventListener("click", closeMobileNav);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMobileNav();
  });
}

window.addEventListener("hashchange", () => {
  closeMobileNav();
  clearMockTimer();
  route();
});
initMobileNav();
route();
