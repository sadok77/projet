const inboxMessages = [
  {
    id: 1,
    sender: "HR Portal",
    from: "hr@company-benefits.com",
    subject: "Benefits enrollment ends in 2 hours",
    snippet: "Update your records now to avoid losing coverage.",
    preview:
      "Benefits enrollment ends in 2 hours.\n\nUse the secure link below to confirm your employee password and payroll ID before access closes.",
    isPhishing: true,
    flags: [
      "Creates deadline pressure",
      "Requests password confirmation",
      "Domain may not match official HR system"
    ],
    explanation:
      "This is phishing. Real HR notices rarely ask for passwords, and urgent pressure is a common tactic."
  },
  {
    id: 2,
    sender: "Finance Team",
    from: "finance@company.com",
    subject: "April expense policy update",
    snippet: "Review the updated reimbursement limits in the employee portal.",
    preview:
      "The finance team updated reimbursement limits for travel and meals.\n\nPlease review the policy in the employee portal when convenient. No login link is included in this email.",
    isPhishing: false,
    flags: [
      "Sender domain matches company",
      "No pressure to act immediately",
      "No request for credentials or payment"
    ],
    explanation:
      "This looks legitimate. It uses a normal sender, provides context, and avoids high-risk requests."
  },
  {
    id: 3,
    sender: "Cloud Storage Alert",
    from: "alerts@driveshare-security.net",
    subject: "Shared document blocked for malware",
    snippet: "Open the attachment to release the quarantined file.",
    preview:
      "A file shared with you has been blocked for malware.\n\nOpen the attached HTML file to verify ownership and release the document back to your account.",
    isPhishing: true,
    flags: [
      "Unexpected attachment",
      "Unfamiliar domain",
      "Asks user to open a file to fix an account issue"
    ],
    explanation:
      "This is phishing. Attackers often use HTML attachments or fake security notices to pull users into credential theft pages."
  },
  {
    id: 4,
    sender: "Banking Alerts",
    from: "fraud-notice@secure-firstnational-alerts.net",
    subject: "Unusual transaction detected on your card",
    snippet: "Verify your card details within 15 minutes to prevent suspension.",
    preview:
      "We detected unusual card activity.\n\nVerify your card number, PIN, and one-time passcode immediately to prevent permanent account suspension.",
    isPhishing: true,
    flags: [
      "Requests highly sensitive financial data",
      "Creates urgent fear around account suspension",
      "Sender domain does not match a normal bank domain"
    ],
    explanation:
      "This is phishing. Banks do not ask for your PIN or one-time passcodes by email, and the sender domain is suspicious."
  },
  {
    id: 5,
    sender: "Campus Admin",
    from: "admin@university.edu",
    subject: "Library access schedule for exam week",
    snippet: "Opening hours are extended and no action is required.",
    preview:
      "The library will remain open until midnight during exam week.\n\nCheck the student portal for room availability if needed. No login or reply is required from this email.",
    isPhishing: false,
    flags: [
      "Sender domain matches the institution",
      "Informational message with no pressure",
      "Does not request credentials or payments"
    ],
    explanation:
      "This looks legitimate. It is a routine informational message and does not push a risky action."
  },
  {
    id: 6,
    sender: "DocuSign Support",
    from: "support@docusign-securefiles.io",
    subject: "Signature request failed",
    snippet: "Open the secure document again to avoid cancellation.",
    preview:
      "Your signature request failed to process.\n\nOpen the secure document link and sign in again with your company credentials to avoid cancellation of the agreement.",
    isPhishing: true,
    flags: [
      "Lookalike vendor domain",
      "Asks for company credentials through a link",
      "Uses process failure to create urgency"
    ],
    explanation:
      "This is phishing. Attackers often imitate common SaaS tools and use document-signing urgency to harvest passwords."
  },
  {
    id: 7,
    sender: "Project Leads",
    from: "project-leads@company.com",
    subject: "Sprint review moved to 3:30 PM",
    snippet: "Calendar invite updated. Same meeting room and no extra action needed.",
    preview:
      "The sprint review has been moved from 2:00 PM to 3:30 PM.\n\nYour calendar invite has been updated automatically. Use the usual internal meeting link if you join remotely.",
    isPhishing: false,
    flags: [
      "Normal internal sender address",
      "No unusual link or attachment",
      "No request for credentials or confidential data"
    ],
    explanation:
      "This looks legitimate. It reflects a normal operational update without suspicious pressure or data requests."
  },
  {
    id: 8,
    sender: "Payroll Desk",
    from: "payroll@company-payments.help",
    subject: "Salary adjustment form pending",
    snippet: "Complete the attached form today to avoid payroll delay.",
    preview:
      "Your salary adjustment form is still pending.\n\nDownload and complete the attached spreadsheet with your bank account details and employee portal password before today's payroll cutoff.",
    isPhishing: true,
    flags: [
      "Requests banking details and password together",
      "Uses payroll urgency to pressure action",
      "Sender domain is not the company domain"
    ],
    explanation:
      "This is phishing. Combining payroll urgency with requests for bank data and passwords is a strong indicator of malicious intent."
  }
];

