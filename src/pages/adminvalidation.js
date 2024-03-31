import { db } from "./firebase";
import { getDocs, collection, query, where } from "@firebase/firestore";

export async function validarAdmin(email) {
    try {
        const q = query(collection(db, 'usuarios'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            return userData.Administrador === true;
        } else {
            return false;
        }
    } catch (e) {
        console.error('Error al validar el administrador:', e);
        return false;
    }
}