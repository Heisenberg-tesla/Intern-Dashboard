import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchInternData } from '../services/api';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userIdNum = userId.trim();
    const userName = name.trim();
    
    if (!userIdNum) {
      setError('Please enter a user ID');
      return;
    }
    
    if (!userName) {
      setError('Please enter your name');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Try to fetch user data with the provided ID
      const userData = await fetchInternData(userIdNum);
      if (userData && userData.id) {
        // Store user ID and name in localStorage for dashboard access
        localStorage.setItem('currentUserId', userIdNum);
        localStorage.setItem('currentUserName', userName);
        navigate('/dashboard');
      } else {
        setError('User not found. Please try a different ID');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('User not found. Please try a different ID.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
              className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg"
            >
              <svg className="h-10 w-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            >
              Welcome Back
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-2 text-sm text-gray-500"
            >
              Sign in to access your dashboard
            </motion.p>
          </div>
          <motion.form 
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-5"
          >
            <div className="space-y-5">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-1"
              >
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-1"
              >
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                  User ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="userId"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 bg-white/50 border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your user ID"
                    disabled={isLoading}
                    autoComplete="off"
                  />
                </div>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-1 text-sm text-red-500 flex items-start"
                  >
                    <svg className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 }}
                className="pt-2"
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <span className="flex items-center">
                      <span>Sign In</span>
                      <svg className="ml-2 -mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.form>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-2"
          >
            <Link 
              to="/forgot-id" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 inline-flex items-center transition-colors duration-200 group"
            >
              <span>Forgot your ID?</span>
              <svg className="ml-1 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
