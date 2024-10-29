import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomeIndexPage from './Pages/HomeIndexPage';

function App() {
  return (
    <Routes>
      <Route index element={<HomeIndexPage />} />
    </Routes>
  );
}

export default App;
