import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//in typescript by adding ! exclamation we make sure that the value is never null
const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
