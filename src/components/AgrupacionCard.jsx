import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from "../assets/avatar.png";

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

export default function AgrupacionCard({nombre, descripcion, imagen}) {

  const testIMG = imagen

    return(
        <StyledCard>
        <CardMedia
      sx={{ height: 425 }}
      image={testIMG}
    >

    </CardMedia>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {nombre}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {descripcion}
      </Typography>
    </CardContent>
    <CardActions>
      <StyledButton variant="contained" size="big">Conoce mas</StyledButton>
    </CardActions>
          </StyledCard>
    )
}