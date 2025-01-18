import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import UserLoginPage from './pages/UserLogin';
import UserSignupPage from './pages/UserSignup';
import CaptainLoginPage from './pages/CaptainLogin';
import CaptainSignupPage from './pages/CaptainSignup';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/captain-login" element={<CaptainLoginPage />} />
        <Route path="/captain-signup" element={<CaptainSignupPage />} />
      </Routes>
    </div>
  );
};

export default App;

