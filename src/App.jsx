import './App.css'
import Header from './components/header';
import ProductCard from './components/productCard';
import LoginPage from './pages/login';
import SignUpPage from './pages/signUp';
import HomePage from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/adminPage';
import TestPage from './pages/test';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <BrowserRouter>
    <Toaster position='top-center'/>
      
      <div className='w-full h-screen flex flex-col justify-evenly items-start'>
        
        <Routes path="/*">
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/testing/*" element={<TestPage />} />
          <Route path="/*" element={<HomePage />} />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
