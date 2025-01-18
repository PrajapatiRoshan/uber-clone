import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserSignupPage = () => {
  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      fullname: {
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
      },
      email: formData.get('email'),
      password: formData.get('password'),
    };
    setUserData(formValues);
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
            Sign up
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
        {/* <Link
          to={'/captain-login'}
          className="bg-[#111] flex items-center justify-center text-white font-semibold  mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign as Captain
        </Link> */}
      </div>
    </div>
  );
};

export default UserSignupPage;
