# PhishLab

Static educational website that teaches users how phishing works using examples, safe simulations, and a quiz.

## Run

Open `index.html` directly in a browser.

## Backend

A Node.js Express backend is available in `backend/` with:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/me`
- `GET /api/user/score`
- `POST /api/user/score`

Storage uses `backend/data/users.json`.

### Start backend

1. `cd backend`
2. `npm install`
3. `npm start`
