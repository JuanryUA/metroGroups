import styles from './AgregarAgrupacion.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

export default function AgregarAgrupacion() {
    const navegar = useNavigate();
    const [nombre, setNombre] = useState('');
    const [mision, setMision] = useState('');
    const [vision, setVision] = useState('');
    const [objetivos, setObjetivos] = useState('');
    const [año, setAño] = useState('');
    const [contacto, setContacto] = useState('');
    const [imagen, setImagen] = useState('');
    const [error, setError] = useState(null);
    const [opcionesTipoAgrupacion, setOpcionesTipoAgrupacion] = useState([]);
    const [tipoAgrupacionSeleccionada, setTipoAgrupacionSeleccionada] = useState('');
    const url = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
    const añoActual = new Date().getFullYear();
    const emailR = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
      const obtenerTiposAgrupaciones = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'tiposagrupaciones'));
          const tipos = querySnapshot.docs.map(doc => doc.data().clasificación);
          setOpcionesTipoAgrupacion(tipos);
        } catch (error) {
          setError('Error al obtener los tipos de agrupaciones.');
          console.error('Error al obtener los tipos de agrupaciones:', error);
        }
      };
      obtenerTiposAgrupaciones();
    }, []);
  
    const Agregar = async (nombre, mision, vision, objetivos, año, contacto, imagen) => {
      try {
        const añoNumero = parseInt(año);
        if (!nombre || !mision || !vision || !objetivos || !año || !contacto || !imagen) {
          setError('Todos los campos son requeridos.');
          return;
        }
        if (añoNumero !== añoActual) {
          setError('El año debe ser el año actual.');
          return;
        }
        if(!emailR.test(contacto)){
          setError('El contacto debe ser un correo electrónico válido.');
          return;
        }
        if (!url.test(imagen)) {
          setError('URL de la imagen no es válida.');
          return;
        }
        const clasificacion = tipoAgrupacionSeleccionada;
        const colaboraciones = 0;
        const miembros = [];
        const agrupacionRef = collection(db, 'agrupacion');
        await addDoc(agrupacionRef, {
          nombre,
          mision,
          vision,
          objetivos,
          año: añoNumero,
          contacto,
          imagen,
          clasificacion,
          colaboraciones,
          miembros,
        });
        setError(null);
        navegar('/admin2', {replace: true})
      } catch (e) {
        console.error(e);
        setError('Ocurrió un error al agregar la agrupación.');
      }
    };

    return (
      <>
      <NavBar />
        <div className={styles.inicio}>
          <div className={styles.container2}></div>
          <div className={styles.container1}>
            <h2>Agregar Agrupación</h2>
            <div>
              <form>
              <p>Nombre:</p>
                <input
                  className={styles.form1}
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <div>
                  <p>Misión:</p>
                  <div
                    className={styles.paragraph}
                    contentEditable
                    onBlur={(e) => setMision(e.target.textContent)}
                  >
                    {mision}
                  </div>
                </div>
                <div>
                  <p>Visión:</p>
                  <div
                    className={styles.paragraph}
                    contentEditable
                    onBlur={(e) => setVision(e.target.textContent)}
                  >
                    {vision}
                  </div>
                </div>
                <div>
                  <p>Objetivos:</p>
                  <div
                    className={styles.paragraph}
                    contentEditable
                    onBlur={(e) => setObjetivos(e.target.textContent)}
                  >
                    {objetivos}
                  </div>
                </div>
              <p>Año:</p>
                <input
                  className={styles.form2}
                  type="text"
                  value={año}
                  onChange={(e) => setAño(e.target.value)}
                />
              <p>Contacto:</p>
                <input
                  className={styles.form2}
                  type="text"
                  value={contacto}
                  onChange={(e) => setContacto(e.target.value)}
                />
              <p>Imagen:</p>
                <input
                  className={styles.form2}
                  type="text"
                  placeholder="Ingrese URL de la imagen"
                  value={imagen}
                  onChange={(e) => setImagen(e.target.value)}
                />
              </form>
              <div className={styles.tipoAgrupacionContainer}>
              <p>Tipo de agrupación:</p>
              <select value={tipoAgrupacionSeleccionada} onChange={(e) => setTipoAgrupacionSeleccionada(e.target.value)}>
              {opcionesTipoAgrupacion.map((opcion, index) => (
                      <option key={index} value={opcion}>{opcion}</option>
                  ))}
              </select>            
              </div>
            </div>
            <button className={styles.buttonA} type="submit" onClick={() => Agregar(nombre, mision, vision, objetivos, año, contacto, imagen)}>Agregar</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      <Footer />
      </>
    );
  }