import Header from "../components/Header";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Card, CardActions, CardContent, CardMedia } from "@mui/material";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Avatar from '@mui/material/Avatar';
import { Link } from "react-router-dom";
import { StyledButtonGroup } from "@mui/joy/ButtonGroup/ButtonGroup";

const StyledListItemText = styled('div')`
  text-align: center;
`;

const StyledCardMedia = styled(CardMedia)`
  text-align: center;
`;

const StyledCardContent = styled(CardContent)`
  justify-content: center;
  height: 140px;
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
];

export default function About() {
  const handleAgrupacionClick = (codigo) => {
    // Redirige a la página de Agrupación con el código correspondiente
    console.log(`Redirigiendo a la agrupación con código: ${codigo}`);
  };

  return (
    
     
    <Box sx={{ flexGrow: 1 , mt : 2}}>
      
      <Grid container spacing={2}>
        <Grid xs={4}>
       

            <Card>
                <StyledCardMedia>
                    MISION
                </StyledCardMedia>
                <StyledCardContent>
                Aportar a los estudiantes de la Universidad Metropolitana una plataforma en línea con acceso a las distintas agrupaciones que conforman a la universidad, siendo un espacio virtual del tipo “red social” que les permitirá tanto unirse a cualquier agrupación de su gusto como también compartir información entre ellos de sus experiencias y vivencias, de ésta forma podrán aportar un valor agregado al espacio de las agrupaciones dentro de la universidad. 
                </StyledCardContent>
            </Card>

        </Grid>
        <Grid xs={4}>
          
            <Card>
                <StyledCardMedia>
                    VISION
                </StyledCardMedia>
                <StyledCardContent>
                Convertir Metro Groups en la plataforma principal que dé voz y vista a las distintas agrupaciones de la Universidad Metropolitana, llegando así a la mayor cantidad de estudiantes posible y permitiéndoles hallar espacios de recreación, desarrollo personal y profesional mientras interactúan con personas de intereses comunes.
                </StyledCardContent>
            </Card>
          
        </Grid>
        <Grid xs={4}>
          
            <Card>
                <StyledCardMedia>
                    OBJETIVOS
                </StyledCardMedia>
                <StyledCardContent>
                 Implementar una plataforma web dedicada a la gestión y manejo de las agrupaciones de la Universidad Metropolitana, tanto por parte de los estudiantes como de las autoridades encargadas de la gestión de tales agrupaciones en la universidad.

                </StyledCardContent>
            </Card>
          
        </Grid>
        <Grid xs={12}>
          
            <Card>
                <StyledCardMedia>
                    TODAS LA AGRUPACIONES
                </StyledCardMedia>
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
                <CardActions>
                    <Button size="big" sx={{width: '100%'}}>CREAR AGRUGPACION</Button>
                </CardActions>
            </Card>
     
        </Grid>
      </Grid>

    </Box>

  
  );
}

