import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";
import QuoteListPage from "./QuoteListPage";
import QuoteCreationPage from "./QuoteCreationPage";

function App() {
  const handleLogin = (token) => {
    console.log("Logged in with token:", token);
    // You can also store the token in state or localStorage here
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/quotes" element={<QuoteListPage />} />
        <Route path="/create-quote" element={<QuoteCreationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
