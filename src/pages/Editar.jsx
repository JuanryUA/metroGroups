import Carousel from "../components/Carousel";
import React from "react";
import { useRef,useState } from "react";
import styles from "./PerfilUsuarioEdit.module.css";
import { useNavigate } from "react-router-dom";

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

function EditarUser() {
  
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const navegar = useNavigate();

  const handleSubmit = (event) => {
      event.preventDefault();
      
      console.log('Nombre:', nombre);
      console.log('Correo:', correo);
      console.log('Telefono:', telefono);

      // Realiza otras acciones con los datos aquí
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
                type="text"
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
            
        </form>
        <section className={styles.seccion3}>
        <button type="submit" className={styles.SubmmitButton}>Enviar</button>
        </section>
        </section>
        </div>
      </body>
    );
  };

