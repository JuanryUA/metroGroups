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


        <Toolbar sx={{ mt : 4, backgroundColor: "#FFC374"}}>
            <Box flexGrow={1}>
                Copyright 2024 - Universidad Metropolitana 
                Todos los derechos reservados
            </Box>
          <IconButton aria-label='user' sx={{mr : 2}}>
                <Avatar>X</Avatar>
            </IconButton>
            <IconButton aria-label='user' sx={{mr : 2}}>
                <Avatar>I</Avatar>
            </IconButton>
            <IconButton aria-label='user' sx={{mr : 2}}>
                <Avatar>F</Avatar>
            </IconButton>


        </Toolbar>

  );
}