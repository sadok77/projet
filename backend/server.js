const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const { readUsers, writeUsers } = require("./src/storage");
const {
  hashPassword,
  verifyPassword,
  signToken,
  authenticateToken
} = require("./src/auth");

const app = express();
const PORT = Number(process.env.PORT || 3000);
const clientOrigin = process.env.CLIENT_ORIGIN || "*";
const NEWS_API_KEY = process.env.NEWS_API_KEY || "cec9947b43754b228c6ee36c7f16fdc1";

app.use(cors({
  origin: clientOrigin === "*" ? true : clientOrigin,
  credentials: true
}));
app.use(express.json());

function sanitizeUser(user) {
  return {
    id: user.id,
    username: user.username,
    score: user.score,
    level: user.level,
    badges: user.badges,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function validateCredentials(username, password) {
  if (!username || !password) {
    return "Username and password are required";
  }

  if (String(username).trim().length < 3) {
    return "Username must be at least 3 characters";
  }

  if (String(password).length < 6) {
    return "Password must be at least 6 characters";
  }

  return null;
}

function normalizeScorePayload(body) {
  return {
    score: Number(body.score ?? 0),
    level: typeof body.level === "string" ? body.level : "Beginner",
    badges: Array.isArray(body.badges) ? body.badges : []
  };
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/auth/register", async (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");
  const error = validateCredentials(username, password);

  if (error) {
    return res.status(400).json({ message: error });
  }

  const users = await readUsers();
  const existingUser = users.find((user) => user.username.toLowerCase() === username.toLowerCase());

  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const now = new Date().toISOString();
  const user = {
    id: crypto.randomUUID(),
    username,
    passwordHash: hashPassword(password),
    score: 0,
    level: "Beginner",
    badges: [],
    createdAt: now,
    updatedAt: now
  };

  users.push(user);
  await writeUsers(users);

  const token = signToken(user);
  return res.status(201).json({
    message: "User registered successfully",
    token,
    user: sanitizeUser(user)
  });
});

app.post("/api/auth/login", async (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");
  const users = await readUsers();
  const user = users.find((entry) => entry.username.toLowerCase() === username.toLowerCase());

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  user.updatedAt = new Date().toISOString();
  await writeUsers(users);

  const token = signToken(user);
  return res.json({
    message: "Login successful",
    token,
    user: sanitizeUser(user)
  });
});

app.get("/api/user/me", authenticateToken, async (req, res) => {
  const users = await readUsers();
  const user = users.find((entry) => entry.id === req.auth.sub);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({ user: sanitizeUser(user) });
});

app.post("/api/user/score", authenticateToken, async (req, res) => {
  const payload = normalizeScorePayload(req.body);

  if (!Number.isFinite(payload.score) || payload.score < 0) {
    return res.status(400).json({ message: "Score must be a non-negative number" });
  }

  const users = await readUsers();
  const user = users.find((entry) => entry.id === req.auth.sub);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.score = payload.score;
  user.level = payload.level;
  user.badges = payload.badges;
  user.updatedAt = new Date().toISOString();
  await writeUsers(users);

  return res.json({
    message: "Score saved successfully",
    user: sanitizeUser(user)
  });
});

app.get("/api/user/score", authenticateToken, async (req, res) => {
  const users = await readUsers();
  const user = users.find((entry) => entry.id === req.auth.sub);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    score: user.score,
    level: user.level,
    badges: user.badges
  });
});

async function handleCybersecurityNews(req, res) {
  try {
    const newsUrl = new URL("https://newsapi.org/v2/everything");
    newsUrl.searchParams.set("q", "cybersecurity");
    newsUrl.searchParams.set("language", "en");
    newsUrl.searchParams.set("sortBy", "publishedAt");
    newsUrl.searchParams.set("pageSize", "6");

    const response = await fetch(newsUrl, {
      headers: {
        "X-Api-Key": NEWS_API_KEY
      }
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        message: data.message || "Failed to load cybersecurity news"
      });
    }

    const articles = Array.isArray(data.articles)
      ? data.articles.map((article) => ({
          title: article.title,
          source: article.source?.name || "Unknown source",
          publishedAt: article.publishedAt,
          url: article.url
        }))
      : [];

    return res.json({ articles });
  } catch (error) {
    return res.status(502).json({ message: "Unable to reach NewsAPI right now" });
  }
}

app.get("/api/news", handleCybersecurityNews);
app.get("/api/news/cybersecurity", handleCybersecurityNews);

app.get("/api/leaderboard", async (req, res) => {
  const users = await readUsers();
  const leaderboard = users
    .map((user) => sanitizeUser(user))
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.username.localeCompare(b.username);
    })
    .slice(0, 10)
    .map((user, index) => ({
      rank: index + 1,
      username: user.username,
      score: user.score,
      level: user.level,
      badges: Array.isArray(user.badges) ? user.badges.length : 0
    }));

  return res.json({ leaderboard });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`PhishLab backend running on http://localhost:${PORT}`);
});
