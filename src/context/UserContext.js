import React, { createContext, useState, useContext } from 'react';

// Create the context for user data (email in this case)
const UserContext = createContext();

// Custom hook to access the context data
export const useUser = () => useContext(UserContext);

// Provider component that wraps the app and provides the global state
export const UserProvider = ({ children }) => {
    const [email, setEmail] = useState('');  // Email state

    return (
        <UserContext.Provider value={{ email, setEmail }}>
            {children}
        </UserContext.Provider>
    );
};
