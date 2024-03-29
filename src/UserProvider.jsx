import { auth } from "./pages/firebase";
import { UserContext } from "./user"
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";


export default function UserProvider({children}){
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        });
      }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}