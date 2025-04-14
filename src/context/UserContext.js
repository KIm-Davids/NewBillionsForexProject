// src/context/UserContext.tsx (or .js)
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState('');

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
