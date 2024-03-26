import styles from './Registrarse.module.css';
import { useNavigate } from 'react-router-dom';

export default function Registrarse() {
    const navegar = useNavigate();

    return (
      <div className={styles.inicio}>
          <div className={styles.container}>
          <h2>Registro</h2>
          <div> 
              <form>
                <p>Nombre Completo:</p>    
                <input type="text" placeholder="Nombre Completo" />
                <p>Correo Electrónico:</p>
                <input type="email" placeholder="Correo Electrónico" />
                <p>Teléfono:</p>
                <input type="text" placeholder="Teléfono" />
                <p>Contraseña:</p>
                <input type="password" placeholder="Contraseña" />
              </form>
          </div>
          <button className={styles.buttonr}>Registrarse</button>
          <p className={styles.text}>Tienes cuenta? Inicia sesión acá abajo</p>
          <button className={styles.buttonI} onClick={() => navegar('/login', {replace: true})}>Inicio Sesión</button>
          </div>
      </div>
  
    );
  }