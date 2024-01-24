import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Stylists from "./pages/Stylists";
import { AuthProvider } from "./contexts/AuthContext";
import StylistDetail from './pages/StylistDetail';
import StylistProfile from "./pages/StylistProfile";
import UserProfile from './pages/UserProfile';
import CustBookings from './pages/CustBookings';

function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/stylists" element={<Stylists />} />
          <Route path="/stylistDetail/:stylId" element={<StylistDetail />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/cust-bookings/:custId" element={<CustBookings />} />
          <Route path="/stylist/profile" element={<StylistProfile />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
