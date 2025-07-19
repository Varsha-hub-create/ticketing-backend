import { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import "../App.css";

export default function TicketingSystem() {
  const [tickets, setTickets] = useState([]);
  const [passengerName, setPassengerName] = useState("");
  const [age, setAge] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");

  // ✅ Fetch tickets
  useEffect(() => {
    fetch("http://localhost:5001/tickets")
      .then((res) => res.json())
      .then((data) => setTickets(data))
      .catch((err) => console.error("Error fetching tickets:", err));
  }, []);

  // ✅ Add new ticket
  const addTicket = async () => {
    const newTicket = {
      name: passengerName,
      age,
      seat: seatNumber,
      location,
      date,
      time,
      paymentStatus,
    };

    try {
      const response = await fetch("http://localhost:5001/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTicket),
      });

      const data = await response.json();

      if (response.ok) {
        setTickets([...tickets, data]);
      } else {
        console.error("Failed to create ticket", data);
      }
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  // ✅ Remove ticket
  const removeTicket = async (id) => {
    try {
      await fetch(`http://localhost:5001/tickets/${id}`, {
        method: "DELETE",
      });
      setTickets(tickets.filter((ticket) => ticket._id !== id));
    } catch (err) {
      console.error("Error deleting ticket:", err);
    }
  };

  return (
    <div className="container">
      <h1>🎟️ Digital Ticketing System</h1>
      <Input
        type="text"
        placeholder="Passenger Name"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Seat Number"
        value={seatNumber}
        onChange={(e) => setSeatNumber(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
      <select
        value={paymentStatus}
        onChange={(e) => setPaymentStatus(e.target.value)}
      >
        <option value="Unpaid">Unpaid</option>
        <option value="Paid">Paid</option>
      </select>
      <Button onClick={addTicket}>Create Ticket</Button>

      {tickets.map((ticket) => (
        <div key={ticket._id} className="ticket">
          <p>
            <strong>{ticket.name}</strong> | Age: {ticket.age} | Seat: {ticket.seat} |{" "}
            {ticket.location}
          </p>
          <p>
            📅 {ticket.date} | ⏰ {ticket.time} | 💳 Payment: {ticket.paymentStatus}
          </p>
          <Button onClick={() => removeTicket(ticket._id)}>Delete</Button>
        </div>
      ))}
    </div>
  );
}
