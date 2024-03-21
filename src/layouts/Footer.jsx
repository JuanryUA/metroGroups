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




import ULogo from "../assets/Logo-footer.png";



export default function Footer() {
  return (

      <AppBar position="static">
        <Toolbar >
 
          <Button
            variant='text'
          >
            <img src={ULogo} alt="my image"  /></Button>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >mas informacion
            <AddIcon />
          </IconButton>

            <Button variant='contained' sx={{mr : 2}}>
                Iniciar Sesion
            </Button>
            <Button variant='contained' sx={{mr : 2}}>
                Registrarse
            </Button>
            <IconButton aria-label='user' sx={{mr : 2}}>
                <Avatar>J</Avatar>
            </IconButton>


        </Toolbar>
      </AppBar>

  );
}