import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Background from "../assets/Background.png";
import Logo from "../assets/ladingPage.jpg";
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
const StyledCard = styled(Card)`
max-width: 100% ; 
height: 600px; 
background-color : #F4EDCC; 
padding : 2px; margin : 2px; 
border-widht: 2px; 
border-style : solid; 
border-color : black;
`
const StyledButton = styled(Button)`
  margin-right: 8px; 
  background-color: #FDA403;  
  &:hover {
    background-color: #222831;
  }
`;



export default function HomeCard() {

    const navegar = useNavigate();

    return(
        <StyledCard>
        <CardMedia
      sx={{ height: 550}}
      image={Logo}
            />
        <CardActions sx={{justifyContent : "center"}}>
                <StyledButton  
                variant="contained" 
                size="big"
                onClick={() => navegar('/about')}
                >Conoce mas</StyledButton>
        </CardActions>

        </StyledCard>
    )
}