import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import ULogo from "../assets/Group 64.png";
import { Deslogearse } from '../pages/auth';
import { useNavigate } from 'react-router-dom';




const StyledButton = styled(Button)`
margin-right : 8px; 
background-color: #FDA403;  
&:hover {
  background-color: #222831`





export default function SearchAppBar() {
  const navegar = useNavigate();

  const handleCerrarSesion = async () => {
    try {
      await Deslogearse();
      navegar('/login', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (

      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "#000000"}}>
 
          <Button
            variant='text'
            href='/admin'
          >
            <img src={ULogo} alt="my image"  />
            </Button>
          <Typography sx={{ flexGrow: 1 }} />
          <StyledButton variant='contained' onClick={handleCerrarSesion}>
              Cerrar Sesion
          </StyledButton>
        </Toolbar>
      </AppBar>

  );
}
