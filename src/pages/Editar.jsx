import React from "react";
import styles from "./PerfilUsuarioEdit.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../user.js";
import { collection, doc } from 'firebase/firestore'
import { db } from './firebase.js'
import { updateDoc } from 'firebase/firestore'


export default function Editar(props) {
  if (props.tipo == "user") {
    return EditarUser();
  } else if (props.tipo == "agrupacion") {
    return EditarAgrupacion();
  }
}

function EditarAgrupacion() {
  return <div>agrupacion</div>;
}

export function validarEntradas(tipo, valor) {
  if (tipo == "texto") {
    if (/^[A-Za-z]+$/.test(valor)) { // valida que el dato de entrada sea algun texto que solo sea letras del alfabeto
      return true;
    } else {
      alert("invalido!!");
      return false;
    }
  } else if (tipo == "correo") {
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor)) { //valida que el dato de entrada sea del
      return true;                                                        //tipo xxxx@xxx.xxx
    } else {
      return false;
    }
  } else if (tipo == 'telefono') {
    if(/^[0-9]+$/.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
}



async function ActualizarBase(updates,user,coleccion) {
  //Busca una referencia del documento que se va a modificar
  const userDocumentRef = doc(db, coleccion, user.uid);

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

  const  handleSubmit = (event) => {
    event.preventDefault();

    if (validarEntradas("texto", nombre) && validarEntradas("correo", correo) && validarEntradas("telefono", telefono.replace(/-/g, ''))) {
      alert('aprobado!!');
      const updates = {
        nombrecompleto: nombre,
        email: correo,
        telefono: telefono
      };
     ActualizarBase(updates, user, 'usuarios');

    } else {
      alert("Campo Invalido!!");
    }

    
  };

  return (
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
              type="email"
              name="correo"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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
  );
}
