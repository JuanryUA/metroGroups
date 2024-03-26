import styles from './InicioSesion.module.css';
import { useNavigate } from 'react-router-dom';
import { Logearse, LogearseConGoogle, validarInicioSesion } from './auth';
import { useState } from 'react';

export default function InicioSesion() {
    const navegar = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null)

    const handleLogin = async () => {
      try {
          const correoValido = await validarInicioSesion(email);
          if (!correoValido) {
              setError('El correo electrónico introducido no está registrado.');
              return;
          }else{
            const usuario = await Logearse(email, password);
            if (usuario) {
                navegar('/home', {replace: true});
            } else {
                setError('Las credenciales de inicio de sesión son incorrectas.');
            }
          }
      } catch (error) {
          setError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
  };

  const handleGoogleLogin = async () => {
    try {
      const usuario = await LogearseConGoogle();
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
      <div className={styles.inicio}>
        <div className={styles.container1}>
          <h2>Iniciar Sesión</h2>
          <div>
            <form onSubmit={handleLogin}>
            <p>Correo Electrónico:</p>
              <input
                className={styles.form1}
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            <p>Contraseña:</p>
              <input
                className={styles.form2}
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>
          </div>
          <button className={styles.buttonS} onClick={() => handleLogin()} type="submit">Iniciar Sesión</button>
          <hr></hr>
          <div className={styles.googleButton} type="button" onClick={() => handleGoogleLogin()}>
            <img src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png" alt="Google Icon" />
          </div>
          <hr></hr>
          {error && <p className={styles.error}>{error}</p>}
          <p className={styles.text}>No tienes cuenta? Registrate acá abajo</p>
          <button className={styles.buttonR} onClick={() => navegar('/register', {replace: true})}>Registro</button>
        </div>
        <div className={styles.container2}></div>
      </div>
    );
  }