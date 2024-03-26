//funciones de autenticacion de login y register

import { auth, db } from './firebase';
import { doc, query, where, getDocs, setDoc, collection } from 'firebase/firestore';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

export async function Logearse(email, password) {
    try{
        const {user} = await signInWithEmailAndPassword(auth, email, password);
        console.log(user)
        return user;
    } catch (e) {
        return null;
    }
}

export async function validarInicioSesion(email) {
    try {
        const q = query(collection(db, 'usuarios'), where('email', '==', email));
        console.log(q)
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false;
    }
}

export async function LogearseConGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      return user;
    } catch (e) {
      return null;
    }
  }

  export async function Registro(nombrecompleto, email, telefono, contraseña) {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, contraseña);
        const Agrupaciones = [];
        const Administrador = false;
        await setDoc(doc(db, "usuarios", user.uid), {
            nombrecompleto,
            telefono,
            email,
            Agrupaciones,
            Administrador,
        });
        return user;
    } catch (e) {
        console.error(e)
        return null;
    }
  }

export async function Deslogearse(){
    await signOut(auth);
}