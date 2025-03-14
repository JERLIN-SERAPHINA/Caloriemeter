import React, { useState } from "react";
import axios from "axios";

function EmailSender() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Simple email validation function
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const sendEmail = async () => {
    if (!isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3001/send-email", { email });
      setMessage(response.data.message || "Diet plan sent successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to send email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Get Your Personalized Diet Plan</h2>
        <p style={styles.description}>
          Enter your email below to receive a tailored diet plan from <strong>VitaGuide</strong>.
        </p>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button
          onClick={sendEmail}
          style={{ 
            ...styles.button, 
            backgroundColor: loading ? "#6c757d" : "#28a745",
            cursor: loading ? "not-allowed" : "pointer"
          }}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Diet Plan"}
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

// Inline styles for simplicity
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
    padding: "20px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  },
  title: {
    marginBottom: "15px",
    color: "#333333",
    fontSize: "24px",
    fontWeight: "600",
  },
  description: {
    marginBottom: "25px",
    color: "#555555",
    fontSize: "16px",
    lineHeight: "1.5",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    marginBottom: "20px",
    border: "1px solid #ced4da",
    borderRadius: "5px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s",
  },
  button: {
    width: "100%",
    padding: "12px 20px",
    backgroundColor: "#28a745",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "500",
    transition: "background-color 0.3s",
  },
  message: {
    marginTop: "20px",
    color: "#17a2b8",
    fontSize: "16px",
  },
};

export default EmailSender;
