import './AgruAfiliado.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


function AgruAfiliado() {
    const handlePaypalClick = () => {
        window.location.href = 'url_de_paypal'; // Reemplaza 'url_de_paypal' con la URL correcta de PayPal
    };

    return (
        <div className="AgruAfiliado">
            <div className="top-block">
                <h1>Agrupación</h1>
                <p>Descripción de la agrupación...</p>
            </div>
            <div className="bottom-container">
                <div className="left-bottom-block">
                    <h2>¿Qué opinas de la agrupación?</h2>
                    <t>Siempre estamos intentando mejorar y tus sugerencias y opiniones son de gran ayuda</t>
                    <div className="comments-section">
                        <div className="username">
                            Nombre de usuario:
                        </div>
                        <div className="comment">
                            <Box
                                component="form"
                                noValidate
                                autoComplete="off"
                            >
                                <TextField id="outlined-basic" label="Comentario" variant="outlined" className="comment-field" multiline rowsMax={4}/>
                            </Box>
                        </div>
                        <div className="rating">
                            PUNTUACIÓN: 
                            <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={2} />
                            </Stack>
                        </div>
                    </div>
                </div>
                <div className="right-bottom-block">
                    <h2>Colaboraciones</h2>
                    <p>Explicación de por qué se necesitan colaboraciones en la agrupación.</p>
                    <button className="paypal-button" onClick={handlePaypalClick}></button>
                </div>
            </div>
        </div>
    );
}

export default AgruAfiliado;
