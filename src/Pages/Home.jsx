import React, { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !topic) {
      alert("Please fill in both name and topic");
      return;
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Start Interview</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Your Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            placeholder="Enter your name"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Interview Topic</span>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-200"
            placeholder="e.g., JavaScript, AI, Data Science"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Start Interview
        </button>
      </form>
    </div>
  );
};

export default Home;
