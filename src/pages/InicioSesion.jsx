import styles from './InicioSesion.module.css';
import { useNavigate } from 'react-router-dom';

export default function InicioSesion() {
    const navegar = useNavigate();

    return (
      <div className={styles.inicio}>
        <div className={styles.container1}>
          <h2>Iniciar Sesión</h2>
          <div>
            <form>
            <p>Correo Electrónico:</p>
              <input
                className={styles.form1}
                type="email"
                placeholder="Correo Electrónico"
              />
            <p>Contraseña:</p>
              <input
                className={styles.form2}
                type="password"
                placeholder="Contraseña"
              />
            </form>
          </div>
          <button className={styles.buttonS} type="submit">Iniciar Sesión</button>
          <hr></hr>
          <div className={styles.googleButton}>
            <img src="https://static.vecteezy.com/system/resources/previews/016/716/465/original/gmail-icon-free-png.png" alt="Google Icon" />
          </div>
          <hr></hr>
          <p className={styles.text}>No tienes cuenta? Registrate acá abajo</p>
          <button className={styles.buttonR} onClick={() => navegar('/register', {replace: true})}>Registro</button>
        </div>
        <div className={styles.container2}></div>
      </div>
    );
  }