import './assets/css/App.css';
import clickSound from './assets/sounds/click.mp3';
import LoaderImage from './assets/loader.webp';
import Versus from './assets/images/versus.png';
import { React, useState, useRef, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { io } from 'socket.io-client';
function GamePlay() {
  const [preloader, setPreloader] = useState('block');
  const [Image, setImage] = useState('');
  const [name, setname] = useState('');
  const [roomcode, setroomcode] = useState('');
  const [statusofgame, setstatusofgame] = useState('Searching....');
  const [current_balance, setcurrent_balance] = useState(0);
  // const [joined, setjoined] = useState(false);
  // const [socket, setSocket] = useState(null);
  const audioRef = useRef(null);
  const { id } = useParams();
  let winamount = (id * 2) - ((id * 2) * 0.3);
  const { isAuthenticated, addbets, loginstatus, socketurl } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!isAuthenticated) {
    navigate('/login');
  }
  useEffect(() => {
    const sockets = io(socketurl);
    let Room_code = '';
    return () => {
      // setSocket(sockets);
      addbets({ 'amount': id, 'userid': loginstatus }, (data) => {
        if (data.status === true) {
          setImage(data.userdata.image);
          setname(data.userdata.fname);
          setcurrent_balance(data.wallet);
          // setjoined(true);
          setPreloader('none');
          sockets.emit("add_room", { "userid": loginstatus, "amount": id });
        } else {
          navigate('/context');
          alert(data.message);
        }
      }, () => {
        navigate('/context');
        alert('Something wents wrong!!');
      });
      sockets.on("addBetResponse", (d) => {
        Room_code = d.room_code;
        setroomcode(d.room_code);
      });
      sockets.on("joined_room", (d) => {
        Room_code = d.room;
        setroomcode(d.room);
        setstatusofgame('Player is connected! 🥳, redirect to game board');
        setTimeout(() => {
          navigate('/gameground/' + d.room);
        }, 2500);
      });
      sockets.on("join_room", (d) => {
        if (Room_code == d.room_data.code && loginstatus == d.room_data.userid) {
          setTimeout(() => {
            navigate('/gameground/' + d.room_data.code);
          }, 2500);
        }
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
            <p>Game Playground</p>
          </div>
          <div className="item">
            <p>Context detail</p>
            <p>₹{id}</p>
            <p>₹{winamount}</p>
            <button>Joining...</button>
          </div>
          <p className='heading'>Hi, {name} ( ₹ {current_balance})</p>
          <p className='heading roomcode'>ROOMCODE: {roomcode}</p>
          <p className='heading'>Player searching...</p>
          <div className="player-section">
            <div className="player1 player versus">
              <img src={Image} alt={name} className='' />
            </div>
            <div className="player1 player versus">
              <img src={Versus} alt="versus" />
            </div>
            <div className="player1 player">
              <img src={LoaderImage} alt="" className='loader' />
            </div>
          </div>
          <button className="play">{statusofgame}</button>
          <div className="footer">
            Designed & Developed By Mother solution
          </div>
        </div>
      </div>
    </>
  );
}

export default GamePlay;
