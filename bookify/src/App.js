import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeIndexPage from './pages/HomeIndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import AccountLayout from './LayoutAccount';
import RegisterPage from './pages/RegisterPage';
import MyBookings from './pages/MyBookingsPage';
import PlacesPage from './pages/PlacesPage';
import { AuthProvider } from './context/AuthContext';
import ProfilePage from './pages/ProfilePage';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './UserContext';
import UpdateProfilePage from './pages/UpdateProfilePage';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000';

function App() {

  return (
    <UserContextProvider>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<HomeIndexPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            
          </Route>
          <Route path='/account' element={<AccountLayout />}>
            <Route path='/account/profile' element={<ProfilePage />} />
            <Route path='/account/bookings' element={<MyBookings />} />
            <Route path='/account/accommodations' element={<PlacesPage />} />
            <Route path='/account/:places/:action' element={<PlacesPage />} />
            <Route path='/account/updateProfile' element={<UpdateProfilePage />} />
          </Route>

        </Routes>
        <Toaster position='top-right' />
      </AuthProvider>
    </UserContextProvider>
  );
}

export default App;