import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [address, setAddress] = useState(null)

  useEffect(() => {
    // Check if user is using Blocto
    if (!window.ethereum || !window.bloctoProvider) {
      alert('This page only works in Blocto')

      return;
    }

    window.ethereum
      .enable()
      .then(addresses => setAddress(addresses[0]))
  }, [])

  const sendReward = () => {
    console.log('send reward');
    fetch(
      '/api/send',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address,
        })
      })
      .then(response => response.json())
      .then(json => alert(JSON.stringify(json)))
      .catch(error => alert(JSON.stringify(error)));
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Blocto address:<br />
          <span className="App-address">{address || 'none'}</span>
        </p>
        {address && <button
          className="App-link"
          onClick={sendReward}
        >
          Get Reward
        </button>}
      </header>
    </div>
  );
}

export default App;
