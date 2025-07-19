import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TicketGenerator from "./pages/TicketGenerator";
import PaymentPage from "./pages/PaymentPage";
import DownloadTicket from "./pages/DownloadTicket";
import TicketingSystem from "./pages/TicketingSystem"; // ✅ must be imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/tickets" element={<TicketingSystem />} />
        <Route path="/ticket" element={<TicketGenerator />} />
        <Route path="/payment/:ticketId" element={<PaymentPage />} />
        <Route path="/download-ticket/:ticketId" element={<DownloadTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
