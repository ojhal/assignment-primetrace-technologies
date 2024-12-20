import axios from 'axios';
// ../api/quotes.js
export const fetchQuotes = async (token, limit = 20, offset = 0) => {
  const response = await fetch(`/api/quotes?limit=${limit}&offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }
  return await response.json();
};

export const createQuote = async (token, text, mediaUrl) => {
  try {
    const response = await axios.post(
      '/api/quotes', 
      { text, mediaUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      }
    );
    return response.data; // Return the response data if the request is successful
  } catch (err) {
    // Handle errors that might occur
    if (err.response?.status === 401) {
      // If the authentication fails, throw a specific error
      throw new Error('Authentication failed. Please log in again.');
    }
    throw err; // Rethrow any other error
  }
};
