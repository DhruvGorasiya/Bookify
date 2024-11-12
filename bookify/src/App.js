import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeIndexPage from './pages/HomeIndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from './UserContext';
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
        </Routes>
        <Toaster position='top-right' />
      </AuthProvider>
    </UserContextProvider>
  );
}

export default App;