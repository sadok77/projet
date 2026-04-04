const crypto = require("crypto");
const jwt = require("jsonwebtoken");

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${derivedKey}`;
}

function verifyPassword(password, storedHash) {
  const [salt, expectedKey] = storedHash.split(":");
  if (!salt || !expectedKey) {
    return false;
  }

  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  const expectedBuffer = Buffer.from(expectedKey, "hex");
  const derivedBuffer = Buffer.from(derivedKey, "hex");

  if (expectedBuffer.length !== derivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, derivedBuffer);
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username
    },
    process.env.JWT_SECRET || "dev-secret-change-me",
    { expiresIn: "7d" }
  );
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ message: "Missing bearer token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret-change-me");
    req.auth = payload;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  signToken,
  authenticateToken
};
