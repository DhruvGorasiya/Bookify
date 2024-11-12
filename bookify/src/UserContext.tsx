import { createContext, useEffect, useState } from "react";
import axios from "axios";
type User = {
  role: string;
  email: string;
  _id: string;
  password: string;
  name: string;
};

type userContextType = {
  user: User | null;
  setUser: (user: any) => void;
};

export const UserContext = createContext<userContextType>({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({data}) => {
        setUser(data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
