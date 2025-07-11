import React from "react";

const EmailVerificationSuccess: React.FC = () => {
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center border-t-8 border-orange-500">
        <h1 className="text-3xl font-bold text-orange-600 mb-4">
          Email Verified!
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you for verifying your email. You can now log in and start using DroneSimulator.
        </p>
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
