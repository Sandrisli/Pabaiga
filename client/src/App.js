import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { PageLayout } from './components/PageLayout/PageLayout';
import { Expenses } from '.Pages/Expenses/Expenses';
import { Login } from '.Pages/Login/Login';
import { Register } from './Pages/Register/Register';
import { UserContextWrapper } from './contexts/UserContextWrapper';
import { useContext, useEffect } from 'react';


function App() {

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN_KEY);
    if (token) {
      fetch(`${process.env.REACT_APP_API_URL}/token/verify`, {
        headers: {
          authorization: 'Bearer ' + token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          const { id, email } = data;
          setUser({ id, email });
          navigate('/');
        }
      });
    }
  }, []);

  return (
    <UserContextWrapper>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Expenses />} />
      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/reister" element={<Register />}/>
      </Routes>
    </UserContextWrapper>
  );
}

export default App;
