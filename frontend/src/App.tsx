import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet } from 'react-router-dom'


import Footer from './components/layout/Footer.tsx'
import Navbar from './components/layout/Navbar.tsx'

export default function App() {

  return (
    <>
      <Navbar />

    <div className="divMain">

        <Outlet />

    </div>
    
      <Footer />
    </>

  )
}