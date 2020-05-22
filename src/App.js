import React, { useState, useEffect } from 'react';
import { fromJS } from 'immutable';
import Quiz from '@portto/quiz';
import logo from './logo.svg';
import './App.css';

function App() {
  const [address, setAddress] = useState(null)
  const [isQuizActive, setQuizActive] = useState(false)

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

  const startQuiz = () => setQuizActive(true)
  const stopQuiz = () => setQuizActive(false)

  const completeQuiz = () => {
    setQuizActive(false);
    sendReward();
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
        {address && <button
          className="App-link"
          onClick={startQuiz}
        >
          Complete Quiz and Get Reward
        </button>}

        <div className="App-quiz">
          <Quiz
            isActive={isQuizActive}
            questions={fromJS([
              {
                fields: {
                  question: 'Which stable coin has the largest market share?',
                  correctAnswer: 'USDT',
                  otherAnswers: [
                    'DAI',
                    'USDC',
                    'TUSD'
                  ]
                }
              },
              {
                fields: {
                  question: 'Who made Blocto?',
                  correctAnswer: 'portto',
                  otherAnswers: [
                    'ConsenSys',
                    'Binance',
                    'Coinbase'
                  ]
                }
              }
            ])}
            onClose={stopQuiz}
            onSuccess={completeQuiz}
            messages={{
              confirmQuitQuiz: 'Are you sure you want to quit?',
              claimReward: 'Claim Reward',
              congrats: 'Congratulations',
              congratsDescription: 'This puny quiz is no match for you.<br />Claim your rewards now.',
              submit: 'Submit',
            }}
          />
        </div>
      </header>
    </div>
  );
}

export default App;
