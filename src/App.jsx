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


//https://qfhbxjelovjvyftsuynm.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmaGJ4amVsb3ZqdnlmdHN1eW5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MTQ2MjEsImV4cCI6MjA2MjI5MDYyMX0.XbBGillpw0wm9ZdlgJ6ctqAHeAN_OF2OABHN_kMW1iw

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
