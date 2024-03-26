import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import ULogo from "../assets/Logo-footer.png";

export const agrupaciones = [
  { nombre: "alejo", descripcion: "no saluda1" },
  { nombre: "bubin", descripcion: "no saluda2" },
  { nombre: "reaper", descripcion: "no saluda3" },
  { nombre: "uco", descripcion: "no saluda4" },
  { nombre: "doc", descripcion: "no saluda5" },
  { nombre: "test", descripcion: "no saluda6" }
];

const StyledButton = styled(Button)`
  margin-right: 8px; 
  background-color: #FDA403;  
  &:hover {
    background-color: #222831;
  }
`;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.10),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  color: "black"
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: "black"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    let found = false;

    for (const agrupacion of agrupaciones) {
      if (
        agrupacion.nombre.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
        agrupacion.descripcion.toLowerCase().includes(searchTerm.trim().toLowerCase())
      ) {
        found = true;
        break; 
      }
    }

    if (found) {
      alert('Si existe la agrupacion');
    } else {
      alert('No existe');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "#FFEDD8" }}>
        <Button variant='text' href='/home'>
          <img src={ULogo} alt="my image" />
        </Button>
        <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }} href='/about'>
          <Typography sx={{ color: "black" }}>
            Mas informacion
          </Typography>
          <AddIcon sx={{ color: "black" }} />
        </IconButton>
        <Search sx={{ mr: 2, flexGrow: 1 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search', onKeyDown: handleKeyPress }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Search>
        <StyledButton variant='contained'>Iniciar Sesion</StyledButton>
        <StyledButton variant='contained'>Registrarse</StyledButton>
        <IconButton aria-label='user' sx={{ mr: 2 }}>
          <Avatar>J</Avatar>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
