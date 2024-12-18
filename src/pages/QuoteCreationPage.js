import React, { useState, useEffect } from 'react';
import { uploadImage } from '../api/upload';
import { createQuote } from '../api/quotes';
import { useNavigate } from 'react-router-dom';

const QuoteCreationPage = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    if (!token) {
      alert('Session expired. Please log in again.');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if both text and file are provided
      if (!file || !text) {
        alert('Both text and image are required.');
        return;
      }

      // Debugging: Log the token to make sure it's retrieved correctly from localStorage
      console.log('Token:', token);

      // Call the uploadImage API and get the media URL
      const mediaUrl = await uploadImage(file);
      console.log('Media URL:', mediaUrl); // Log the media URL for debugging

      // Now create the quote with the token, text, and media URL
      await createQuote(token, text, mediaUrl);
      alert('Quote created successfully!');
      navigate('/quotes');
    } catch (err) {
      console.error('Error:', err.response); // Log the entire error response for debugging

      // Handle specific authentication failure (401)
      if (err.response?.status === 401) {
        alert('Authentication failed. Please log in again.');
        localStorage.removeItem('token'); // Remove invalid token
        navigate('/login');
      } else {
        // General error handling
        const errorMessage = err.response?.data?.message || err.message || 'Unknown error occurred';
        alert(`Failed to create quote. Error: ${errorMessage}`);
      }
    }
  };

  return (
    <div>
      <h1>Create Quote</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your quote"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuoteCreationPage;
