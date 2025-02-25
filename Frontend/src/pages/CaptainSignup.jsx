import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainpSignupPage = () => {
  const [captainData, setCaptainData] = useState({});

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

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
      vehicle: {
        color: formData.get('vehicle-color'),
        plate: formData.get('vehicle-plate'),
        capacity: formData.get('vehicle-capacity'),
        vehicleType: formData.get('vehicle-type'),
      },
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/captains/register`,
      formValues
    );

    if (response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem('token', data.token);
      navigate('/captain-home');
    }

    // setCaptainData(formValues);
    // console.log(formValues);
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-3"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="uber logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-base font-medium mb-1">What's your name</h3>
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

          <h3 className="text-base font-medium mb-1">What's your email</h3>
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="email@example.com"
            className="bg-[#eee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          />

          <h3 className="text-base font-medium mb-2">Enter Vehicle Details:</h3>

          <div>
            <div>
              <h3 className="text-base font-medium mb-2">Vehicle Color/Plate</h3>
              <div className="flex gap-4 mb-2">
                <input
                  type="text"
                  name="vehicle-color"
                  required
                  placeholder="Color"
                  className="bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-sm"
                />
                <input
                  type="text"
                  name="vehicle-plate"
                  placeholder="Plate"
                  className="bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-sm"
                />
              </div>
            </div>
            <div>
              <h3 className="text-base font-medium mb-2">
                Vehicle Capacity / vehicle type
              </h3>
              <div className="flex gap-4 mb-2">
                <input
                  type="number"
                  name="vehicle-capacity"
                  required
                  placeholder="capacity"
                  className="bg-[#eee] rounded px-4 py-2 w-1/2 border text-lg placeholder:text-sm"
                />
                <select
                  required
                  className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base"
                  placeholder="vehicle type"
                  name="vehicle-type"
                >
                  <option value="" disabled>
                    Select Vehicle Type
                  </option>
                  <option value="car">Car</option>
                  <option value="auto">auto</option>
                  <option value="motorcycle">motorcycle</option>
                </select>
              </div>
            </div>
          </div>

          <h3 className="text-base font-medium mb-1">Enter password</h3>
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
            Create Captain Account
          </button>
        </form>
        <p className="text-center mb-3">
          Already have a account?{' '}
          <Link to={'/captain-login'} className="text-blue-600">
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

export default CaptainpSignupPage;