const quizQuestions = [
  {
    question: "Which sign is the strongest phishing indicator?",
    options: [
      "The message asks you to confirm your password through a link",
      "The message includes a company logo",
      "The message arrives during business hours"
    ],
    correct: 0,
    explanation: "Correct. Requests for passwords through links are a high-risk sign, even when branding looks convincing."
  },
  {
    question: "A text says your package is delayed and asks for a small fee. What should you do first?",
    options: [
      "Pay quickly so the package is not returned",
      "Open the official carrier app or site yourself and verify independently",
      "Reply and ask the sender if it is real"
    ],
    correct: 1,
    explanation: "Correct. Always verify through a trusted channel you open yourself."
  }
];

const mailList = document.getElementById("mail-list");
const messageSubject = document.getElementById("message-subject");
const messageFrom = document.getElementById("message-from");
const messagePreview = document.getElementById("message-preview");
const feedbackBox = document.getElementById("feedback-box");
const inspectorGrid = document.getElementById("inspector-grid");
const flagButton = document.getElementById("flag-button");
const trustButton = document.getElementById("trust-button");
const themeToggle = document.getElementById("theme-toggle");
const themeToggleLabel = document.getElementById("theme-toggle-label");
const logoutButton = document.getElementById("logout-button");
const scorePill = document.getElementById("score-pill");
const saveStatus = document.getElementById("save-status");
const sessionPill = document.getElementById("session-pill");
const statNumbers = document.querySelectorAll(".stat-number");
const loginDemoForm = document.getElementById("login-demo-form");
const demoResult = document.getElementById("demo-result");
const stolenDataList = document.getElementById("stolen-data-list");
const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizResult = document.getElementById("quiz-result");
const quizProgressLabel = document.getElementById("quiz-progress-label");
const quizProgressRatio = document.getElementById("quiz-progress-ratio");
const quizProgressFill = document.getElementById("quiz-progress-fill");
const authShell = document.getElementById("auth-shell");
const siteContent = document.getElementById("site-content");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authFeedback = document.getElementById("auth-feedback");
const authWordTargets = document.querySelectorAll(".auth-word-target");
const revealElements = document.querySelectorAll(".reveal");
const leaderboardList = document.getElementById("leaderboard-list");
const badgeFirstStep = document.getElementById("badge-first-step");
const badgeSharpEye = document.getElementById("badge-sharp-eye");
const badgeQuizMaster = document.getElementById("badge-quiz-master");
const badgePhishingExpert = document.getElementById("badge-phishing-expert");
const dashboardUsername = document.getElementById("dashboard-username");
const dashboardLevelPill = document.getElementById("dashboard-level-pill");
const dashboardScore = document.getElementById("dashboard-score");
const dashboardLevel = document.getElementById("dashboard-level");
const dashboardBadgesCount = document.getElementById("dashboard-badges-count");
const dashboardBadgesMeta = document.getElementById("dashboard-badges-meta");
const dashboardBadgeList = document.getElementById("dashboard-badge-list");
const dashboardSimulationMeta = document.getElementById("dashboard-simulation-meta");
const dashboardSimulationCount = document.getElementById("dashboard-simulation-count");
const dashboardSimulationNote = document.getElementById("dashboard-simulation-note");
const dashboardSimulationFill = document.getElementById("dashboard-simulation-fill");
const dashboardSimulationCaption = document.getElementById("dashboard-simulation-caption");

