import React from 'react';
import './App.css';
import axios from 'axios';

const __DEV__ = document.domain === 'localhost'

function loadRazorpay(){
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      }
      script.onerror = () => {
        resolve(false);
      }

      document.body.appendChild(script);
    })
  }

function App() {
  async function payRazorpay(){
    const res = await loadRazorpay();
    if(!res){
      alert("failed to load");
      return    
    }   

    const data = await fetch('http://localhost:8000/razorpay', {method: 'POST'}).then((t) => t.json())

    const options = {
      key: __DEV__ ? "rzp_test_Lzs5ccDPvViPtN" : "LIVE_API", 
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      name: "HiYatri",
      description: "MEET AND GREET",
      image: "https://previews.123rf.com/images/engabito/engabito1906/engabito190600272/125208344-train-railway-logo-isolated-on-white-background-vector-illustration.jpg",
      "handler": function (response){
        const rzpData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        }
        axios.post('http://localhost:8000/verification', rzpData);
      },
    };

    const paymentSlip = new window.Razorpay(options);
    paymentSlip.open();

    paymentSlip.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata);
    });  
  }

  return (
    <div className="App">
      <header className="App-header">
        <a className="App-link" onClick = {payRazorpay} target="_blank" rel="noopener noreferrer" >
          CHECKOUT | Pay with razorpay
        </a>
      </header>
    </div>
  );
}

export default App;
