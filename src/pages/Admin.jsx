import NavBarAdmin from "../layouts/NavBarAdmin";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Fondo from "../assets/fondoAdmin.png";
import { useNavigate } from 'react-router-dom';
import { useUser } from "../user"; 
import { useEffect } from "react";
import { validarAdmin } from "./adminvalidation";

const StyledButton = styled(Button)`
margin-right : 8px; 
background-color: #FDA403;  
&:hover {
  background-color: #222831`

export default function Admin () {
    const navegar = useNavigate();
    const usuario = useUser();
    console.log(usuario)

    useEffect(() => {
        if (!usuario) {
            navegar('/admin', { replace: true });
        } else {
            const email = usuario.email;
            validarAdmin(email).then(esAdmin => {
                if (esAdmin !== true) {
                    navegar('/admin', { replace: true });
                }
            });
        }
    }, [usuario, navegar]);

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        image:{Fondo}
      }));

      return (
        <>
            <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${Fondo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
                <NavBarAdmin/>
                <div>
                    <Box sx={{ flexGrow: 1 , mt : 2}}>
                        <Grid container spacing={2}>
                            <Grid xs={12} sx={{mt : 2}}>
                                <Item sx={{ backgroundColor: "transparent"}}>
                                    <Card sx={{ backgroundColor: "transparent"}}>
                                        <CardActions sx={{ position: 'absolute', bottom: 150, left: 0, right: 0, margin: 0, justifyContent: "center" }}>
                                            <StyledButton onClick={() => navegar('/admin2', {replace: true})} sx={{backgroundColor: 'orange', fontSize: 'large'}}>
                                                <Typography sx={{color : "white", fontSize: '2em', fontWeight: 'bold'}}>
                                                    EMPEZAR
                                                </Typography>
                                            </StyledButton>
                                        </CardActions>
                                    </Card>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Box>
        </>
    )
    
}