import styles from './AgregarAgrupacion.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { deleteGroupByKey, getGroupsNames, findGroup } from './groups';
import NavBarAdmin from "../layouts/NavBarAdmin";
import Footer from "../layouts/Footer";
import { useUser } from "../user"; 
import { validarAdmin } from "./adminvalidation";

export default function EliminarAgrupacion() {
    const navegar = useNavigate();
    const [nombreAgrupacion, setNombreAgrupacion] = useState('');
    const [error, setError] = useState(null);
    const usuario = useUser();

    useEffect(() => {
        if (!usuario) {
            navegar('/home', { replace: true });
        } else {
            const email = usuario.email;
            validarAdmin(email).then(esAdmin => {
                if (esAdmin !== true) {
                    navegar('/home', { replace: true });
                }
            });
        }
    }, [usuario, navegar]);

    const eliminarAgrupacion = async () => {
        try {
            if (!nombreAgrupacion) {
                setError('El nombre de la agrupación es requerido.');
                return;
            }
            
            const nombresAgrupaciones = await getGroupsNames(); // Obtén los nombres de todas las agrupaciones
            if (!nombresAgrupaciones.includes(nombreAgrupacion)) { // Verifica si el nombre de la agrupación existe
                setError('No se encontró ninguna agrupación con ese nombre.');
                return;
            }
    
            const groupId = await findGroup(nombreAgrupacion); // Encuentra la ID de la agrupación
            const eliminacionExitosa = await deleteGroupByKey(groupId); // Elimina la agrupación usando su ID
            if (eliminacionExitosa) {
                setError(null);
                alert("Agrupación eliminada satisfactoriamente."); // Mostrar un mensaje de éxito
                navegar('/admin2', { replace: true }); // Navegar a la página anterior solo si la eliminación es exitosa
            } else {
                setError('Eliminación interrumpida. La agrupación tiene integrantes.');
            }
        } catch (e) {
            console.error(e);
            setError('Ocurrió un error al eliminar la agrupación.');
        }
    };

    return (
        <>
            <NavBarAdmin />
            <div className={styles.inicio}>
                <div className={styles.container2}></div>
                <div className={styles.container1}>
                    <h2>Eliminar Agrupación</h2>
                    <div>
                        <form>
                            <p>Nombre de la Agrupación:</p>
                            <input
                                className={styles.form1}
                                type="text"
                                value={nombreAgrupacion}
                                onChange={(e) => setNombreAgrupacion(e.target.value)}
                            />
                        </form>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button className={styles.buttonA} type="button" onClick={eliminarAgrupacion}>Eliminar</button>
                        <button className={styles.buttonA} type="button" onClick={() => navegar('/admin2', {replace: true})}>Regresar</button>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                </div>
            </div>
            <Footer />
        </>
    );
}