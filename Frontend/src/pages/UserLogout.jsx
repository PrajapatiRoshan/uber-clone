import axios from 'axios';
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogoutPage = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  axios
    .get(`${import.meta.env.VITE_API_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    });

  return <div>UserLogout</div>;
};

export default UserLogoutPage;
