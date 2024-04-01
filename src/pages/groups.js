import { db } from "./firebase";
import { getDocs, collection, addDoc, getDoc, deleteDoc, doc } from "@firebase/firestore";

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

export async function getGroupsNames(){
    const nombres_agrupaciones = [];
    const clubsSnapshot = await getDocs(collection(db, "agrupacion"));          // Esta función devuelve un array con los nombres de las agrupaciones
    clubsSnapshot.forEach(item => {
        nombres_agrupaciones.push(item.data().nombre)
    })
    
    return nombres_agrupaciones
}

export async function findGroup(groupName){
    const groupsArray = getGroupsArray();
    let groupId = null;
    for (let index = 0; index < groupsArray.length; index++) {
        const objeto = groupsArray[index];                                  // Esta función retorna la key de una agrupación si le pasas
        if (objeto.value.nombre === groupName) {                            // un nombre por parámetro. Si no la encuentra, devuelve null
            groupId = objeto.key;
        }
    }
    return groupId;
}

export async function getGroup(groupId){
    const groupCollection = collection(db,"agrupacion");
    const groupDoc = await getDoc(groupCollection, groupId);                // Esta función devuelve una agrupación si le das su key
    const group = groupDoc.data();
    return group;
}

export async function deleteGroupByKey(groupKey) {
    try {
        const groupRef = doc(db, 'agrupacion', groupKey);
        const groupDoc = await getDoc(groupRef);
        
        if (!groupDoc.exists()) {
            alert("La agrupación no existe.");
            return;
        }

        const miembros = groupDoc.data().miembros || [];                            // Eliminar agrupación si está vacía a través de su key

        if (miembros.length === 0) {
            await deleteDoc(groupRef);
            alert("Agrupación eliminada satisfactoriamente.");
        } else {
            alert("Eliminación interrumpida. La agrupación tiene integrantes.");
        }
    } catch (error) {
        alert("Error al eliminar la agrupación. Detalles del error en consola.");
        console.error('Error al eliminar la agrupación:', error);
        throw error;
    }
}