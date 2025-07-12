import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const EmailVerificationSuccess: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const token = params.get("token");

  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    if (email && token) {
      fetch("https://p5l04sirq7.execute-api.ap-south-1.amazonaws.com/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, token })
      })
        .then(res => res.json())
        .then(data => {
          setStatus(data.message || "Email verified successfully");
        })
        .catch(() => {
          setStatus("Verification failed. Please try again.");
        });
    } else {
      setStatus("Missing email or token in the link.");
    }
  }, [email, token]);

  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center border-t-8 border-orange-500">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">Email Verification</h1>
        <p className="text-gray-700 mb-6">{status}</p>
        <a
          href="https://dronesimulator.in/auth"
          className="inline-block bg-orange-500 text-white px-6 py-2 rounded-full text-lg hover:bg-orange-600 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
