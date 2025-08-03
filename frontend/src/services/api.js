// Ensure the API URL has a protocol and no trailing slash
const getApiUrl = () => {
    const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    // Remove any trailing slashes and add protocol if missing
    return baseUrl.replace(/\/+$/, '').replace(/^(?:(?!(?:http|https):\/\/))/i, 'http://');
};

export const API_URL = getApiUrl();

// Helper function to handle HTTP requests
const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok) {
        const error = new Error(data.message || 'Something went wrong');
        error.status = response.status;
        throw error;
    }
    return data;
};

export const fetchInternData = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/intern/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching intern data:', error);
        throw error;
    }
};

export const fetchLeaderboard = async () => {
    try {
        const response = await fetch(`${API_URL}/api/intern/leaderboard`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        throw error;
    }
};

export const fetchInternByReferral = async (code) => {
    try {
        const response = await fetch(`${API_URL}/api/intern/referral/${code}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching intern by referral:', error);
        throw error;
    }
};


