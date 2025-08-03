import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-indigo-600">Intern Dashboard</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
