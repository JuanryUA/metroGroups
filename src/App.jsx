import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Agrupacion from './pages/Agrupacion'
import NoPage from './pages/NoPage'
import Header from './components/Header'
import NavBar from './layouts/NavBar'
import Footer from './layouts/Footer'

function App() {


  return (
    <>
      <div>
        
        <BrowserRouter>
        <NavBar/>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/agrupacion" element={<Agrupacion />}></Route>
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
          <Footer/>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
