import styles from './Registrarse.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Registro } from './auth';
import { RegistroPorGoogle } from './auth';
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

export default function Registrarse() {
    const [nombrecompleto, setNombreCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const navegar = useNavigate();

    const handleRegistro = async () => {
      try {
        if (!nombrecompleto || !email || !telefono || !contraseña) {
          setError('Introduzca todos los datos.');
          return;
        }
        if (isNaN(telefono) || !Number.isInteger(parseFloat(telefono))) {
          setError('Teléfono no válido');
          return;
        }
        const usuario = await Registro(nombrecompleto, email, telefono, contraseña);
        console.log(usuario)
        if (usuario) {
          navegar('/home', {replace: true});
        } else {
          setError('Error');
        }
      } catch (error) {
        setError(error.message);
        setTimeout(() => {
          setError('');
        }, 1000);
      }
    };

    const handleGoogleLogin = async () => {
      try {
        const usuario = await RegistroPorGoogle();
        if (usuario) {
          navegar('/home', {replace: true});
        } else {
          setError('Error al iniciar sesión con Google.');
        }
      } catch (error) {
        setError('Ocurrió un error al intentar iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.');
      }
    };

    return (
      <>
      <NavBar />
      <div className={styles.inicio}>
          <div className={styles.container}>
          <h2>Registro</h2>
          <div> 
              <form onSubmit={handleRegistro}>
                <p>Nombre Completo:</p>    
                <input type="text" placeholder="Nombre Completo" value={nombrecompleto} onChange={(e) => setNombreCompleto(e.target.value)}/>
                <p>Correo Electrónico:</p>
                <input type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <p>Teléfono:</p>
                <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                <p>Contraseña:</p>
                <input type="password" placeholder="Contraseña"  value={contraseña} onChange={(e) => setContraseña(e.target.value)}/>
              </form>
          </div>
          <button className={styles.buttonr} onClick={() => handleRegistro()}>Registrarse</button>
          {error && <p className={styles.error}>{error}</p>}
          <hr></hr>
          <div className={styles.googleButton} type="button" onClick={() => handleGoogleLogin()}>
            <img src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png" alt="Google Icon" />
          </div>
          <hr></hr>
          <p className={styles.text}>¿Tienes cuenta? Inicia sesión acá abajo</p>
          <button className={styles.buttonI} onClick={() => navegar('/login', {replace: true})}>Inicio Sesión</button>
          </div>
      </div>
      <Footer />
      </>
    );
  }