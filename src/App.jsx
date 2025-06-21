import './App.css'
import Header from './components/header';
import ProductCard from './components/productCard';
import LoginPage from './pages/login';
import SignUpPage from './pages/signUp';
import HomePage from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/adminPage';
import { Toaster } from 'react-hot-toast';
import TestPage1 from './pages/test';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ForgetPasswordPage from './pages/client/forgetpwd';
import EmailVerifcationPage from './pages/client/emailVerification';


function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <BrowserRouter>
        <Toaster position='top-center' />

        <div className='w-full h-screen flex flex-col justify-evenly items-start'>

          <Routes path="/*">

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/admin/*" element={<AdminPage />} />
            <Route path="/test" element={<TestPage1 />} />
            <Route path="/forget" element={<ForgetPasswordPage/>} />
            <Route path="/verify" element={<EmailVerifcationPage/>} />
            <Route path="/*" element={<HomePage />} />

          </Routes>
        </div>
      </BrowserRouter>
      </GoogleOAuthProvider>
    
  )
}

export default App
