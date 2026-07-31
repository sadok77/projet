# PhishLab

PhishLab is a web application for phishing awareness and safe training. It combines a polished frontend with a Node.js backend to help users recognize phishing attempts, practice decision-making, and track progress over time.

## Features

- Interactive phishing awareness dashboard
- Safe inbox-style simulations
- Fake login credential theft demo
- Quiz and badge tracking system
- Cybersecurity news feed
- JWT-based authentication
- JSON file storage for demo user data

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Authentication: JSON Web Tokens
- Storage: Local JSON file
- External data: NewsAPI

## Project Structure

```text
project-root/
  index.html
  script.js
  styles.css
  backend/
    server.js
    src/
      auth.js
      storage.js
    data/
      users.json
```

## Getting Started

### 1. Install backend dependencies

```powershell
cd backend
npm install
```

### 2. Configure environment variables

The backend works with these optional variables:

- `PORT` - server port, default: `3000`
- `CLIENT_ORIGIN` - allowed frontend origin for CORS
- `JWT_SECRET` - secret used to sign authentication tokens
- `NEWS_API_KEY` - API key used for the cybersecurity news feed

### 3. Start the backend

```powershell
cd backend
npm start
```

The API will run on:

```text
http://localhost:3000
```

### 4. Open the frontend

Open `index.html` directly in your browser, or serve the project root with any static server.

## API Endpoints

- `GET /api/health` - health check
- `POST /api/auth/register` - create a demo account
- `POST /api/auth/login` - sign in and receive a JWT
- `GET /api/user/me` - get the current authenticated user
- `GET /api/user/score` - get saved progress
- `POST /api/user/score` - save score, level, and badges
- `GET /api/news` - fetch cybersecurity news
- `GET /api/leaderboard` - view top users by score

## Notes

- This project is designed for awareness and training.
- User data is stored locally in `backend/data/users.json` for demo purposes.
- The news feed depends on a valid NewsAPI key.
- The project is intentionally safe and does not deploy malware or real phishing content.
