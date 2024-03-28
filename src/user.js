import { createContext, useContext } from "react";

/** @type {React.Context.<import('firebase/auth').User | null>} */

export const UserContext = createContext(undefined);

export function useUser(){
    const usuario = useContext(UserContext);
    return usuario;
}