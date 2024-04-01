import NavBarAdmin from "../layouts/NavBarAdmin";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import DashboardImagenAdmin2 from "../assets/Admin2.png";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import { useUser } from "../user";
import React, { useEffect, useState } from "react";
import { validarAdmin } from "./adminvalidation";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import styles from "./Admin2.module.css";
import { findGroup, getGroupsArray } from "./groups";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Admin2() {
  const navegar = useNavigate();
  const usuario = useUser();
  const [confirmar1, setConfirmar1] = useState(false);
  const [confirmar2, setConfirmar2] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [agregarentrada, setAgregarEntrada] = useState("");
  const [eliminarentrada, setEliminarEntrada] = useState("");
  const [agrupaciones, setAgrupaciones] = useState([]);

  const editGroup = async (groupName) => {
    const id = await findGroup(groupName);
    
    navegar(`/edit-agrupacion/${id}`)

  }

    
    
    
    
    


  useEffect(() => {
    if (!usuario) {
      navegar("/home", { replace: true });
    } else {
      const email = usuario.email;
      validarAdmin(email).then((esAdmin) => {
        if (esAdmin !== true) {
          navegar("/home", { replace: true });
        }
      });
    }
    const obtenerAgrupaciones = async () => {
      const agrupacionesCol = collection(db, "agrupacion");
      const agrupacionesSnapshot = await getDocs(agrupacionesCol);
      const agrupacionesList = agrupacionesSnapshot.docs.map(
        (doc) => doc.data().nombre
      );
      setAgrupaciones(agrupacionesList);
    };

    obtenerAgrupaciones();
  }, [usuario, navegar]);

  useEffect(() => {
    const obtenerTiposAgrupaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "agrupacion"));
        const agrupaciones = querySnapshot.docs.map((doc) => doc.data().nombre);
        setAgrupaciones(agrupaciones);
      } catch (error) {
        console.error("Error al obtener las agrupaciones:", error);
      }
    };
    obtenerTiposAgrupaciones();
  }, []);

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
        setMensaje("La entrada no puede estar vacía");
        setTimeout(() => {
          setMensaje("");
        }, 2000);
        return;
      }
      const entrada =
        agregarentrada.charAt(0).toUpperCase() + agregarentrada.slice(1);
      if (!isNaN(entrada)) {
        setMensaje("El valor introducido no puede ser un número");
        setTimeout(() => {
          setMensaje("");
        }, 2000);
        return;
      }
      const q = query(
        collection(db, "tiposagrupaciones"),
        where("clasificacion", "==", entrada)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setMensaje("Esta entrada ya existe");
        setTimeout(() => {
          setMensaje("");
        }, 2000);
        return;
      }
      await addDoc(collection(db, "tiposagrupaciones"), {
        clasificacion: entrada,
      });
      setMensaje("Entrada agregada correctamente");
      setTimeout(() => {
        setConfirmar1(false);
        setMensaje("");
        setAgregarEntrada("");
      }, 2000);
    } catch (error) {
      setMensaje("Error al agregar la entrada:", error);
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };

  const eliminarEntrada = async () => {
    try {
      if (!eliminarentrada.trim()) {
        setMensaje("La entrada no puede estar vacía");
        setTimeout(() => {
          setMensaje("");
        }, 2000);
        return;
      }
      const entrada =
        eliminarentrada.charAt(0).toUpperCase() + eliminarentrada.slice(1);
      const q = query(
        collection(db, "tiposagrupaciones"),
        where("clasificacion", "==", entrada)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setMensaje("Esta entrada no existe");
        setTimeout(() => {
          setMensaje("");
        }, 2000);
        return;
      }
      const docId = querySnapshot.docs[0].id;
      await deleteDoc(doc(db, "tiposagrupaciones", docId));
      setMensaje("Entrada eliminada correctamente");
      setTimeout(() => {
        setConfirmar2(false);
        setMensaje("");
        setEliminarEntrada("");
      }, 2000);
    } catch (error) {
      setMensaje("Error al eliminar la entrada:", error);
      setTimeout(() => {
        setMensaje("");
      }, 2000);
    }
  };

  return (
    <>
      <NavBarAdmin />
      <Box
        sx={{
          flexGrow: 1,
          height: "calc(100vh - 100px)",
          backgroundImage: `url(https://img.freepik.com/premium-photo/glowing-shimmering-stars-space-abstract-background_250994-1378.jpg?size=626&ext=jpg&ga=GA1.1.1687694167.1711843200&semt=ais)`,
          backgroundSize: "fit",
          marginButton: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Grid
            xs={6}
            sx={{
              alignSelf: "center",
              color: "black",
              backgroundColor: "transparent",
            }}
          >
            <Item sx={{ backgroundColor: "transparent" }}>
              <Card
                sx={{
                  maxWidth: 345,
                  marginRight: "20px",
                  backgroundColor: "orange",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  sx={{
                    alignElements: "center",
                    height: 140,
                    width: 250,
                    marginTop: 2,
                    backgroundImage: `url("https://pbs.twimg.com/media/GD5GiP6W8AAcmly.jpg:large")`,
                  }}
                  title="Dashboard Agrupaciones"
                />

                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Dashboard Agrupaciones
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      alignSelf: "center",
                      backgroundColor: "white",
                      padding: "10px",
                    }}
                  >
                    {agrupaciones.map((agrupacion) => (
                      <Button onClick={() => editGroup(agrupacion)}>
                        <React.Fragment key={agrupacion}>
                          •{agrupacion}
                        </React.Fragment>
                      </Button>
                    ))}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    onClick={() =>
                      navegar("/add-agrupacion", { replace: true })
                    }
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "lightgray", // Cambia 'blue' al color que prefieras
                      },
                    }}
                  >
                    Agregar Agrupación
                  </Button>
                  <Button
                    size="small"
                    onClick={() =>
                      navegar("/eliminar-agrupacion", { replace: true })
                    }
                    sx={{
                      backgroundColor: "white",
                      color: "black",
                      "&:hover": {
                        backgroundColor: "lightgray",
                      },
                    }}
                  >
                    Eliminar Agrupación
                  </Button>
                </CardActions>
              </Card>
            </Item>
          </Grid>

          {/* Segunda carta */}

          <Grid xs={6} sx={{ alignSelf: "center", color: "white" }}>
            <Card
              sx={{
                maxWidth: 5000,
                maxHeight: 5000,
                marginRight: "20px",
                backgroundColor: "orange",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CardMedia
                component="img"
                image={DashboardImagenAdmin2}
                title="Dashboard de tipos"
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  Dashboard de tipos
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleUnirseClick1}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    marginBottom: "5px",
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  Crear Entrada
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleUnirseClick2}
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    marginBottom: "5px",
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  Eliminar Entradas
                </Button>
                {confirmar1 && (
                  <div>
                    <form onSubmit={agregarEntrada}>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="Introduzca la entrada a agregar"
                        value={agregarentrada}
                        onChange={(e) => setAgregarEntrada(e.target.value)}
                      />
                    </form>
                    <button
                      className={styles.buttonconfirmar}
                      onClick={agregarEntrada}
                      type="submit"
                    >
                      Confirmar
                    </button>
                    <button
                      className={styles.buttoncancelar}
                      onClick={handleCancelar1}
                    >
                      Cancelar
                    </button>
                    {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
                  </div>
                )}
                {confirmar2 && (
                  <div>
                    <form onSubmit={eliminarEntrada}>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="Introduzca la entrada a eliminar"
                        value={eliminarentrada}
                        onChange={(e) => setEliminarEntrada(e.target.value)}
                      />
                    </form>
                    <button
                      className={styles.buttonconfirmar}
                      onClick={eliminarEntrada}
                      type="submit"
                    >
                      Confirmar
                    </button>
                    <button
                      className={styles.buttoncancelar}
                      onClick={handleCancelar2}
                    >
                      Cancelar
                    </button>
                    {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
                  </div>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "lightgray",
                    },
                  }}
                >
                  Actualizar Cambios
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