let selectedMessage = null;
let currentQuizIndex = 0;
const API_BASE_URL = "http://localhost:3000/api";
const SESSION_KEY = "phishlab-session";
const TOKEN_KEY = "phishlab-token";
const USER_KEY = "phishlab-user";
const PROGRESS_KEY_PREFIX = "phishlab-progress";
let previewTypingTimer = null;
let saveStatusTimer = null;
let totalScore = 0;
let currentLevel = "Beginner";
const scoredSimulationMessages = new Set();
const decidedSimulationMessages = new Set();
const scoredQuizQuestions = new Set();
const syncedBadges = new Set();
let correctSimulationCount = 0;
let totalCorrectAnswers = 0;
let quizCompleted = false;

function getLevelFromScore(score) {
  if (score <= 50) {
    return "Beginner";
  }

  if (score <= 150) {
    return "Intermediate";
  }

  if (score <= 300) {
    return "Expert";
  }

  return "Master";
}

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  themeToggleLabel.textContent = theme === "dark" ? "Light mode" : "Dark mode";
}

function loadTheme() {
  const savedTheme = window.localStorage.getItem("phishlab-theme");
  const initialTheme = savedTheme === "light" ? "light" : "dark";
  applyTheme(initialTheme);
}

function setAuthMode(mode) {
  const loginActive = mode === "login";
  loginTab.classList.toggle("active", loginActive);
  registerTab.classList.toggle("active", !loginActive);
  loginForm.classList.toggle("active", loginActive);
  registerForm.classList.toggle("active", !loginActive);
  authFeedback.textContent = loginActive
    ? "Use your saved username and password to access the site."
    : "Create a demo account stored only in this browser.";
}

function getStoredUser() {
  const raw = window.localStorage.getItem(USER_KEY);

  if (!raw) {
    return null;
  }

  try {
    const user = JSON.parse(raw);
    return user && typeof user.username === "string" ? user : null;
  } catch {
    window.localStorage.removeItem(USER_KEY);
    return null;
  }
}

function getCurrentUsername() {
  return getStoredUser()?.username || window.localStorage.getItem(SESSION_KEY) || "";
}

function getProgressStorageKey(username = getCurrentUsername()) {
  return username ? `${PROGRESS_KEY_PREFIX}-${username}` : "";
}

function persistLocalProgress() {
  const key = getProgressStorageKey();

  if (!key) {
    return;
  }

  const payload = {
    scoredSimulationMessages: Array.from(scoredSimulationMessages),
    decidedSimulationMessages: Array.from(decidedSimulationMessages),
    scoredQuizQuestions: Array.from(scoredQuizQuestions),
    correctSimulationCount,
    totalCorrectAnswers,
    quizCompleted,
    currentQuizIndex
  };

  window.localStorage.setItem(key, JSON.stringify(payload));
}

function loadLocalProgress() {
  const key = getProgressStorageKey();

  scoredSimulationMessages.clear();
  decidedSimulationMessages.clear();
  scoredQuizQuestions.clear();
  correctSimulationCount = 0;
  totalCorrectAnswers = 0;
  quizCompleted = false;
  currentQuizIndex = 0;

  if (!key) {
    return;
  }

  const raw = window.localStorage.getItem(key);

  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    const simulationIds = Array.isArray(parsed.scoredSimulationMessages) ? parsed.scoredSimulationMessages : [];
    const decidedIds = Array.isArray(parsed.decidedSimulationMessages)
      ? parsed.decidedSimulationMessages
      : simulationIds;
    const quizIndexes = Array.isArray(parsed.scoredQuizQuestions) ? parsed.scoredQuizQuestions : [];

    simulationIds.forEach((id) => scoredSimulationMessages.add(id));
    decidedIds.forEach((id) => decidedSimulationMessages.add(id));
    quizIndexes.forEach((index) => scoredQuizQuestions.add(index));
    correctSimulationCount = Number(parsed.correctSimulationCount ?? simulationIds.length) || 0;
    totalCorrectAnswers = Number(parsed.totalCorrectAnswers ?? (simulationIds.length + quizIndexes.length)) || 0;
    quizCompleted = Boolean(parsed.quizCompleted);
    currentQuizIndex = Math.min(
      Number(parsed.currentQuizIndex ?? 0) || 0,
      Math.max(quizQuestions.length - 1, 0)
    );
  } catch {
    window.localStorage.removeItem(key);
  }
}

