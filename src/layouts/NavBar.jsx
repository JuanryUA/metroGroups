import React, { useState, useEffect } from 'react';
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
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../user';
import { Deslogearse } from '../pages/auth';
import { getGroupsArray } from '../pages/groups';

const StyledButton = styled(Button)`
  margin-right: 8px; 
  background-color: #FDA403;  
  &:hover {
    background-color: #222831;
  }
`;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 1),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
  color: "black",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const navegar = useNavigate();
  const usuario = useUser();
  const [usuarioLogueado, setUsuarioLogueado] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() =>{
    if (usuario) {
      setUsuarioLogueado(true);
    }
  }, [usuario, navegar]);

  const handleCerrarSesion = async () => {
    try {
      await Deslogearse();
      setUsuarioLogueado(false);
      navegar('/login', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    let found = false;

    const agrupaciones = await getGroupsArray();

    for (const agrupacion of agrupaciones) {
      const nombre = agrupacion.value.nombre?.toLowerCase();
      const descripcion = agrupacion.value.descripcion?.toLowerCase();
  
      if (
        (nombre && nombre.includes(searchTerm.trim().toLowerCase())) ||
        (descripcion && descripcion.includes(searchTerm.trim().toLowerCase()))
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
        {usuarioLogueado ? (
        <StyledButton variant="contained" onClick={handleCerrarSesion}>Cerrar Sesión</StyledButton>
      ) : (
        <div>
          <StyledButton variant="contained" onClick={() => navegar('/login', {replace: true})}>Iniciar Sesión</StyledButton>
          <StyledButton variant="contained" onClick={() => navegar('/register', {replace: true})}>Registrarse</StyledButton>
        </div>
      )}
        <IconButton aria-label="user" sx={{ mr: 2 }}>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Avatar>J</Avatar>
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
