import axios from 'axios';

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
