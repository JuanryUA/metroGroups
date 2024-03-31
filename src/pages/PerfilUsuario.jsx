import { useState, useEffect } from "react";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import styles from "./PerfilUsuario.module.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../user";
import { getGroupsArray } from "./groups";

const AgrupacionesDisplay = () => {
  const usuario = useUser();
  const navegar = useNavigate();

  useEffect(() => {
    const fetchDataGroups = async () => {
      try {
        const Lista = await getGroupsArray();
        const agrupaciones = [];

        for (let i = 0; i < Lista.length; i++) {
          if (Lista[i].value.miembros.includes(usuario.uid)) {
            const agrupacion = {
              codigo: Lista[i].key,
              nombre: Lista[i].value.nombre,
              clasificacion: Lista[i].value.clasificacion,
            };
            agrupaciones.push(agrupacion);
            setGroups(agrupaciones);
          }
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchDataGroups();
  }, []);

  //AGRUPACIONES

  const [groups, setGroups] = useState([]);

  //console.log(groups['1']?.nombre)

  return (
    <div style={{ width: "100%" }}>
      {groups.map((groups) => (
        <div className={styles.Display}>
          <button onClick={() => navegar(`/agrupacion/${groups?.codigo}`)}>{groups?.nombre}</button>
          <p>{groups?.clasificacion} </p>
        </div>
      ))}
    </div>
  );
};

export default function PerfilUsuario() {
  const [data, setData] = useState();
  const navegar = useNavigate();
  const usuario = useUser();

  //USUARIOS//

  useEffect(() => {
    if (!usuario) {
      navegar("/home", { replace: true });
    }
  }, [usuario, navegar]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = usuario.uid;
        const database = getFirestore();
        const documento = doc(database, "usuarios", id);
        const res = await getDoc(documento);
        setData({ id: res.id, ...res.data() });
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, [usuario]);

  let Admin = "No habilitado";

  if (data?.Administrador == true) {
    Admin = "Habilitado";
  } else if (data?.nombrecompleto == null) {
    Admin = "";
  }

  return (
    <body className={styles.body}>
      <div className={styles.box}>
        <section className={styles.seccion1}>
          <button
            className={styles.Button}
            onClick={() => navegar("/edit-user")}
          >
            Editar
          </button>
        </section>
        <div className={styles.Titulo}>
          <img src="https://cdn-icons-png.flaticon.com/512/6378/6378141.png"></img>
          <h1>Informacion de la cuenta </h1>
        </div>
        <div className={styles.encabezado}>
          <h4>Datos</h4>
          <h4>Agrupaciones</h4>
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

          <div className={styles.DisplayBox}>
            <AgrupacionesDisplay></AgrupacionesDisplay>
          </div>
        </section>
      </div>
    </body>
  );
}
