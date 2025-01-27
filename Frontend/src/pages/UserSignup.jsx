import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const UserSignupPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      fullname: {
        firstname: formData.get('first-name'),
        lastname: formData.get('last-name'),
      },
      email: formData.get('email'),
      password: formData.get('password'),
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/register`,
      formValues
    );

    if (response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token);
      navigate('/home');
    }

    console.log(formValues, response);
    // setUserData(formValues);
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
          <h3 className="text-base font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-5">
            <input
              type="text"
              name="first-name"
              required
              placeholder="first name"
              className="bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-sm"
            />
            <input
              type="text"
              name="last-name"
              placeholder="last name"
              className="bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-sm"
            />
          </div>

          <h3 className="text-base font-medium mb-2">What's your email</h3>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="email@example.com"
            className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          />
          <h3 className="text-base font-medium mb-2">Enter password</h3>
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="password"
            className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          />
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold  mb-2 rounded px-4 py-2 w-full text-lg placeholder:text-base"
          >
            Create account
          </button>
        </form>
        <p className="text-center mb-3">
          Already have a account?{' '}
          <Link to={'/login'} className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{' '}
          <span className="underline">Google Privacy Policy</span> and{' '}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignupPage;
