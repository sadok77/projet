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
const sessionPill = document.getElementById("session-pill");
const statNumbers = document.querySelectorAll(".stat-number");
const loginDemoForm = document.getElementById("login-demo-form");
const demoResult = document.getElementById("demo-result");
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
const revealElements = document.querySelectorAll(".reveal");
const leaderboardList = document.getElementById("leaderboard-list");
const badgeFirstStep = document.getElementById("badge-first-step");
const badgeSharpEye = document.getElementById("badge-sharp-eye");
const badgeQuizMaster = document.getElementById("badge-quiz-master");
const badgePhishingExpert = document.getElementById("badge-phishing-expert");

let selectedMessage = null;
let currentQuizIndex = 0;
const API_BASE_URL = "http://localhost:3000/api";
const SESSION_KEY = "phishlab-session";
const TOKEN_KEY = "phishlab-token";
let previewTypingTimer = null;
let totalScore = 0;
let currentLevel = "Beginner";
const scoredSimulationMessages = new Set();
const scoredQuizQuestions = new Set();
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

function setSession(user, token) {
  window.localStorage.setItem(SESSION_KEY, user.username);
  window.localStorage.setItem(TOKEN_KEY, token);
  sessionPill.textContent = `Signed in as ${user.username}`;
  authShell.classList.add("hidden");
  siteContent.classList.remove("hidden");
  logoutButton.classList.remove("hidden");
}

function clearSession() {
  window.localStorage.removeItem(SESSION_KEY);
  window.localStorage.removeItem(TOKEN_KEY);
  sessionPill.textContent = "Signed out";
  authShell.classList.remove("hidden");
  siteContent.classList.add("hidden");
  logoutButton.classList.add("hidden");
}

function updateScoreDisplay() {
  scorePill.textContent = `Score ${totalScore} pts | ${currentLevel}`;
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
}

function updateBadges() {
  const level = getLevelFromScore(totalScore);
  setBadgeState(badgeFirstStep, totalCorrectAnswers >= 1);
  setBadgeState(badgeSharpEye, correctSimulationCount >= 3);
  setBadgeState(badgeQuizMaster, quizCompleted);
  setBadgeState(badgePhishingExpert, level === "Expert" || level === "Master");
}

function resetScore() {
  totalScore = 0;
  currentLevel = "Beginner";
  scoredSimulationMessages.clear();
  scoredQuizQuestions.clear();
  correctSimulationCount = 0;
  totalCorrectAnswers = 0;
  quizCompleted = false;
  updateScoreDisplay();
  updateBadges();
}

function syncProgressFromUser(user) {
  totalScore = Number(user?.score ?? 0);
  currentLevel = typeof user?.level === "string" && user.level
    ? user.level
    : getLevelFromScore(totalScore);
  updateScoreDisplay();
  updateBadges();
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
  return true;
}

function loadSession() {
  const username = window.localStorage.getItem(SESSION_KEY);
  const token = window.localStorage.getItem(TOKEN_KEY);

  if (username && token) {
    setSession({ username }, token);
    return;
  }

  clearSession();
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

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

function renderInbox() {
  mailList.innerHTML = "";

  inboxMessages.forEach((message, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mail-item";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", index === 0 ? "true" : "false");
    button.innerHTML = `
      <span class="mail-sender">${message.sender}</span>
      <span class="mail-subject">${message.subject}</span>
      <span class="mail-snippet">${message.snippet}</span>
    `;
    button.addEventListener("click", () => selectMessage(message.id));
    mailList.appendChild(button);
  });

  selectMessage(inboxMessages[0].id);
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

function handleDecision(markedAsPhishing) {
  if (!selectedMessage) {
    return;
  }

  const correct = markedAsPhishing === selectedMessage.isPhishing;
  const awarded = correct ? awardSimulationPoints() : false;
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
    button.addEventListener("click", () => {
      const correct = index === current.correct;
      const awarded = correct ? awardQuizPoints() : false;
      quizResult.textContent = correct
        ? `${awarded ? "+5 points. " : ""}${current.explanation}`
        : `Incorrect. ${current.explanation}`;

      if (correct && currentQuizIndex < quizQuestions.length - 1) {
        window.setTimeout(() => {
          currentQuizIndex += 1;
          renderQuiz();
        }, 1200);
      } else if (correct) {
        quizCompleted = true;
        updateBadges();
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

  if (!email || !password) {
    demoResult.textContent = "Attackers benefit when people type first and think later. Even incomplete forms can expose useful information.";
    window.requestAnimationFrame(() => {
      demoResult.classList.add("alert-active");
    });
    return;
  }

  demoResult.textContent =
    `If this were a real phishing site, the credentials for ${email} would now be in the attacker's hands. ` +
    "The page looks polished, but the suspicious domain and pressure-driven message are the real clues.";
  window.requestAnimationFrame(() => {
    demoResult.classList.add("alert-active");
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
