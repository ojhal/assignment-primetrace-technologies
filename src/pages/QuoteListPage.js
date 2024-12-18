import React, { useState, useEffect } from 'react';
import { fetchQuotes } from '../api/quotes';
import { useNavigate } from 'react-router-dom';

const QuoteListPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuotes = async () => {
      const data = await fetchQuotes(token, 20, offset);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setQuotes((prev) => [...prev, ...data]);
      }
    };
    loadQuotes();
  }, [offset, token]);

  return (
    <div>
      <h1>Quotes</h1>
      <div>
        {quotes.map((quote) => (
          <div key={quote.id} style={{ marginBottom: '20px' }}>
            <div
              style={{
                position: 'relative',
                backgroundImage: `url(${quote.mediaUrl})`,
                backgroundSize: 'cover',
                height: '200px',
                color: 'white',
              }}
            >
              <p style={{ position: 'absolute', bottom: '10px', left: '10px' }}>{quote.text}</p>
            </div>
            <p>By: {quote.username}</p>
            <p>At: {new Date(quote.created_at).toLocaleString()}</p>
          </div>
        ))}
        {hasMore && <button onClick={() => setOffset((prev) => prev + 20)}>Load More</button>}
      </div>
      <button
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        onClick={() => navigate('/create-quote')}
      >
        +
      </button>
    </div>
  );
};

export default QuoteListPage;
