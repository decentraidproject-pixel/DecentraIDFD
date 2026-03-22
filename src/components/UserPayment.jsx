import React from "react";
import '../Header.css'


const PaymentStart = () => {
  const handleClick = () => {
    
    window.open(
      "https://buy.stripe.com/test_6oU9AL51f4vh7WC7jG83C00",
      "_parent"
    );
  };

  return (
    <div className="payment-container">
      <button className="payment-btn" onClick={handleClick}>
        Payment Now to Get Started
      </button>
    </div>
  );
};

export default PaymentStart;
