import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInternData } from '../services/api';
import { motion } from 'framer-motion';

// Helper function to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

const Dashboard = () => {
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the logged-in user ID from localStorage
        const userId = localStorage.getItem('currentUserId');
        
        if (!userId) {
          // If no user ID is found, redirect to login
          navigate('/');
          return;
        }
        
        const data = await fetchInternData(userId);
        if (data && data.id) {
          setInternData(data);
          setError(null);
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('User not found. Please log in with a valid user ID.');
        // Clear invalid user data and redirect to login
        localStorage.removeItem('currentUserId');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    // Clear the stored user ID and redirect to login
    localStorage.removeItem('currentUserId');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-2">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const userName = localStorage.getItem('currentUserName') || 'User';
  
  // Calculate progress percentage and other derived values
  const progress = internData ? Math.min(Math.round(((internData?.donationsRaised || 0) / (internData?.donationGoal || 1)) * 100), 100) : 0;
  const daysLeft = internData?.daysLeft || 30; // Default 30 days left
  const nextMilestone = internData?.nextMilestone || (internData?.donationGoal || 0);
  const unlockedRewards = internData?.rewards?.filter(r => r.unlocked) || [];
  const lockedRewards = internData?.rewards?.filter(r => !r.unlocked) || [];
  
  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/70 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-md">
                <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {internData?.role || 'Intern'} Dashboard
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm text-gray-500">
                  <span>Welcome back, <span className="font-medium text-gray-700">{userName}</span>! 👋</span>
                  {internData?.joinDate && (
                    <span className="hidden sm:inline-block">•</span>
                  )}
                  {internData?.joinDate && (
                    <span>Joined {formatDate(internData.joinDate)}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/leaderboard')}
                className="group relative flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 group-hover:bg-white/5 transition-colors duration-200"></span>
                <svg className="h-5 w-5 mr-2 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="relative">Leaderboard</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="group relative flex items-center px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/10 group-hover:bg-white/5 transition-colors duration-200"></span>
                <svg className="h-5 w-5 mr-2 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="relative">Logout</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* Total Donations Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Donations</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {internData ? formatCurrency(internData.donationsRaised) : '₹0'}
                    </p>
                    {internData?.lastDonation && (
                      <p className="text-xs text-gray-500 mt-1">
                        Last donation: {formatCurrency(internData.lastDonation.amount)} on {formatDate(internData.lastDonation.date)}
                      </p>
                    )}
                  </div>
                  <div className="p-3 rounded-lg bg-indigo-50 text-indigo-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="flex-grow">Daily Average</span>
                    <span className="font-medium text-gray-900">
                      {internData?.dailyAverage ? formatCurrency(internData.dailyAverage) : '₹0'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Donation Goal Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Donation Goal</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {internData ? formatCurrency(internData.donationGoal) : '₹0'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {internData?.donationsRaised >= internData?.donationGoal 
                        ? '🎉 Goal achieved! ' 
                        : `${formatCurrency((internData?.donationGoal || 0) - (internData?.donationsRaised || 0))} to go`}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 text-green-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="flex-grow">Next Milestone</span>
                    <span className="font-medium text-gray-900">
                      {internData?.nextMilestone ? formatCurrency(internData.nextMilestone) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Fundraising Progress Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fundraising Progress</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{progress}%</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {internData?.donationsRaised} of {internData?.donationGoal} raised
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full ${progress >= 100 ? 'bg-gradient-to-r from-green-400 to-emerald-600' : 'bg-gradient-to-r from-blue-500 to-indigo-600'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs font-medium text-gray-500">0%</span>
                    <div className="flex items-center">
                      <span className="text-xs font-medium text-gray-500 mr-1">{daysLeft} days left</span>
                      <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-gray-500">100%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Profile Section */}
          <section className="bg-white border-t border-gray-200 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Fundraising Profile</h2>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <div className="flex items-center">
                    <img 
                      className="h-16 w-16 rounded-full border-4 border-white shadow-md" 
                      src={internData?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(userName) + '&background=6366f1&color=fff'} 
                      alt={userName} 
                    />
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{userName}</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Joined on {new Date(internData?.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div className="text-sm font-medium text-gray-500">Your Referral Code</div>
                      <div className="mt-1 text-xl font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg">
                        {internData?.referralCode || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Bio Section */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">About You</h4>
                      <p className="text-gray-600">
                        {internData?.bio || 'No bio provided.'}
                      </p>
                    </div>
                    
                    {/* Progress Towards Next Milestone */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Next Milestone</h4>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Raise {formatCurrency(nextMilestone - (internData?.donationsRaised || 0))} more</span>
                          <span>{daysLeft} days left</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-gradient-to-r from-indigo-500 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((internData?.donationsRaised || 0) / nextMilestone * 100, 100)}%` }}
                          ></div>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Reach {formatCurrency(nextMilestone)} to unlock special rewards!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Rewards Section */}
                <div className="mt-8">
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Your Rewards</h4>
                  
                  {unlockedRewards.length > 0 && (
                    <div className="mb-6">
                      <h5 className="text-sm font-medium text-gray-500 mb-3">Unlocked Rewards</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {unlockedRewards.map((reward) => (
                          <div key={reward.id} className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start">
                            <span className="text-2xl mr-3">{reward.icon}</span>
                            <div>
                              <h6 className="font-medium text-green-800">{reward.name}</h6>
                              <p className="text-sm text-green-600">{reward.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {lockedRewards.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-gray-500 mb-3">Available Rewards</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {lockedRewards.map((reward) => (
                          <div key={reward.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start opacity-60">
                            <span className="text-2xl mr-3 text-gray-400">{reward.icon}</span>
                            <div>
                              <h6 className="font-medium text-gray-500">{reward.name}</h6>
                              <p className="text-sm text-gray-400">{reward.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Social Links */}
                {internData?.socialMedia && (
                  <div className="mt-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Connect With Me</h4>
                    <div className="flex space-x-4">
                      {internData.socialMedia.linkedin && (
                        <a 
                          href={`https://${internData.socialMedia.linkedin}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {internData.socialMedia.twitter && (
                        <a 
                          href={`https://${internData.socialMedia.twitter}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          <span className="sr-only">Twitter</span>
                          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.96 4.96 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                          </svg>
                        </a>
                      )}
                      {internData.socialMedia.instagram && (
                        <a 
                          href={`https://${internData.socialMedia.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-purple-500 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.071 1.645.07 4.849-.001 3.205-.013 3.584-.07 4.851C20.308 22.79 19.366 24 16.097 24 12.828 24 11.837 22.789 11.837 20c0-3.204.012-3.584.07-4.851.149-3.252 1.691-4.771 4.92-4.919.5-.012 1.022-.014 1.53-.015 1.61-.005 2.741.57 2.741 2.453 0 1.312-.554 2.063-1.885 2.382-.577.101-1.157.162-1.74.162-1.518 0-2.271-.864-2.433-2.381-.057-.576-.057-1.14-.001-1.708.012-.237.043-.47.08-.696-.093-.313-.47-.53-1.003-.53h-1.658c-.534 0-.91.217-1.003.53-.037.226-.068.46-.08.696-.012.537-.012 1.133-.001 1.71.162.518.915 1.518 2.433 2.381.282.001.663.061 1.74.162 1.331.319 1.885.67 1.885 2.382 0 1.883-.57 2.453-2.741 2.453-1.021 0-1.53-.015-1.74-.015-.508-.001-1.03-.058-1.53-.07-3.251-.149-4.77-1.691-4.919-4.919-.058-1.266-.071-1.646-.07-4.849.001-3.204.013-3.583.07-4.85.148-3.252 1.69-4.771 4.919-4.919 1.266-.057 1.646-.07 4.849-.07z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
