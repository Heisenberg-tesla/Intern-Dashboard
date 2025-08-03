# Intern Dashboard Portal

A web application for managing intern profiles, tracking donations, and handling referrals. Built with React, Express.js, and Tailwind CSS.

## Features

- Intern profile management
- Donation tracking and fundraising
- Referral system with unique codes
- Rewards and achievements
- Leaderboard system

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express.js
- Development: Nodemon, Git

## Setup Instructions

1. Install dependencies:
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

2. Set up environment:
   ```env
   PORT=5000
   NODE_ENV=development
   ```

3. Run the application:
   ```bash
   # Backend
   cd backend
   npm start

   # Frontend
   cd frontend
   npm start
   ```

The app will be available at:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## API Endpoints

- `GET /api/intern/:id` - Get intern details
- `GET /api/leaderboard` - Get leaderboard data
- `POST /api/referrals` - Create referral
- `GET /api/referrals/:internId` - Get referrals by intern

## Project Structure

```
intern-portal/
├── backend/    # Server code
│   ├── routes/
│   └── server.js
│
└── frontend/   # React app
    ├── components/
    ├── pages/
    └── App.js
```

## Deployment

### Frontend (Netlify)
1. Push to GitHub
2. Connect to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Backend (Render)
1. Push to GitHub
2. Create Web Service
3. Set build command: `npm install`
4. Set start command: `npm start`

