import { createContext, useState } from 'react';

type User = {
    role: string;
    email: string;
    _id: string;
    password: string;
    name: string;
}

type userContextType = {
    user: User | null;
    setUser: (user: any) => void;
}

export const UserContext = createContext<userContextType>({user: null, setUser: () => {}});

export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
} 