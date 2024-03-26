import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import ULogo from "../assets/Logo-footer.png";
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(Button)`
margin-right : 8px; 
background-color: #FDA403;  
&:hover {
  background-color: #222831`;

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
    // vertical padding + font size from searchIcon
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
  
  return (
    <AppBar position="static">
      <Toolbar sx={{ backgroundColor: "#FFEDD8" }}>
        <Button variant="text" href="/home">
          <img src={ULogo} alt="my image" />
        </Button>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          href="/about"
        >
          <Typography sx={{ color: "black" }}>Mas informacion</Typography>
          <AddIcon sx={{ color: "black" }} />
        </IconButton>
        <Search sx={{ mr: 2, flexGrow: 1 }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <StyledButton variant="contained" onClick={() => navegar('/login', {replace: true})}>Iniciar Sesion</StyledButton>
        <StyledButton variant="contained" onClick={() => navegar('/register', {replace: true})}>Registrarse</StyledButton>
        <IconButton aria-label="user" sx={{ mr: 2 }}>
          <Link to="/profile" style={{ textDecoration: 'none' }}>
            <Avatar>J</Avatar>
          </Link>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
