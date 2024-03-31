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



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));



export default function Admin2() {
  const navegar = useNavigate();
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
              <Button variant="contained" color="primary" size="small" style={{ marginBottom: "5px", backgroundColor: "black", color: "white" }}>
              Crear Entrada
              </Button>
              <Button variant="contained" color="primary" size="small" style={{ marginBottom: "5px", backgroundColor: "black", color: "white" }}>
              Eliminar Entradas
              </Button>
              <Button variant="contained" color="primary" size="small" style={{ backgroundColor: "black", color: "white" }}>
              Actualizar Cambios
              </Button>
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

