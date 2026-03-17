import React, { useState } from "react";
import emailjs from "@emailjs/browser";

import { useNavigate } from "react-router-dom";
import '../Header.css'


const EmailOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showVerify, setShowVerify] = useState(false);
  const nav=useNavigate();

  const sendOtp = () => {
    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Enter a valid email address");
      return;
    }

    const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
    sessionStorage.setItem("otp", otpCode);

    emailjs
      .send(
        "service_swrgtrn",        
        "template_wprx1bl",        
        {
          email: email,            
          passcode: otpCode         
        },
        "l80s5XCJKVIlW38DM"          
      )
      .then(() => {
        alert("OTP sent to " + email);
        setShowVerify(true);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send OTP");
      });
  };

  const verifyOtp = () => {
    const storedOtp = sessionStorage.getItem("otp");

    if (otp === storedOtp) {
      alert("Email verified successfully!");
      localStorage.setItem("userEmail", email);
      nav('/UserPayment');
      
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <section>
      <div className="container">
        <h1>Email OTP</h1>

        
        <div className="email">
          <input
            type="email"
            placeholder="Enter Official Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

    
        {showVerify && (
          <div className="email verify">
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOtp}>Verify</button>
          </div>
        )}

        
        <button className="btn-send-otp" onClick={sendOtp}>
          Send OTP
        </button>
      </div>
    </section>
  );
};

export default EmailOtp;
