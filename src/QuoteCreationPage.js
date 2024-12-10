import React, { useState } from "react";
import axios from "axios";

function QuoteCreationPage() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "https://crafto.app/crafto/v1.0/media/assignment/upload",
        formData
      );
      setMediaUrl(response.data.mediaUrl);
    } catch (error) {
      alert("Image upload failed.");
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://assignment.stage.crafto.app/postQuote",
        { text, mediaUrl },
        { headers: { Authorization: token } }
      );
      alert("Quote created successfully!");
    } catch (error) {
      alert("Failed to create quote.");
    }
  };

  return (
    <div>
      <h2>Create a Quote</h2>
      <input
        type="text"
        placeholder="Quote text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleImageUpload}>Upload Image</button>
      {mediaUrl && <p>Image uploaded! Media URL: {mediaUrl}</p>}
      <button onClick={handleSubmit}>Submit Quote</button>
    </div>
  );
}

export default QuoteCreationPage;
