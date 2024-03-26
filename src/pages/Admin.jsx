import Header from "../components/Header";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";
import Carousel from "../components/Carousel";
import NavBarAdmin from "../layouts/NavBarAdmin";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import LogoA from "../assets/LOGOADMIN.png";
import Fondo from "../assets/Background.png";

const StyledButton = styled(Button)`
margin-right : 8px; 
background-color: #FDA403;  
&:hover {
  background-color: #222831`






export default function Admin () {

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
            <div img={Fondo}>
                <NavBarAdmin />
                    <Box sx={{ flexGrow: 1 , mt : 2}}>
                        <Grid container spacing={2}>
                            <Grid xs={12} sx={{mt : 2}}>
                                <Item>
                                    <Card sx={{backgroundColor : "#000000" }} >
                                        <CardMedia
                                            image={LogoA}
                                            sx={{ height: 750 , justifyContent: "center", width:"100%", mb:2}}
                                            
                                        />
                                        <CardActions sx={{justifyContent: "center"}}>
                                            <StyledButton>
                                                <Typography sx={{color : "white"}}>
                                                    Empezar
                                                </Typography>
                                            </StyledButton>
                                        </CardActions>

                                    </Card>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
            </div>
        </>
    )
    
}