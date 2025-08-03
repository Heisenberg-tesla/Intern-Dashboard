import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { API_URL, fetchInternData } from '../services/api';

// Helper function to format currency with Indian Rupee symbol
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Leaderboard = () => {
  const [sortedData, setSortedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Get all intern data using the leaderboard endpoint
        const response = await fetch(`${API_URL}/api/intern/leaderboard`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const leaderboardData = await response.json();

        if (!Array.isArray(leaderboardData)) {
          throw new Error('Invalid data format received from server');
        }

        // The API already sorts the data, but we'll sort again to be safe
        const sorted = [...leaderboardData].sort((a, b) => b.donationsRaised - a.donationsRaised);
        setSortedData(sorted);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch leaderboard data');
        console.error('Leaderboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);



  const getRankBadge = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `#${rank + 1}`;
  };

  const getRankColor = (rank) => {
    if (rank === 0) return 'from-yellow-400 to-yellow-500';
    if (rank === 1) return 'from-gray-300 to-gray-400';
    if (rank === 2) return 'from-yellow-600 to-yellow-700';
    return 'from-indigo-100 to-indigo-200';
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return 'from-green-400 to-emerald-600';
    if (progress >= 75) return 'from-blue-400 to-indigo-600';
    if (progress >= 50) return 'from-indigo-400 to-purple-600';
    if (progress >= 25) return 'from-purple-400 to-pink-600';
    return 'from-pink-400 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-xl">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
              <p className="mt-1 text-sm text-indigo-100">Top performers in the donation drive</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/dashboard')}
              className="bg-white text-indigo-700 px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-all duration-200 flex items-center justify-center space-x-2"
              title="Back to Dashboard"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </motion.button>
          </div>
        </div>
      </header>

      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
              </div>
              <p className="text-gray-600 text-lg font-medium">Loading leaderboard...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                  <div className="mt-3">
                    <button
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rank
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Donations Raised
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedData.map((intern, index) => {
                      const progress = Math.min(Math.round((intern.donationsRaised / 1000) * 100), 100);
                      return (
                        <motion.tr 
                          key={intern.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.03 }}
                          className="hover:bg-gray-50 transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center justify-center h-8 w-8 rounded-full text-sm font-semibold ${index < 3 ? 'text-white' : 'text-indigo-700'}`}>
                              {getRankBadge(index)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="relative">
                                <img 
                                  className="h-10 w-10 rounded-full border-2 border-white shadow-sm" 
                                  src={intern.avatar} 
                                  alt={intern.name} 
                                />
                                <div className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${index < 3 ? 'bg-yellow-500' : 'bg-indigo-500'}`}>
                                  {getRankBadge(index)}
                                </div>
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-semibold text-gray-900">{intern.name}</div>
                                <div className="text-xs text-gray-500">{intern.email}</div>
                                <div className="mt-1 text-xs text-indigo-600 font-medium">
                                  Referral: {intern.referralCode}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-base font-bold text-gray-900">{formatCurrency(intern.donationsRaised)}</div>
                            <div className="text-xs text-gray-500">
                              {intern.lastDonation ? `Last: ${formatCurrency(intern.lastDonation)}` : 'No donations yet'}
                            </div>
                            <div className="mt-1 text-xs text-gray-400">
                              Goal: {formatCurrency(intern.donationGoal)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="w-full mr-2">
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="font-medium">Goal Progress</span>
                                  <span className="font-semibold text-indigo-600">
                                    {intern.progress}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                  <motion.div 
                                    className={`h-2 rounded-full transition-all duration-500 ease-out ${getProgressColor(intern.progress)}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${intern.progress}%` }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                  ></motion.div>
                                </div>
                                <div className="mt-1 text-right text-xs text-gray-500">
                                  {formatCurrency(intern.donationsRaised)} / {formatCurrency(intern.donationGoal)}
                                </div>
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {sortedData.length > 0 && (
                <div className="bg-gray-50 px-6 py-3 flex flex-col md:flex-row items-center justify-between border-t border-gray-200 space-y-2 md:space-y-0">
                  <p className="text-xs text-gray-500">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedData.length}</span> of{' '}
                    <span className="font-medium">{sortedData.length}</span> fundraisers
                  </p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Sort by:</span>
                    <select 
                      className="text-xs border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      onChange={(e) => {
                        const sorted = [...sortedData];
                        if (e.target.value === 'name') {
                          sorted.sort((a, b) => a.name.localeCompare(b.name));
                        } else if (e.target.value === 'progress') {
                          sorted.sort((a, b) => (b.donationsRaised / b.donationGoal) - (a.donationsRaised / a.donationGoal));
                        } else {
                          sorted.sort((a, b) => b.donationsRaised - a.donationsRaised);
                        }
                        setSortedData(sorted);
                      }}
                    >
                      <option value="donations">Donations (High to Low)</option>
                      <option value="progress">Progress %</option>
                      <option value="name">Name (A-Z)</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
