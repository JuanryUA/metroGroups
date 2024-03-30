import { useState, useEffect } from "react";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import styles from "./PerfilUsuario.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../user";

export default function PerfilUsuario() {
  const [data, setData] = useState();
  const navegar = useNavigate();
  const usuario = useUser();
  const id = useUser().uid;
  console.log(id);

  useEffect(() =>{
    if (!usuario) {
      navegar('/login', {replace: true})
    }
  }, [usuario, navegar]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const database = getFirestore();
        const documento = doc(
          database,
          "usuarios", id
        );
        getDoc(documento).then((res) => setData({ id: res.id, ...res.data() }));
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  let Admin = "No habilitado";

  if (data?.Administrador == true) {
    Admin = "Habilitado";
  } else if (data?.nombrecompleto == null) {
    Admin = '';
  }

  return (

    <body className={styles.body}>
      
      <div className={styles.box}>
        <section className={styles.seccion1}>
          <button className={styles.Button} onClick={() => navegar('/edit-user')}>Editar</button>
        </section>
        <div className={styles.Titulo}>
          <img src='https://cdn-icons-png.flaticon.com/512/6378/6378141.png' ></img>
          <h1 class>Informacion de la cuenta </h1>
        </div>

        <section className={styles.seccion2}>
          <div className={styles.InfoDisplay}>
            <label className={styles.labels}>
              <p>Nombre</p>
              <p className={styles.informacion}>{data?.nombrecompleto}</p>
            </label>
            <label className={styles.labels}>
              <p>Email</p>
              <p className={styles.informacion}>{data?.email}</p>
            </label>
            <label className={styles.labels}>
              <p>Telefono</p>
              <p className={styles.informacion}>{data?.telefono}</p>
            </label>
            <label className={styles.labels}>
              <p>Administrador</p>
              <p className={styles.informacion}>{Admin}</p>
            </label>
          </div>
          <div className={styles.agrupacionesDisplay}>
            <p> Agrupaciones</p>
          </div>
        </section>
      </div>
      
    </body>
    
  );
}
