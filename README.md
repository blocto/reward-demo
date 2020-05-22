# Blocto Reward Demo
This project demonstrates how to use [Blocto Reward API](https://github.com/portto/Blocto-Integration/blob/master/RewardSystem.md) in your web app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup

Follow these steps to run this demo:

### 1. Get API Token

Contact [info@portto.io](mailto:hlee@portto.io) to setup developer account and get API token for this project.<br />
Once you have the token, put it in `server/constants.js`.

### 2. Install Dependencies

`yarn`

Installs all dependency modules.

### 3. Start Demo Web App

`yarn start`

Runs the app in the development mode.<br />
This script starts up API server at [http://localhost:3001](http://localhost:3001) and web server at [http://localhost:3000](http://localhost:3000)

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## How It Works

This demo project consists of two parts: **client side interface** and **server side API**.

Client side interface gets users' Blocto wallet address and passes this address to server side when user clicks **Get Reward**.<br />

Then server side sends request to Blocto service:
Endpoint:
  - Staging: `https://api-staging.blocto.app/reward/send`
  - Production: `https://api.blocto.app/reward/send`

Headers:
```
'Authorization': API_TOKEN,
'Content-Type': 'application/json'
```

Body:
```javascript
{
  blockchain: "ethereum",
  wallet_address: USER_WALLET_ADDRESS,
  point: BLOCTO_POINT_AMOUNT
}
```

We recommend using a backend service to send requests to Blocto service, so you will not leak your API_TOKEN.