function updateDashboard() {
  const username = getCurrentUsername();
  const unlockedBadges = getUnlockedBadges();
  const totalSimulationScenarios = inboxMessages.length;
  const completedScenarios = scoredSimulationMessages.size;
  const progressPercent = totalSimulationScenarios === 0
    ? 0
    : Math.round((completedScenarios / totalSimulationScenarios) * 100);

  dashboardUsername.textContent = username || "Signed out";
  dashboardLevelPill.textContent = currentLevel;
  dashboardScore.textContent = `${totalScore} pts`;
  dashboardLevel.textContent = currentLevel;
  dashboardBadgesCount.textContent = `${unlockedBadges.length}/4`;
  dashboardBadgesMeta.textContent = `${unlockedBadges.length} unlocked`;

  if (unlockedBadges.length === 0) {
    dashboardBadgeList.innerHTML = `<span class="dashboard-empty">No badges earned yet.</span>`;
  } else {
    dashboardBadgeList.innerHTML = unlockedBadges
      .map((badge) => `<span class="dashboard-badge-chip">${badge}</span>`)
      .join("");
  }

  dashboardSimulationMeta.textContent = `${completedScenarios} of ${totalSimulationScenarios}`;
  dashboardSimulationCount.textContent = `${completedScenarios}/${totalSimulationScenarios}`;
  dashboardSimulationNote.textContent = `${correctSimulationCount} correct simulation decisions`;
  dashboardSimulationFill.style.width = `${progressPercent}%`;
  dashboardSimulationCaption.textContent = completedScenarios === 0
    ? "Complete inbox decisions to build simulation progress."
    : `${progressPercent}% of the inbox simulation completed in this browser session history.`;
}

function setSession(user, token) {
  window.localStorage.setItem(SESSION_KEY, user.username);
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  sessionPill.textContent = `Signed in as ${user.username}`;
  setSaveStatus("idle", "Ready to sync");
  authShell.classList.add("hidden");
  siteContent.classList.remove("hidden");
  logoutButton.classList.remove("hidden");
  loadLocalProgress();
  updateDashboard();
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  sessionPill.textContent = "Signed out";
  setSaveStatus("idle", "Not synced");
  authShell.classList.remove("hidden");
  siteContent.classList.add("hidden");
  logoutButton.classList.add("hidden");
  updateDashboard();
}

function updateScoreDisplay() {
  scorePill.textContent = `Score ${totalScore} pts | ${currentLevel}`;
  updateDashboard();
}

function setBadgeState(element, unlocked) {
  if (!element) {
    return;
  }

  element.classList.toggle("unlocked", unlocked);
  element.classList.toggle("locked", !unlocked);

  const stateElement = element.querySelector(".badge-state");
  if (stateElement) {
    stateElement.textContent = unlocked ? "Unlocked" : "Locked";
  }

  const hintElement = element.querySelector(".badge-hint");
  if (hintElement) {
    hintElement.textContent = unlocked ? "Requirement completed." : getBadgeHint(element.id);
  }
}

function getBadgeHint(badgeId) {
  switch (badgeId) {
    case "badge-first-step":
      return totalCorrectAnswers >= 1
        ? "Requirement completed."
        : `Need ${Math.max(1 - totalCorrectAnswers, 0)} more correct answer.`;
    case "badge-sharp-eye":
      return correctSimulationCount >= 3
        ? "Requirement completed."
        : `Need ${Math.max(3 - correctSimulationCount, 0)} more correct simulation decisions.`;
    case "badge-quiz-master": {
      const remainingQuestions = Math.max(quizQuestions.length - scoredQuizQuestions.size, 1);
      return quizCompleted
        ? "Requirement completed."
        : `Complete ${remainingQuestions} more quiz question${remainingQuestions === 1 ? "" : "s"}.`;
    }
    case "badge-phishing-expert": {
      const pointsToExpert = Math.max(151 - totalScore, 0);
      return currentLevel === "Expert" || currentLevel === "Master"
        ? "Requirement completed."
        : `Earn ${pointsToExpert} more point${pointsToExpert === 1 ? "" : "s"} to reach Expert.`;
    }
    default:
      return "Keep progressing to unlock this badge.";
  }
}

