import { useState, useEffect } from 'react';
import { db } from './firebase.js';
import { doc, getDoc, runTransaction } from "firebase/firestore";
import './AgruAfiliado.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useParams } from 'react-router-dom';


function AgruAfiliado() {
    const [montoPagoDirecto, setMontoPagoDirecto] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cedula, setCedula] = useState('');
    const [banco, setBanco] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [numeroTarjetaVisible, setNumeroTarjetaVisible] = useState(false);
    const [pagoDirectoValido, setPagoDirectoValido] = useState(false);
    const [montoPagoPaypal, setMontoPagoPaypal] = useState('');
    const [paypalValido, setPaypalValido] = useState(false);
    const [ganancias, setGanancias] = useState(0);
    const { codigo } = useParams();
    const [año, setAño] = useState(0);
    const [colaboraciones, setColaboraciones] = useState(0);
    const [contacto, setContacto] = useState('');
    const [imagen, setImagen] = useState('');
    const [mision, setMision] = useState('');
    const [nombre, setNombre] = useState('');

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const docRef = doc(db, 'agrupacion', codigo);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const docData = docSnap.data();

                    setAño(docData.año);
                    setColaboraciones(docData.colaboraciones);
                    setContacto(docData.contacto);
                    setImagen(docData.imagen);
                    setMision(docData.mision);
                    setNombre(docData.nombre);
                    setGanancias(docData.colaboraciones); // Actualizar ganancias al valor de colaboraciones al cargar la página
                } else {
                    console.log(`No se encontró una agrupación con el código ${codigo}`);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchClubData();
    }, [codigo]);

    const handleRealizarPagoDirecto = async () => {
        if (telefono && cedula && banco && numeroTarjeta && montoPagoDirecto) {
            const newColaboraciones = parseFloat(montoPagoDirecto.replace(',', '.'));
            const updatedColaboraciones = colaboraciones + newColaboraciones; // Sumar nuevas colaboraciones
            setColaboraciones(updatedColaboraciones); // Actualizar colaboraciones en el estado local
            setGanancias(updatedColaboraciones); // Actualizar ganancias en el estado local

            // Actualizar colaboraciones en la base de datos
            const docRef = doc(db, 'agrupacion', codigo);
            await runTransaction(db, async (transaction) => {
                transaction.update(docRef, { colaboraciones: updatedColaboraciones });
            });

            // Limpiar campos y estados
            setMontoPagoDirecto('');
            setTelefono('');
            setCedula('');
            setBanco('');
            setNumeroTarjeta('');
            setPagoDirectoValido(false);
        }
    };

    const handlePaypalClick = async () => {
        if (montoPagoPaypal) {
            const newColaboraciones = parseFloat(montoPagoPaypal.replace(',', '.'));
            const updatedColaboraciones = colaboraciones + newColaboraciones; // Sumar nuevas colaboraciones
            setColaboraciones(updatedColaboraciones); // Actualizar colaboraciones en el estado local
            setGanancias(updatedColaboraciones); // Actualizar ganancias en el estado local

            // Actualizar colaboraciones en la base de datos
            const docRef = doc(db, 'agrupacion', codigo);
            await runTransaction(db, async (transaction) => {
                transaction.update(docRef, { colaboraciones: updatedColaboraciones });
            });

            // Limpiar campos y estados
            setMontoPagoPaypal('');
            setPaypalValido(false);
            window.location.href = `https://www.paypal.com/paypalme/agrupacionesSI/${montoPagoPaypal.replace(',', '.')}`;
        }
    };

    const handleMontoDirectoChange = (event) => {
        const value = event.target.value.replace(',', '.').replace(/[^0-9.]/g, '');
        setMontoPagoDirecto(value);
        setPagoDirectoValido(telefono && cedula && banco && numeroTarjeta && value);
    };

    const handleMontoPaypalChange = (event) => {
        const value = event.target.value.replace(',', '.').replace(/[^0-9.]/g, '');
        setMontoPagoPaypal(value);
        setPaypalValido(!!value);
    };

    return (
        <div className="AgruAfiliado">
            <div className="background-image">
                <div className="background-blur" style={{ backgroundImage: `url(${imagen})` }}></div>
                <h1>{nombre}</h1>
                <h2>Página de Afiliados</h2>
                <p>{mision}</p>
                <p>Año de fundación: {año}</p>
                <p>Contacto: {contacto}</p>
            </div>
            <div className="top-block">
                <div className="image-section"></div>
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
            <div className="title-container">
                <h2 style={{fontWeight: 'bold'}}>Colaboraciones</h2>
            </div>
            <div className="bottom-container">
                <div className="left-bottom-block">
                    <h2>Pago Directo</h2>
                    <div>
                        <Box component="form" noValidate autoComplete="off">
                            <TextField id="telefono" label="Teléfono" variant="outlined" className="input-field" value={telefono} onChange={(e) => setTelefono(e.target.value.replace(/\D/, '').slice(0, 10))} />
                            <TextField id="cedula" label="Cédula" variant="outlined" className="input-field" value={cedula} onChange={(e) => setCedula(e.target.value.replace(/\D/, '').slice(0, 10))} />
                            <TextField id="banco" label="Banco" variant="outlined" className="input-field" value={banco} onChange={(e) => setBanco(e.target.value)} />
                            <TextField 
                                id="numeroTarjeta" type={numeroTarjetaVisible ? "text" : "password"} label="Número de Tarjeta" variant="outlined" className="input-field" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} inputProps={{ maxLength: 20 }} 
                                InputProps={{ 
                                    endAdornment: (
                                        <div onClick={() => setNumeroTarjetaVisible(prev => !prev)}>
                                            {numeroTarjetaVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </div>
                                    )
                                }} 
                            />

                            <TextField id="montoPagoDirecto" label="Monto del Pago ($)" variant="outlined" className="input-field" value={montoPagoDirecto} onChange={handleMontoDirectoChange} />
                        </Box>
                        <button className={`realizar-pago ${!pagoDirectoValido ? 'disabled' : ''}`} onClick={handleRealizarPagoDirecto} disabled={!pagoDirectoValido}>
                            Realizar Pago Directo
                        </button>
                    </div>
                </div>
                <div className="right-bottom-block">
                    <h2>Pago PayPal</h2>
                    <div>
                        <Box component="form" noValidate autoComplete="off">
                            <TextField id="montoPagoPaypal" label="Monto del Pago PayPal ($)" variant="outlined" className="input-field" value={montoPagoPaypal} onChange={handleMontoPaypalChange} />
                        </Box>
                        <button className={`paypal-button ${!paypalValido ? 'disabled' : ''}`} onClick={handlePaypalClick} disabled={!paypalValido}></button>
                    </div>
                </div>
            </div>
            <div className="ganancias-container">
                <h2>Numero de Colaboraciones</h2>
                <div className="ganancias">
                    Total Recaudado: ${ganancias.toFixed(2).replace('.', ',')}
                </div>
            </div>
        </div>
    );
}

export default AgruAfiliado;
