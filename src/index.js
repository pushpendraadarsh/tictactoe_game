import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Context from './Context';
import GamePlay from './GamePlay';
import GameBoard from './GameBoard';
import Login from './Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        {/* <AnimatePresence mode='wait'> */}
          <Routes>
            <Route path="/" exact element={<App />} />
            <Route path="/context" exact element={<Context />} />
            <Route path="/login/:id" exact element={<Login />} />
            <Route path="/game/:id" exact element={<GamePlay />} />
            <Route path="/gameground/:id" exact element={<GameBoard />} />
          </Routes>
        {/* </AnimatePresence> */}
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
