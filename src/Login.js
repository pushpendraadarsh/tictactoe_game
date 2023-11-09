import './assets/css/App.css';
import { useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
function Login() {
  const { isAuthenticated, login } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    login({ "id": id }, (d) => {
      if (d.status) {
        navigate('/');
      }
    });
    return () => {
    }
  }, [id, isAuthenticated, login, navigate]);
}

export default Login;
