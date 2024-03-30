import { db } from "./firebase";
import { getDocs, collection } from "@firebase/firestore";

export async function getGroupsArray(){
    const agrupaciones = [];
    const clubsSnapshot = await getDocs(collection(db, "agrupacion"));          // Esta funcion jala los dato del Firebase para el carrusel
    clubsSnapshot.forEach(item => {
        agrupaciones.push({
            key: item.id,
            value: item.data(),
        })
    })
    
    return agrupaciones
}