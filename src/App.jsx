import './App.css'
import Header from './components/header';
import ProductCard from './components/productCard';
import LoginPage from './pages/login';
import SignUpPage from './pages/signUp';
import HomePage from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/adminPage';




function App() {

  return (
    <BrowserRouter>
      
      <div className='w-full h-screen flex flex-col justify-evenly items-start'>
        <Header />
        <Routes path="/*">
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/*" element={<h1 className='text-red-700 font-bold text-4xl '>404 Not Found</h1>} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
