import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserProtectWrapperPage = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [isLoading]);

  if (isLoading) {
    return <div>Loding...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapperPage;
