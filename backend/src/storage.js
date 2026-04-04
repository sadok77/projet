const fs = require("fs/promises");
const path = require("path");

const dataFile = path.join(__dirname, "..", "data", "users.json");

async function ensureDataFile() {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify({ users: [] }, null, 2));
  }
}

async function readUsers() {
  await ensureDataFile();
  const raw = await fs.readFile(dataFile, "utf8");
  const parsed = JSON.parse(raw || '{"users":[]}');
  return Array.isArray(parsed.users) ? parsed.users : [];
}

async function writeUsers(users) {
  await ensureDataFile();
  await fs.writeFile(dataFile, JSON.stringify({ users }, null, 2));
}

module.exports = {
  readUsers,
  writeUsers
};
