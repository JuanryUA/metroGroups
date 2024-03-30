import './Agrupacion.css';
import { useState, useRef, useEffect } from 'react'; 
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { db } from './firebase.js';
import { collection, getDocs, doc, updateDoc, arrayUnion, getDoc} from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';

function Agrupacion() {
    const [clubName, setClubName] = useState('');
    const [clubMision, setClubMision] = useState('');
    const [clubVision, setClubVision] = useState('');
    const [clubObjetivos, setClubObjetivos] = useState('');
    const [clubClasificacion, setClubClasificacion] = useState('');
    const [clubImagen, setClubImagen] = useState('');
    const [open, setOpen] = useState(false);
    const [isAffiliated, setIsAffiliated] = useState(false);
    const anchorRef = useRef(null);
    const { codigo } = useParams();
    const navigate = useNavigate();
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [isMember, setIsMember] = useState(false);

    const handleClick = async () => {
        try {
            const userRef = doc(db, 'usuarios', user.uid);
            await updateDoc(userRef, {
                Agrupaciones: arrayUnion(codigo)
            });
            setIsAffiliated(true);
            setIsMember(true); // Actualiza el estado isMember después de unirse a la agrupación
            setOpen(true);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const fetchUserGroups = async () => {
            const userRef = doc(db, 'usuarios', user.uid);
            const userSnap = await getDoc(userRef);
    
            if (userSnap.exists()) {
                const userData = userSnap.data();
                setIsMember(userData.Agrupaciones.includes(codigo));
            }
        };
    
        fetchUserGroups();
    }, [user, codigo]);

    useEffect(() => {
        const fetchClubData = async () => {
            try {
                const colRef = collection(db, 'agrupacion');
                const snapshot = await getDocs(colRef);
                if (!snapshot.empty) {
                    const doc = snapshot.docs.find(doc => doc.id === codigo);
                    if (doc) {
                        const docData = doc.data();

                        const nombre = docData.nombre;
                        const mision = docData.mision;
                        const vision = docData.vision;
                        const objetivos = docData.objetivos;
                        const clasificacion = docData.clasificacion;
                        const imagen = docData.imagen;

                        setClubName(nombre);
                        setClubMision(mision);
                        setClubVision(vision);
                        setClubObjetivos(objetivos);
                        setClubClasificacion(clasificacion);
                        setClubImagen(imagen);
                    } else {
                        console.log(`No se encontró una agrupación con el código ${codigo}`);
                    }
                } else {
                    console.log("No hay documentos en la colección 'agrupacion'");
                }
            } catch (error) {
                console.log(error.message);
            }
        };
    
        fetchClubData();
    }, [codigo]);

    return (
        <div className="container">
            <div className="content-block">
                <div className="left-block">
                    <h1>{clubName}</h1>
                    <div className="classification">{clubClasificacion}</div>
                    <div className="centered-content">
                        <div className="additional-info">
                            <div className="info-block orange-background">
                                <h3>Visión</h3>
                                <p>{clubVision}</p>
                            </div>
                            <div className="info-block orange-background">
                                <h3>Misión</h3>
                                <p>{clubMision}</p>
                            </div>
                            <div className="info-block orange-background">
                                <h3>Objetivos</h3>
                                <p>{clubObjetivos}</p>
                            </div>
                        </div>
                    </div>
                    <div className="orange-button">
                    <Button ref={anchorRef} className="orange-button" onClick={isMember ? () => navigate(`/afiliado/${codigo}`) : handleClick}>
                        {isMember ? 'Ir a la Página de Afiliados de la agrupación' : 'Unirse'}
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
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p className="name">Usuario 1</p>
                                <p className="rating">
                                    <Stack spacing={1}>
                                        <Rating name="size-medium" defaultValue={2} />
                                    </Stack>
                                </p>
                            </div>
                            <div>
                                <p>Excelente trabajo, ¡sigue así!</p>
                            </div>
                        </div>
                        <div className="user-comment">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p className="name">Usuario 2</p>
                                <p className="rating">
                                    <Stack spacing={1}>
                                        <Rating name="size-medium" defaultValue={2} />
                                    </Stack>
                                </p>
                            </div>
                            <div>
                                <p>Buen esfuerzo, ¡pero aún hay margen de mejora!</p>
                            </div>
                        </div>
                    </div>
                    <img className="image" src={clubImagen} alt="Imagen" />
                </div>
            </div>
        </div>
    );
}

export default Agrupacion;

