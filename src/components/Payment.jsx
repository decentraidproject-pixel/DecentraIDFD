import React from "react";
import '../Header.css'


const PaymentStart = () => {
  const handleClick = () => {
    
    window.open(
      "https://buy.stripe.com/test_3cI7sDalzf9Vfp49rO83C01",
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
