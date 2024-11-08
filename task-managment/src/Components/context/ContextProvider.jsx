import React, { createContext, useContext, useState } from "react";

const authContext = createContext();

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <authContext.Provider value={{ user, login, logout }}>
            {children}
        </authContext.Provider>
    );
};

export const useAuth = () => useContext(authContext);

export default ContextProvider;
