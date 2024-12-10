import React, { useState, useEffect } from "react";
import axios from "axios";

function QuoteListPage() {
  const [quotes, setQuotes] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://assignment.stage.crafto.app/getQuotes?limit=20&offset=${page * 20}`,
          {
            headers: { Authorization: token },
          }
        );
        if (response.data.length === 0) {
          setHasMore(false);
        } else {
          setQuotes((prev) => [...prev, ...response.data]);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuotes();
  }, [page]);

  return (
    <div>
      <h2>Quotes</h2>
      <div>
        {quotes.map((quote) => (
          <div key={quote.id}>
            <div
              style={{
                position: "relative",
                textAlign: "center",
                color: "white",
              }}
            >
              <img
                src={quote.mediaUrl}
                alt="Quote"
                style={{ width: "100%", height: "auto" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {quote.text}
              </div>
            </div>
            <p>By: {quote.username}</p>
            <p>Created At: {new Date(quote.created_at).toLocaleString()}</p>
          </div>
        ))}
        {hasMore && (
          <button onClick={() => setPage((prev) => prev + 1)}>Load More</button>
        )}
      </div>
      <button onClick={() => (window.location.href = "/create-quote")}>
        + Create Quote
      </button>
    </div>
  );
}

export default QuoteListPage;
