import './assets/css/App.css';
import clickSound from './assets/sounds/click.mp3';
import LoaderImage from './assets/loader.webp';
import Versus from './assets/images/versus.png';
import { React, useState, useRef, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { io } from 'socket.io-client';
function GameBoard() {
  const [preloader, setPreloader] = useState('block');
  const [Image, setImage] = useState('');
  const [name, setname] = useState('');
  const [textstatusgame, settextstatusgame] = useState('Waiting for Opponent...');
  const [Gamestatus, setGamestatus] = useState(false);
  const [CurrentChance, setCurrentChance] = useState('X');
  const [Result_0, setResult_0] = useState('');
  const [Result_1, setResult_1] = useState('');
  const [Result_2, setResult_2] = useState('');
  const [Result_3, setResult_3] = useState('');
  const [Result_4, setResult_4] = useState('');
  const [Result_5, setResult_5] = useState('');
  const [Result_6, setResult_6] = useState('');
  const [Result_7, setResult_7] = useState('');
  const [Result_8, setResult_8] = useState('');
  const [Result, setResult] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [roomcode, setroomcode] = useState('');
  const audioRef = useRef(null);
  const { id } = useParams();
  const { isAuthenticated, addbets, loginstatus, socketurl } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
  }
  const click_game_box = (index) => {
    if (Gamestatus == 1) {
      Result[index] = CurrentChance;
      switch (index) {
        case 0:
          setResult_0(CurrentChance);
          break;

        case 1:
          setResult_1(CurrentChance);
          break;
        case 2:
          setResult_2(CurrentChance);
          break;
        case 3:
          setResult_3(CurrentChance);
          break;
        case 4:
          setResult_4(CurrentChance);
          break;
        case 5:
          setResult_5(CurrentChance);
          break;
        case 6:
          setResult_6(CurrentChance);
          break;
        case 7:
          setResult_7(CurrentChance);
          break;
        case 8:
          setResult_8(CurrentChance);
          break;
        default:
          break;
      }
    }
  }
  useEffect(() => {
    const sockets = io(socketurl);
    let Room_code = '';
    return () => {
      sockets.emit("find_room_code_data", id);
      sockets.on("room_data", (d) => {
        setPreloader('none');
        console.log(d);
      });
    }
  }, []);
  return (
    <>
      <audio ref={audioRef} src={clickSound} preload="auto" />
      <div className="main">
        <div className="preloader" style={{ display: preloader }}></div>
        <div className="context-container">
          <Link to="/" className='back'>Back</Link>
          <div className="item">
            <p>Game Board</p>
          </div>
          <p className='heading roomcode'>ROOMCODE: {roomcode}</p>
          <div className="game-box">
            <div className="items">
              <div className="item" onClick={() => { click_game_box(0) }}>{Result_0}</div>
              <div className="item" onClick={() => { click_game_box(1) }}>{Result_1}</div>
              <div className="item" onClick={() => { click_game_box(2) }}>{Result_2}</div>
            </div>
            <div className="items">
              <div className="item" onClick={() => { click_game_box(3) }}>{Result_3}</div>
              <div className="item" onClick={() => { click_game_box(4) }}>{Result_4}</div>
              <div className="item" onClick={() => { click_game_box(5) }}>{Result_5}</div>
            </div>
            <div className="items">
              <div className="item" onClick={() => { click_game_box(6) }}>{Result_6}</div>
              <div className="item" onClick={() => { click_game_box(7) }}>{Result_7}</div>
              <div className="item" onClick={() => { click_game_box(8) }}>{Result_8}</div>
            </div>
          </div>
          <p className='waitig_text'>{textstatusgame}</p>
          <div className="footer">
            Designed & Developed By Mother solution
          </div>
        </div>
      </div>
    </>
  );
}

export default GameBoard;
