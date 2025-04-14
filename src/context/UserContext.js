import React, { createContext, useState, useContext } from 'react';

// Create the context for user data (email in this case)
const UserContext = createContext();

// Custom hook to access the context data
export const useUser = () => useContext(UserContext);

// Provider component that wraps the app and provides the global state
export const UserProvider = ({ children }) => {
    console.log("✅ UserProvider is wrapping children!");
    const [userEmail, setUserEmail] = useState('');  // Email state

    return (
        <UserContext.Provider value={{ userEmail, setUserEmail }}>
            {children}
        </UserContext.Provider>
    );
};
