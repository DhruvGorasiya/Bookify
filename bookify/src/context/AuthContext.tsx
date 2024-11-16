import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";
import { User } from "firebase/auth";

type AuthContextType = {
    user: User | null;
    ready: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, ready: false });

export function AuthProvider({children} : {children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const subscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setReady(true);
        });
        return () => subscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, ready }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}