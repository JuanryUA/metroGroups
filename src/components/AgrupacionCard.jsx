import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from "../assets/avatar.png";
import { styled } from '@mui/material/styles';
const StyledCard = styled(Card)`
max-width: 100% ; height: 600px; background-color : #F4EDCC; padding : 2px; margin : 2px; border-widht: 2px; border-style : solid; border-color : black;`


export default function AgrupacionCard({nombre, descripcion}) {

    

    return(
        <StyledCard>
        <CardMedia
      sx={{ height: 300 }}
      image={Avatar}
      title="Avatar"
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {nombre}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {descripcion}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Conoce mas</Button>
    </CardActions>
          </StyledCard>
    )
}