function updateBadges() {
  const level = getLevelFromScore(totalScore);
  setBadgeState(badgeFirstStep, totalCorrectAnswers >= 1);
  setBadgeState(badgeSharpEye, correctSimulationCount >= 3);
  setBadgeState(badgeQuizMaster, quizCompleted);
  setBadgeState(badgePhishingExpert, level === "Expert" || level === "Master");
  updateDashboard();
}

function setSaveStatus(state, text) {
  if (!saveStatus) {
    return;
  }

  if (saveStatusTimer) {
    window.clearTimeout(saveStatusTimer);
    saveStatusTimer = null;
  }

  saveStatus.className = `save-status save-status-${state}`;
  saveStatus.textContent = text;

  if (state === "saved") {
    saveStatusTimer = window.setTimeout(() => {
      saveStatus.className = "save-status save-status-idle";
      saveStatus.textContent = "Ready to sync";
      saveStatusTimer = null;
    }, 2200);
  }
}

function getUnlockedBadges() {
  const unlockedBadges = new Set(syncedBadges);

  if (totalCorrectAnswers >= 1) {
    unlockedBadges.add("First Steps");
  }

  if (correctSimulationCount >= 3) {
    unlockedBadges.add("Sharp Eye");
  }

  if (quizCompleted) {
    unlockedBadges.add("Quiz Master");
  }

  const level = getLevelFromScore(totalScore);
  if (level === "Expert" || level === "Master") {
    unlockedBadges.add("Phishing Expert");
  }

  return Array.from(unlockedBadges);
}

function resetScore() {
  totalScore = 0;
  currentLevel = "Beginner";
  currentQuizIndex = 0;
  scoredSimulationMessages.clear();
  decidedSimulationMessages.clear();
  scoredQuizQuestions.clear();
  syncedBadges.clear();
  correctSimulationCount = 0;
  totalCorrectAnswers = 0;
  quizCompleted = false;
  updateScoreDisplay();
  updateBadges();
  persistLocalProgress();
  renderQuiz();
}

function syncProgressFromUser(user) {
  loadLocalProgress();
  totalScore = Number(user?.score ?? 0);
  currentLevel = typeof user?.level === "string" && user.level
    ? user.level
    : getLevelFromScore(totalScore);
  updateScoreDisplay();
  updateBadges();

  syncedBadges.clear();
  if (Array.isArray(user?.badges)) {
    const savedBadges = new Set(user.badges);
    user.badges.forEach((badge) => syncedBadges.add(badge));
    setBadgeState(badgeFirstStep, savedBadges.has("First Steps"));
    setBadgeState(badgeSharpEye, savedBadges.has("Sharp Eye"));
    setBadgeState(badgeQuizMaster, savedBadges.has("Quiz Master"));
    setBadgeState(
      badgePhishingExpert,
      savedBadges.has("Phishing Expert") || currentLevel === "Expert" || currentLevel === "Master"
    );
  }

  updateDashboard();
  renderQuiz();
}

function awardSimulationPoints() {
  if (!selectedMessage || scoredSimulationMessages.has(selectedMessage.id)) {
    return false;
  }

  totalScore += 10;
  currentLevel = getLevelFromScore(totalScore);
  correctSimulationCount += 1;
  totalCorrectAnswers += 1;
  scoredSimulationMessages.add(selectedMessage.id);
  updateScoreDisplay();
  updateBadges();
  persistLocalProgress();
  return true;
}

function awardQuizPoints() {
  if (scoredQuizQuestions.has(currentQuizIndex)) {
    return false;
  }

  totalScore += 5;
  currentLevel = getLevelFromScore(totalScore);
  totalCorrectAnswers += 1;
  scoredQuizQuestions.add(currentQuizIndex);
  updateScoreDisplay();
  updateBadges();
  persistLocalProgress();
  return true;
}

