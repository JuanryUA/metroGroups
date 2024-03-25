import './Agrupacion.css';
import { useState, useRef } from 'react'; 
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

function Agrupacion() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className="container">
            <div className="left-block">
            <h1>
                Información de la agrupación universitaria
            </h1>
            <div className="classification">Clasificación de la Agrupación</div>
                <div className="centered-content">
                    <div className="additional-info">
                        <div className="info-block orange-background">
                            <h3>Propósito</h3>
                            <p>Descripción del propósito de la agrupación.</p>
                        </div>
                        <div className="info-block orange-background">
                            <h3>Misión</h3>
                            <p>Descripción de la misión de la agrupación.</p>
                        </div>
                        <div className="info-block orange-background">
                            <h3>Objetivos</h3>
                            <p>Lista de objetivos de la agrupación.</p>
                        </div>
                    </div>
                </div>
                <div className="orange-button">
                    <Button ref={anchorRef} className="orange-button" onClick={handleClick}>
                        Unirse
                    </Button>
                    <Popover
                        open={open}
                        anchorEl={anchorRef.current}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        ¡Usted se ha Afiliado!
                    </Popover>
                </div>
            </div>
            <div className="right-block">
                <div className="comments">
                    <h3>Comentarios de Miembros</h3>
                    <div className="user-comment">
                        <p className="name">Usuario 1</p>
                        <p className="rating">
                            <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={2} />
                            </Stack>
                        </p>
                        <p>Excelente trabajo, ¡sigue así!</p>
                    </div>
                    <div className="user-comment">
                        <p className="name">Usuario 2</p>
                        <p className="rating">
                            <Stack spacing={1}>
                                <Rating name="size-medium" defaultValue={2} />
                            </Stack>
                        </p>
                        <p>Buen esfuerzo, ¡pero aún hay margen de mejora!</p>
                    </div>
                </div>
                <img className="image" src="https://via.placeholder.com/800x400" alt="Imagen" />
            </div>
        </div>
    );
}

export default Agrupacion;





