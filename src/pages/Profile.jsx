import Carousel from "../components/Carousel";
import React from "react";
import {
  AppBar,
  Toolbar,
  TextField,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

export default function Profile() {
  return (
    <>
      <Container>
        <Paper
          elevation={3}
          style={{ margin: "20px", padding: "20px", background: "orange" }}
        >
          <Typography variant="h5" gutterBottom>
            Información de cuenta
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                fullWidth
                style={{ marginTop: "12%", backgroundColor: "white" }}
              />
              <TextField
                label="Apellido"
                fullWidth
                style={{ marginTop: "12%", backgroundColor: "white" }}
              />
              <TextField
                label="Correo"
                fullWidth
                style={{ marginTop: "12%", backgroundColor: "white" }}
              />
              <TextField
                label="Teléfono"
                fullWidth
                style={{ marginTop: "12%", backgroundColor: "white" }}
              />
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                style={{ marginTop: "12%", backgroundColor: "white" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                style={{ display: "flex", justifyContent: "center" }}
              >
                Agrupaciones
              </Typography>
              <Carousel></Carousel>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}
