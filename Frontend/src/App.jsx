import { Route, Routes } from 'react-router-dom';
import StartPage from './pages/Start';
import UserLoginPage from './pages/UserLogin';
import UserSignupPage from './pages/UserSignup';
import CaptainLoginPage from './pages/CaptainLogin';
import CaptainSignupPage from './pages/CaptainSignup';
import HomePage from './pages/Home';
import UserProtectWrapperPage from './pages/userProtectWrapper';
import UserLogoutPage from './pages/UserLogout';
import CaptainHomePage from './pages/CaptainHome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper copy';
import CaptainLogoutPage from './pages/CaptainLogout';
import RidingPage from './pages/RidingPage';
import CaptainRidingPage from './pages/CaptainRidingPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/captain-login" element={<CaptainLoginPage />} />
        <Route path="/captain-signup" element={<CaptainSignupPage />} />
        <Route path="/riding" element={<RidingPage />} />
        <Route path="/captain-riding" element={<CaptainRidingPage />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapperPage>
              <HomePage />
            </UserProtectWrapperPage>
          }
        />
        <Route
          path="user/logout"
          element={
            <UserProtectWrapperPage>
              <UserLogoutPage />
            </UserProtectWrapperPage>
          }
        />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHomePage />
            </CaptainProtectWrapper>
          }
        />
        <Route
          path="captain/logout"
          element={
            <CaptainProtectWrapper>
              <CaptainLogoutPage />
            </CaptainProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

