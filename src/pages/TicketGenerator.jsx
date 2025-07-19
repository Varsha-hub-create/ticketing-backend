import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TicketGenerator() {
  const [form, setForm] = useState({ name: "", age: "", location: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/generate-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/payment/${data._id}`);
      } else {
        setError(data.error);
      }
    } catch {
      setError("Server error");
    }
  };

  return (
    <div>
      <h2>Generate a Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="number" name="age" placeholder="Age" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} />
        <button type="submit">Generate Ticket</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
