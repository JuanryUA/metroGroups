import * as React from 'react';
import NavBarAdmin from "../layouts/NavBarAdmin";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import DashboardImagenAdmin2 from "../assets/Admin2.png";
import Footer from "../layouts/Footer";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../user"; 
import { useEffect, useState } from "react";
import { validarAdmin } from "./adminvalidation";
import { collection, query, where, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';
import styles from "./Admin2.module.css"


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Admin2() {
  const navegar = useNavigate();
  const usuario = useUser();
  const [confirmar1, setConfirmar1] = useState(false);
  const [confirmar2, setConfirmar2] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [agregarentrada, setAgregarEntrada] = useState('')
  const [eliminarentrada, setEliminarEntrada] = useState('')

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

  const handleUnirseClick1 = () => {
    setConfirmar1(true);
  };

  const handleUnirseClick2 = () => {
    setConfirmar2(true);
  };

  const handleCancelar1 = () => {
    setConfirmar1(false);
  };
  
  const handleCancelar2 = () => {
    setConfirmar2(false);
  };

  const agregarEntrada = async () => {
    try {
      if (!agregarentrada.trim()) {
        setMensaje('La entrada no puede estar vacía');
        return;
      }
      const entrada = agregarentrada.charAt(0).toUpperCase() + agregarentrada.slice(1);
      if (!isNaN(entrada)) {
        setMensaje('El valor introducido no puede ser un número');
        return;
      }
      const q = query(collection(db, 'tiposagrupaciones'), where('clasificacion', '==', entrada));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
          setMensaje('Esta entrada ya existe');
          return;
      }
      await addDoc(collection(db, 'tiposagrupaciones'), { clasificacion: entrada });
      setMensaje('Entrada agregada correctamente');
      setTimeout(() => {
        setConfirmar1(false);
        setMensaje('');
        setAgregarEntrada('');
      }, 2000);
  } catch (error) {
      setMensaje('Error al agregar la entrada:', error);
  }
  };

  const eliminarEntrada = async () => {
    try {
      if (!eliminarentrada.trim()) {
        setMensaje('La entrada no puede estar vacía');
        return;
      }
      const entrada = eliminarentrada.charAt(0).toUpperCase() + eliminarentrada.slice(1);
      const q = query(collection(db, 'tiposagrupaciones'), where('clasificacion', '==', entrada));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setMensaje('Esta entrada no existe');
        return;
      }
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, 'tiposagrupaciones', docId));
      setMensaje('Entrada eliminada correctamente');
      setTimeout(() => {
        setConfirmar2(false);
        setMensaje('');
        setEliminarEntrada('');
      }, 2000);
    } catch (error) {
      setMensaje('Error al eliminar la entrada:', error);
    }
  };

  return (
    <>
    <NavBarAdmin />
    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2}>
    <Grid xs={6}>
    <Item>
        <Card sx={{ maxWidth: 345, marginRight: "20px" }}>
        <Typography gutterBottom variant="h5" component="div">
              Dashboard Agrupaciones
            </Typography>
          <CardMedia
            sx={{ height: 140 }}
            
            title="Dashboard Agrupaciones"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Dashboard Agrupaciones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              -ARCA Unimet
              <p></p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              -Astromet
              <p></p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              -Fórmula SAE
              <p></p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              -MetroTech
              <p></p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              -The Orange Post
              <p></p>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              -Unimet Debate
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => navegar('/add-agrupacion', {replace: true})}>Agregar Agrupación</Button>
            <Button size="small">Eliminar Agrupación</Button>
            <Button size="small">Actualizar Cambios</Button>
          </CardActions>
        </Card>
        </Item>
        </Grid> 



        {/* Segunda carta */}
          
          <Grid xs={6}>
          <Item>
          <Card sx={{ maxWidth: 5000, maxHeight: 5000, overflow: 'auto' }}>
          
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Dashboard de tipos
              
              </Typography>
              
            </CardContent>
            
            <CardMedia image={DashboardImagenAdmin2} sx={{height:300}}>
            
            </CardMedia>
          
            <Grid container spacing={2}>
            <Grid xs={6}>
          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px", fontSize: "20px" }}>Otros</h5>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>Artes y Creatividad</h5>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>Negocios</h5>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>Tecnologías</h5>
            <h5 style={{ fontWeight: "bold", marginBottom: "10px" }}>ETC</h5>
            </div>
            </Grid>
            <Grid xs={6}>
            
            <div style={{ display: "flex", flexDirection: "column", marginRight: "30px" }}>
              <Button variant="contained" color="primary" size="small" onClick={handleUnirseClick1} style={{ marginBottom: "5px", backgroundColor: "black", color: "white" }}>
              Crear Entrada
              </Button>
              <Button variant="contained" color="primary" size="small" onClick={handleUnirseClick2} style={{ marginBottom: "5px", backgroundColor: "black", color: "white" }}>
              Eliminar Entradas
              </Button>
              <Button variant="contained" color="primary" size="small" style={{ backgroundColor: "black", color: "white" }}>
              Actualizar Cambios
              </Button>
              {confirmar1 && (
                        <div>
                          <form onSubmit={agregarEntrada}> 
                            <input
                              className={styles.inpu}
                              type="text"
                              placeholder="Introduzca la entrada a agregar"
                              value={agregarentrada}
                              onChange={(e) => setAgregarEntrada(e.target.value)}
                            />
                          </form>                        
                          <button className={styles.buttonconfirmar} onClick={() => agregarEntrada()} type="submit">Confirmar</button>
                          <button className={styles.buttoncancelar} onClick={handleCancelar1}>Cancelar</button>
                          {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
                        </div>
                    )}
              {confirmar2 && (
                      <div>
                        <form onSubmit={eliminarEntrada}>
                          <input
                              className={styles.inpu}
                              type="text"
                              placeholder="Introduzca la entrada a eliminar"
                              value={eliminarentrada}
                              onChange={(e) => setEliminarEntrada(e.target.value)}
                          />
                        </form>                         
                        <button className={styles.buttonconfirmar} onClick={() => eliminarEntrada()} type="submit">Confirmar</button>
                        <button className={styles.buttoncancelar} onClick={handleCancelar2}>Cancelar</button>
                        {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
                      </div>
                    )}
            </div>
            </Grid>
          </Grid>
          </Card>
          </Item>
          </Grid>
          </Grid>
    </Box>

    <Footer />
    </>
  );
}

