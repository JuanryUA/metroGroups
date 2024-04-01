import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import './About.css';

const StyledListItemText = styled('div')`
  text-align: center;
`;

const StyledCardMedia = styled(CardMedia)`
  text-align: center;
`;

const StyledCardContent = styled(CardContent)`
  justify-content: center;
  height: auto;
`;

const StyledButton = styled(Button)`
  margin-right: 8px; 
  background-color: #FDA403;  
  &:hover {
    background-color: #222831;
  }
`;


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,

}));

const agrupaciones = [
  { codigo: '0dveVmDq7hPvl2cCgF0P', nombre: 'ARCA' },
  { codigo: 'RJLHoL9lAp9naAsirSMl', nombre: 'Ensamble afro-venezolano' },
  { codigo: 'gLrrRL5Dz8xznwpGlKZp', nombre: 'MetroTech' },
  { codigo: 'e3TzDuYgUkmLiR3KKaiD', nombre: 'UNIMET Fitness' },
  { codigo: 'g3xMRcs1nLFFHGUWEm38', nombre: 'VOX' },
];

export default function About() {
  const handleAgrupacionClick = (codigo) => {
    // Redirige a la página de Agrupación con el código correspondiente
    console.log(`Redirigiendo a la agrupación con código: ${codigo}`);
  };

  return (
    
      <Box sx={{ flexGrow: 1 , mt : 2}}>
            <div className="TOP-about-container">
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} className="Grid-item">
                  <img className="img-with-margin"  style={{width: '100%'}} src="https://www.unimet.edu.ve/wp-content/uploads/2023/09/IMG_4971.jpg" alt="Imagen 1"/>
                </Grid>
                <Grid item xs={12} sm={6} className="Grid-item">
                  <Card className="Card1 centered-card" >
                    <StyledCardMedia className="StyledCardMedia">
                      MISION
                    </StyledCardMedia>
                    <StyledCardContent className="StyledCardContent">
                      Aportar a los estudiantes de la Universidad Metropolitana una plataforma en línea con acceso a las distintas agrupaciones que conforman a la universidad, siendo un espacio virtual del tipo “red social” que les permitirá tanto unirse a cualquier agrupación de su gusto como también compartir información entre ellos de sus experiencias y vivencias, de ésta forma podrán aportar un valor agregado al espacio de las agrupaciones dentro de la universidad. 
                    </StyledCardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} className="Grid-item">
                  <Card className='Card2 centered-card'>
                    <StyledCardMedia className='StyledCardMedia'>
                      VISION
                    </StyledCardMedia>
                    <StyledCardContent className="StyledCardContent">
                      Convertir Metro Groups en la plataforma principal que dé voz y vista a las distintas agrupaciones de la Universidad Metropolitana, llegando así a la mayor cantidad de estudiantes posible y permitiéndoles hallar espacios de recreación, desarrollo personal y profesional mientras interactúan con personas de intereses comunes.
                    </StyledCardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} className="Grid-item">
                  <img className="img-with-margin"  style={{width: '100%'}} src="https://puntodecorte.net/wp-content/uploads/2022/04/Campus-galeria-52.jpg" alt="Imagen 2"/>
                </Grid>
                <Grid item xs={12} sm={6} className="Grid-item">
                  <img className="img-with-margin"  style={{width: '100%'}} src="https://www.unimet.edu.ve/wp-content/uploads/2023/09/sin-titulo-1-2.jpg" alt="Imagen 3"/>
                </Grid>
                <Grid item xs={12} sm={6} className="Grid-item">
                  <Card className='Card3 centered-card'>
                    <StyledCardMedia className='StyledCardMedia'>
                      OBJETIVOS
                    </StyledCardMedia>
                    <StyledCardContent className="StyledCardContent">
                      Implementar una plataforma web dedicada a la gestión y manejo de las agrupaciones de la Universidad Metropolitana, tanto por parte de los estudiantes como de las autoridades encargadas de la gestión de tales agrupaciones en la universidad.
                    </StyledCardContent>
                  </Card>
                </Grid>
              </Grid>
            </div>
          <Grid xs={12}>
            <Card className='ListaAgrupaciones'>
              <CardMedia className="StyledCardMediaAgrupaciones">
                TODAS LAS AGRUPACIONES
              </CardMedia>
              <CardContent>
                <List
                  sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  {agrupaciones.map((agrupacion) => (
                    <ListItemButton
                      key={agrupacion.codigo}
                      component={Link}
                      to={`/agrupacion/${agrupacion.codigo}`}
                      sx={{ display: 'flex', alignItems: 'center' }} // Añade estos estilos
                    >
                      {/* Utiliza Link para manejar la redirección */}
                      <Avatar>{agrupacion.nombre.charAt(0)}</Avatar>
                      <Box sx={{ margin: 'auto' }}> {/* Contenedor adicional para el texto */}
                        <StyledListItemText>{agrupacion.nombre}</StyledListItemText>
                      </Box>
                    </ListItemButton>
                  ))}
                </List>
              </CardContent>

            </Card>
          </Grid>
      </Box>
    
  );
}

