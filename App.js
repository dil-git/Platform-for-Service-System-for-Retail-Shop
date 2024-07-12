import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './AdminPages/Home'
import Loginpage from './AdminPages/Login'
import Registerpage from './AdminPages/Register'
import UserFeatures from './UserPages/Features';
import RequestBook from './AdminPages/RequestBook';
import UserDetail from './AdminPages/UserDetail';
import AdminFeatures from './AdminPages/Features';
import UserProfile from './UserPages/UserProfile';
import './index.css';
import RequestService from './UserPages/RequestService';
import Booking from './UserPages/Booking';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/Login' element={<Loginpage />} />
        <Route path='/UserFeatures' element={<UserFeatures />} />
        <Route path='/Register' element={<Registerpage />} />
        <Route path='/RequestBook' element={<RequestBook />} />
        <Route path='/UserDetail' element={<UserDetail />} />

        <Route path='/AdminFeatures' element={<AdminFeatures />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/RequestService' element={<RequestService />} />
        <Route path='/Booking' element={<Booking />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
