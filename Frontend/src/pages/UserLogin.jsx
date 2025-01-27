import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const UserLoginPage = () => {
  const [userData, setUserData] = useState({ email: '', password: '' });
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/login`,
      formValues
    );

    if (response.status === 200) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }

    console.log(formValues);
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="email@example.com"
            className="bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          />
          <h3 className="text-lg font-medium mb-2">password</h3>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="password"
            className="bg-[#eee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold  mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Login
          </button>
        </form>
        <p className="text-center mb-3">
          New here?{' '}
          <Link to={'/signup'} className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to={'/captain-login'}
          className="bg-[#111] flex items-center justify-center text-white font-semibold  mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLoginPage;