function loadSession() {
  const user = getStoredUser();
  const username = user?.username || window.localStorage.getItem(SESSION_KEY);
  const token = window.localStorage.getItem(TOKEN_KEY);

  if (username && token) {
    setSession(user || { username }, token);
    if (user) {
      syncProgressFromUser(user);
    }
    syncUserFromBackend();
    return;
  }

  clearSession();
}

function getAuthToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, options);

  let data = {};
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

function isAuthError(error) {
  return error?.message === "Invalid or expired token" || error?.message === "Missing bearer token";
}

async function postJson(url, payload, token) {
  const headers = {
    "Content-Type": "application/json"
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return requestJson(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload)
  });
}

async function syncUserFromBackend() {
  const token = getAuthToken();

  if (!token) {
    return;
  }

  try {
    setSaveStatus("saving", "Syncing...");
    const data = await requestJson(`${API_BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setSession(data.user, token);
    syncProgressFromUser(data.user);
    setSaveStatus("saved", "Synced");
  } catch (error) {
    if (isAuthError(error)) {
      clearSession();
      resetScore();
      setAuthMode("login");
      authFeedback.textContent = error.message;
      setSaveStatus("error", "Session expired");
      return;
    }

    setSaveStatus("error", "Using saved session");
    authFeedback.textContent = `Restored from local storage. Backend sync failed: ${error.message}`;
  }
}

async function persistScore() {
  const token = getAuthToken();

  if (!token) {
    return;
  }

  try {
    setSaveStatus("saving", "Saving...");
    const data = await postJson(
      `${API_BASE_URL}/user/score`,
      {
        score: totalScore,
        level: currentLevel,
        badges: getUnlockedBadges()
      },
      token
    );
    syncProgressFromUser(data.user);
    loadLeaderboard();
    setSaveStatus("saved", "Progress saved");
  } catch (error) {
    if (isAuthError(error)) {
      clearSession();
      resetScore();
      setAuthMode("login");
    }
    setSaveStatus("error", "Save failed");
    authFeedback.textContent = error.message;
  }
}

async function postScoreUpdate(pointsAwarder) {
  const awarded = pointsAwarder();

  if (awarded) {
    await persistScore();
  }

  return awarded;
}

async function loadLeaderboard() {
  try {
    const response = await fetch(`${API_BASE_URL}/leaderboard`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to load leaderboard");
    }

    const rows = Array.isArray(data.leaderboard) ? data.leaderboard : [];

    if (rows.length === 0) {
      leaderboardList.innerHTML = `<div class="leaderboard-empty">No leaderboard entries yet.</div>`;
      return;
    }

    leaderboardList.innerHTML = rows.map((entry) => `
      <article class="leaderboard-row">
        <div class="leaderboard-rank">#${entry.rank}</div>
        <div class="leaderboard-user">${entry.username}</div>
        <div class="leaderboard-level">${entry.level}</div>
        <div class="leaderboard-badges">${entry.badges}</div>
        <div class="leaderboard-score">${entry.score} pts</div>
      </article>
    `).join("");
  } catch (error) {
    leaderboardList.innerHTML = `<div class="leaderboard-empty">${error.message}</div>`;
  }
}

function typeMessagePreview(text) {
  if (previewTypingTimer) {
    window.clearTimeout(previewTypingTimer);
    previewTypingTimer = null;
  }

  messagePreview.textContent = "";
  let index = 0;

  function typeNextCharacter() {
    messagePreview.textContent = text.slice(0, index);
    index += 1;

    if (index <= text.length) {
      const delay = text[index - 1] === "\n" ? 18 : 12;
      previewTypingTimer = window.setTimeout(typeNextCharacter, delay);
    }
  }

  typeNextCharacter();
}

function animateHeroStats() {
  statNumbers.forEach((element) => {
    const target = Number(element.dataset.target || "0");
    const suffix = element.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * easedProgress);
      element.textContent = `${value}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(update);
      }
    }

    window.requestAnimationFrame(update);
  });
}

function setupRevealAnimations() {
  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, revealObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -48px 0px"
    }
  );

  revealElements.forEach((element) => {
    if (element.classList.contains("visible")) {
      return;
    }
    observer.observe(element);
  });
}

