import './assets/css/App.css';
import clickSound from './assets/sounds/click.mp3';
import { React, useState, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
function Context() {
  const [preloader, setPreloader] = useState('block');
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
  }
  const audioRef = useRef(null);
  function playClickSound() {
    audioRef.current.play();
  }
  setTimeout(() => {
    setPreloader('none');
  }, 1000);

  return (
    <>
      <audio ref={audioRef} src={clickSound} preload="auto" />
      <div className="main">
        <div className="preloader" style={{ display: preloader }}></div>
        <div className="context-container">
          <Link to="/" className='back'>Back</Link>
          <div className="item">
            <p>Context</p>
          </div>
          <div className="item">
            <p>Mini Context</p>
            <p>₹10</p>
            <p>₹15</p>
            <button onClick={() => { playClickSound(); }}><Link to="/game/10">Join</Link></button>
          </div>
          <div className="item">
            <p>Mini Context</p>
            <p>₹50</p>
            <p>₹75</p>
            <button onClick={() => { playClickSound(); }}><Link to="/game/50">Join</Link></button>
          </div>
          <div className="item">
            <p>Medium Context</p>
            <p>₹100</p>
            <p>₹150</p>
            <button onClick={() => { playClickSound(); }}><Link to="/game/100">Join</Link></button>
          </div>
          <div className="item">
            <p>Medium Context</p>
            <p>₹200</p>
            <p>₹300</p>
            <button onClick={() => { playClickSound(); }}><Link to="/game/200">Join</Link></button>
          </div>
          <div className="item">
            <p>Large Context</p>
            <p>₹500</p>
            <p>₹750</p>
            <button onClick={() => { playClickSound(); }}><Link to="/game/500">Join</Link></button>
          </div>
          <div className="item">
            <p>Large Context</p>
            <p>₹1000</p>
            <p>₹1500</p>
            <button onClick={() => { playClickSound(); }}><Link to="/game/1000">Join</Link></button>
          </div>
          <div className="item">
            <p>Extra Large Context</p>
            <p>₹2000</p>
            <p>₹3000</p>
            <button onClick={() => { playClickSound(); }}><Link to="/game/2000">Join</Link></button>
          </div>
          <div className="item">
            <p>Extra Large Context</p>
            <p>₹5000</p>
            <p>₹7500</p>
            <button onClick={() => { playClickSound(); }}><Link to="/game/5000">Join</Link></button>
          </div>
          <div className="footer">
            Designed & Developed By Mother solution
          </div>
        </div>
      </div>
    </>
  );
}

export default Context;
