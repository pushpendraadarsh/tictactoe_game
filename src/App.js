import './assets/css/App.css';
import backgroundMusic from './assets/sounds/cottagecore.mp3';
import clickSound from './assets/sounds/click.mp3';
import logo from './assets/images/logo.png';
import playicon from './assets/images/icon_x_6.png';
import { React, useContext, useState, useEffect, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
function App() {
  const [preloader, setPreloader] = useState('block');
  const audioRef = useRef(null);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
  }
  function playClickSound() {
    audioRef.current.play();
  }
  useEffect(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;

    // Play audio within a user gesture event
    document.addEventListener('click', () => {
      audio.play().catch(error => {
        console.error(error);
      });
    });

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
  setTimeout(() => {
    setPreloader('none');
  }, 1000);

  return (
    <>
      <audio ref={audioRef} src={clickSound} preload="auto" />
      <div className="main">
        <div className="preloader" style={{ display: preloader }}></div>
        <div className="game-dashboard">
          <img className='logo' src={logo} alt="Logo" />
          <div className="bet-container">
            <Link to="/context" className="item" onClick={() => { playClickSound() }} >
              <img src={playicon} alt="" />
              <p>Online Play</p>
            </Link>
            <div className="item" onClick={() => { playClickSound(); window.location.href = '/practise.html' }}>
              <img src={playicon} alt="" />
              <p>Local Play</p>
            </div>
          </div>
          <div className="footer">
            Designed & Developed By Mother solution
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
