import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";

export default function DownloadTicket() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/tickets/${ticketId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load ticket");
        return res.json();
      })
      .then((data) => setTicket(data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load ticket.");
      });
  }, [ticketId]);

  const handleDownload = () => {
    if (!ticket) return;
    const doc = new jsPDF();
    doc.text("🎟️ Digital Ticket", 20, 20);
    doc.text(`Name: ${ticket.name}`, 20, 40);
    doc.text(`Age: ${ticket.age}`, 20, 50);
    doc.text(`Location: ${ticket.location}`, 20, 60);
    doc.text(`Seat: ${ticket.seat}`, 20, 70);
    doc.text(`Date: ${ticket.date}`, 20, 80);
    doc.text(`Time: ${ticket.time}`, 20, 90);
    doc.text(`Status: ${ticket.paymentStatus}`, 20, 100);
    doc.save(`Ticket-${ticket._id}.pdf`);
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!ticket) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Ticket</h2>
      <pre
        style={{
          background: "#eee",
          padding: "10px",
          borderRadius: "5px",
          maxWidth: "400px",
          marginBottom: "20px",
        }}
      >
        {JSON.stringify(ticket, null, 2)}
      </pre>
      <button onClick={handleDownload}>Download PDF</button>
    </div>
  );
}
