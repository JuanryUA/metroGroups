import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Agrupacion from "./pages/Agrupacion";
import AgruAfiliado from "./pages/AgruAfiliado";
import NoPage from "./pages/NoPage";
import Header from "./components/Header";
import NavBar from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import Admin from "./pages/Admin";
import InicioSesion from "./pages/InicioSesion";
import Registrarse from "./pages/Registrarse";
import PerfilUsuario from "./pages/PerfilUsuario"
import Editar from "./pages/Editar";
import Admin2 from "./pages/Admin2";

function App() {

  


  return (
    <>
      <div>
        <BrowserRouter>
          {/* <NavBar /> */}
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/agrupacion/:codigo" element={<Agrupacion />} />
            <Route path="/afiliado/:codigo" element={<AgruAfiliado />}></Route>
            <Route path="/admin" element={<Admin />}></Route>
            <Route path="*" element={<NoPage />}></Route>
            <Route path="/login" element={<InicioSesion />}></Route>
            <Route path="/register" element={<Registrarse />}></Route>
            <Route path="/profile" element={<PerfilUsuario />}></Route>
            <Route path="/edit-user" element={<Editar tipo='user'/>}></Route>
            <Route path="/edit-agrupacion" element={<Editar tipo='agrupacion'/>}></Route>
            <Route path="/admin2" element={<Admin2/>}></Route>

          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