function setupAuthWordAnimation() {
  authWordTargets.forEach((element, elementIndex) => {
    const text = element.textContent.trim().replace(/\s+/g, " ");

    if (!text) {
      return;
    }

    const words = text.split(" ");
    element.textContent = "";

    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "auth-word";
      wordSpan.textContent = word;
      wordSpan.style.animationDelay = `${elementIndex * 220 + wordIndex * 65}ms`;
      element.appendChild(wordSpan);

      if (wordIndex < words.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.className = "auth-word-space";
        spaceSpan.textContent = " ";
        element.appendChild(spaceSpan);
      }
    });
  });
}

function renderInbox() {
  mailList.innerHTML = "";

  inboxMessages.forEach((message, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mail-item";
    button.dataset.messageId = String(message.id);
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    button.innerHTML = `
      <span class="mail-sender">${message.sender}</span>
      <span class="mail-subject">${message.subject}</span>
      <span class="mail-snippet">${message.snippet}</span>
    `;
    button.addEventListener("click", () => selectMessage(message.id));
    mailList.appendChild(button);
    updateInboxDecisionState(message.id);
  });

  selectMessage(inboxMessages[0].id);
}

function updateInboxDecisionState(messageId) {
  const button = mailList.querySelector(`[data-message-id="${messageId}"]`);
  const message = inboxMessages.find((item) => item.id === messageId);

  if (!button || !message) {
    return;
  }

  const isRevealed = decidedSimulationMessages.has(messageId);
  button.classList.toggle("mail-item-revealed", isRevealed);
  button.classList.toggle("mail-item-phishing", isRevealed && message.isPhishing);
  button.classList.toggle("mail-item-legitimate", isRevealed && !message.isPhishing);
}

function selectMessage(messageId) {
  selectedMessage = inboxMessages.find((item) => item.id === messageId);
  const buttons = mailList.querySelectorAll(".mail-item");

  buttons.forEach((button, index) => {
    const active = inboxMessages[index].id === messageId;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", active ? "true" : "false");
  });

  messageSubject.textContent = selectedMessage.subject;
  messageFrom.textContent = `From: ${selectedMessage.from}`;
  typeMessagePreview(selectedMessage.preview);
  inspectorGrid.innerHTML = "";
  selectedMessage.flags.forEach((flag) => {
    const tag = document.createElement("span");
    tag.className = "flag-pill";
    tag.textContent = flag;
    inspectorGrid.appendChild(tag);
  });

  feedbackBox.className = "feedback-box";
  feedbackBox.textContent = "Decide whether this message is phishing or legitimate.";
}

async function handleDecision(markedAsPhishing) {
  if (!selectedMessage) {
    return;
  }

  const correct = markedAsPhishing === selectedMessage.isPhishing;
  decidedSimulationMessages.add(selectedMessage.id);
  persistLocalProgress();
  updateInboxDecisionState(selectedMessage.id);
  const awarded = correct ? await postScoreUpdate(awardSimulationPoints) : false;
  feedbackBox.className = `feedback-box ${correct ? "good" : "bad"}`;
  feedbackBox.textContent = correct
    ? `Correct.${awarded ? " +10 points." : ""} ${selectedMessage.explanation}`
    : `Not quite. ${selectedMessage.explanation}`;
}

function renderQuiz() {
  const current = quizQuestions[currentQuizIndex];
  const currentQuestionNumber = currentQuizIndex + 1;
  const progressPercent = Math.round((currentQuestionNumber / quizQuestions.length) * 100);

  quizProgressLabel.textContent = `Question ${currentQuestionNumber} of ${quizQuestions.length}`;
  quizProgressRatio.textContent = `${progressPercent}%`;
  quizProgressFill.style.width = `${progressPercent}%`;
  quizQuestion.textContent = current.question;
  quizOptions.innerHTML = "";
  quizResult.textContent = "Choose an answer to see feedback.";

  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", async () => {
      const correct = index === current.correct;
      const awarded = correct ? await postScoreUpdate(awardQuizPoints) : false;
      quizResult.textContent = correct
        ? `${awarded ? "+5 points. " : ""}${current.explanation}`
        : `Incorrect. ${current.explanation}`;

      if (correct && currentQuizIndex < quizQuestions.length - 1) {
        window.setTimeout(() => {
          currentQuizIndex += 1;
          persistLocalProgress();
          renderQuiz();
        }, 1200);
      } else if (correct) {
        quizCompleted = true;
        updateBadges();
        persistLocalProgress();
      }
    });
    quizOptions.appendChild(button);
  });
}

