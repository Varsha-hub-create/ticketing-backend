import React from "react";
import { useParams, useNavigate } from "react-router-dom";
// import qrImage from "../assets/bg.jpg";

export default function PaymentPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const handlePayment = async () => {
    const res = await fetch(`http://localhost:5001/pay-ticket/${ticketId}`, {
      method: "POST",
    });
    if (res.ok) {
      navigate(`/download-ticket/${ticketId}`);
    }
  };

  return (
    <div>
      <h2>Scan & Pay</h2>
      {/* <img src={qrImage} alt="QR Code" width="200" /> */}
      <p>Click below if already paid</p>
      <button onClick={handlePayment}>Confirm Payment</button>
    </div>
  );
}
