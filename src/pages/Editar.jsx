import React from "react";
import styles from "./PerfilUsuarioEdit.module.css";
import estilos from "./EditarAgrupacion.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../user.js";
import { collection, doc } from "firebase/firestore";
import { db } from "./firebase.js";
import { updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { getFirestore, getDoc, onSnapshot } from "firebase/firestore";
import NavBar from "../layouts/NavBar.jsx"
import Footer from "../layouts/Footer.jsx"


export default function Editar(props) {
  const {codigo} = useParams();

  if (props.tipo == "user") {
    return EditarUser();
  } else if (props.tipo == "agrupacion") {
    return EditarAgrupacion(codigo);
  }
}

function EditarAgrupacion(codigo) {

  const IdAgrupacion = codigo;
  const [data, setData] = useState();
  const navegar = useNavigate();
  const [update, setUpdate] = useState("");
  const [campoActualizado, setCampoActualizado] = useState("");

  const [informacion, setInformacion] = useState("");

  const Enviar = (event) => {
    if (validarEntradas("texto", update)) {
      switch (campoActualizado) {
        case "nombre":
          ActualizarBase({ nombre: update }, IdAgrupacion, "agrupacion");
          alert("Hecho!!");
        
          break;
        case "mision":
          ActualizarBase({ mision: update }, IdAgrupacion, "agrupacion");
          alert("Hecho!!");
          break;
        case "vision":
          ActualizarBase({ vision: update }, IdAgrupacion, "agrupacion");
          alert("Hecho!!");
          break;
        case "objetivos":
          ActualizarBase({ objetivos: update }, IdAgrupacion, "agrupacion");
          alert("Hecho!!");
          break;
        case "clasificacion":
          ActualizarBase({ clasificacion: update }, IdAgrupacion, "agrupacion");
          alert("Hecho!!");
          break;
        case "contacto":
          ActualizarBase({ contacto: update }, IdAgrupacion, "agrupacion");
          alert("Hecho!!");
          break;
      }
      
      setInformacion(update);
     
    } else {
      alert("error");
    }
    
  };

  function Seleccion(buttonText) {
    switch (buttonText) {
      case "Mision":
        setCampoActualizado("mision");
        setInformacion(data?.mision);
        break;
      case "Vision":
        setCampoActualizado("vision");
        setInformacion(data?.vision);
        break;
      case "Objetivos":
        setCampoActualizado("objetivos");
        setInformacion(data?.objetivos);
        break;
      case "Contacto":
        setCampoActualizado("contacto");
        setInformacion(data?.contacto);
        break;
      case "Nombre":
        setCampoActualizado("nombre");
        setInformacion(data?.nombre);
        break;
      case "Clasificacion":
        setCampoActualizado("clasificacion");
        setInformacion(data?.clasificacion);
        break;
      default:
        setInformacion("no encontrado");
    }
  }

  useEffect(() => {
    const database = getFirestore();
    const documento = doc(database, "agrupacion", IdAgrupacion);
  
    // Escucha en tiempo real para cambios en el documento
    const unsubscribe = onSnapshot(documento, (snapshot) => {
      if (snapshot.exists()) {
        // El documento existe, actualiza el estado local con los nuevos datos
        setData({ id: snapshot.id, ...snapshot.data() });
      } else {
        // El documento no existe
        console.log("El documento no existe.");
      }
    });
  
    // Limpia el objeto de escucha cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return (
    <>
    <NavBar />
    <body className={estilos.container}>
      <div className={estilos.subcontainer}>
        <div className={estilos.box}>
          <section className={estilos.seccion1}>
            <button onClick={() => Seleccion("Mision")}>Mision</button>
            <button onClick={() => Seleccion("Vision")}>Vision</button>
            <button onClick={() => Seleccion("Objetivos")}>Objetivos</button>
            <button onClick={() => Seleccion("Contacto")}>Contacto</button>
            <button onClick={() => Seleccion("Nombre")}>Nombre</button>
            <button onClick={() => Seleccion("Clasificacion")}>
              Clasificacion
            </button>
          </section>

          <section className={estilos.seccion2}>
            <p>{informacion}</p>
          </section>
          <section className={estilos.seccion3}>
            <form className={estilos.form}>
              <textarea
                name="Campo de cambios"
                placeholder="Agregar cambios"
                value={update}
                onChange={(e) => setUpdate(e.target.value)}
              />
            </form>
          </section>
        </div>
      </div>
      <div className={estilos.Button}>
        <button
          onClick={() => {
            Enviar();
          }}
        >
          Guardar
        </button>
      </div>
    </body>
    <Footer />
    </>
  );
}

export function validarEntradas(tipo, valor) {
  if (tipo == "texto") {
    if (/^[A-Za-z]+$/.test(valor)) {
      // valida que el dato de entrada sea algun texto que solo sea letras del alfabeto
      return true;
    } else {
      alert("invalido!!");
      return false;
    }
  } else if (tipo == "correo") {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor)) {
      //valida que el dato de entrada sea del
      return true; //tipo xxxx@xxx.xxx
    } else {
      return false;
    }
  } else if (tipo == "telefono") {
    if (/^[0-9]+$/.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
}

async function ActualizarBase(updates, id, coleccion) {
  const userDocumentRef = doc(db, coleccion, id);

  //Busca una referencia del documento que se va a modificar

  // los datos para cambiar

  // actualiza el documento
  await updateDoc(userDocumentRef, updates);
}

function EditarUser() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const navegar = useNavigate();
  const user = useUser();
  const id = user.uid;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      validarEntradas("texto", nombre) &&
      validarEntradas("correo", correo) &&
      validarEntradas("telefono", telefono.replace(/-/g, ""))
    ) {
      alert("aprobado!!");
      const updates = {
        nombrecompleto: nombre,
        email: correo,
        telefono: telefono,
      };
      ActualizarBase(updates, id, "usuarios");
    } else {
      alert("Campo Invalido!!");
    }
  };

  return (
    <>
    <NavBar />
    <body className={styles.body}>
      <div className={styles.box}>
        <section className={styles.seccion1}>
          <button
            className={styles.SubmmitButton}
            onClick={() => navegar("/profile")}
          >
            Volver
          </button>
        </section>
        <div className={styles.Titulo}>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/019/552/595/small/sign-up-icon-signup-square-box-on-transparent-background-free-png.png"></img>
          <h1 class>Editar cuenta </h1>
        </div>
        <section className={styles.seccion2}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              name="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />


            <input
              type="text"
              name="phone"
              placeholder="Telefono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
            <section className={styles.seccion3}>
              <button type="submit" className={styles.SubmmitButton}>
                Enviar
              </button>
            </section>
          </form>
        </section>
      </div>
    </body>
    <Footer />
    </>
  );
}