flagButton.addEventListener("click", () => handleDecision(true));
trustButton.addEventListener("click", () => handleDecision(false));

loginDemoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("demo-email").value.trim();
  const password = document.getElementById("demo-password").value.trim();
  demoResult.classList.remove("alert-active");
  demoResult.classList.remove("stolen-data-visible");
  stolenDataList.innerHTML = "";

  if (!email || !password) {
    demoResult.querySelector(".demo-result-copy").textContent =
      "Attackers benefit when people type first and think later. Even incomplete forms can expose useful information.";
    window.requestAnimationFrame(() => {
      demoResult.classList.add("alert-active");
    });
    return;
  }

  const maskedPassword = "\u2022".repeat(Math.min(password.length, 12));
  const stolenItems = [
    {
      label: "Captured email",
      value: email,
      note: "Used to identify the employee, company, and likely login targets."
    },
    {
      label: "Captured password",
      value: maskedPassword,
      note: "The real password could be replayed against email, VPN, or shared SaaS accounts."
    },
    {
      label: "Likely next step",
      value: "Account takeover attempts",
      note: "Attackers often test the same credentials across payroll, cloud docs, and messaging tools."
    }
  ];

  demoResult.querySelector(".demo-result-copy").textContent =
    `If this were a real phishing site, the credentials for ${email} would now be in the attacker's hands. ` +
    "The page looks polished, but the suspicious domain and pressure-driven message are the real clues.";

  stolenItems.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "stolen-data-item";
    row.style.setProperty("--stolen-delay", `${index * 120}ms`);
    row.innerHTML = `
      <div class="stolen-data-label">${item.label}</div>
      <strong class="stolen-data-value">${item.value}</strong>
      <p class="stolen-data-note">${item.note}</p>
    `;
    stolenDataList.appendChild(row);
  });

  window.requestAnimationFrame(() => {
    demoResult.classList.add("alert-active");
    demoResult.classList.add("stolen-data-visible");
  });
});

loginTab.addEventListener("click", () => setAuthMode("login"));
registerTab.addEventListener("click", () => setAuthMode("register"));

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();

  if (!username || !password) {
    authFeedback.textContent = "Enter both username and password.";
    return;
  }

  authFeedback.textContent = "Signing in...";

  try {
    const data = await postJson(`${API_BASE_URL}/auth/login`, { username, password });
    authFeedback.textContent = `Welcome back, ${data.user.username}.`;
    loginForm.reset();
    setSession(data.user, data.token);
    syncProgressFromUser(data.user);
  } catch (error) {
    authFeedback.textContent = error.message;
  }
});

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();

  if (!username || !password) {
    authFeedback.textContent = "Choose both a username and password.";
    return;
  }

  if (password.length < 4) {
    authFeedback.textContent = "Use a password with at least 4 characters.";
    return;
  }

  authFeedback.textContent = "Creating account...";

  try {
    const data = await postJson(`${API_BASE_URL}/auth/register`, { username, password });
    authFeedback.textContent = `Account created for ${data.user.username}. You are now signed in.`;
    registerForm.reset();
    setSession(data.user, data.token);
    syncProgressFromUser(data.user);
  } catch (error) {
    authFeedback.textContent = error.message;
  }
});

logoutButton.addEventListener("click", () => {
  clearSession();
  resetScore();
  setAuthMode("login");
  authFeedback.textContent = "You have been logged out.";
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  window.localStorage.setItem("phishlab-theme", nextTheme);
});

loadTheme();
setAuthMode("login");
updateScoreDisplay();
loadSession();
renderInbox();
renderQuiz();
loadLeaderboard();
animateHeroStats();
setupRevealAnimations();
setupAuthWordAnimation();
