import React, { createContext, useState, useEffect } from 'react';

// Create a context for the user
const UserContext = createContext();

// Create a provider component
const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check if there is a logged-in user in local storage when the component mounts
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (loggedInUser) {
            setUser(loggedInUser);
        }
    }, []);

    // Function to log in the user
    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        // Provide the user, login, and logout functions to the rest of the app
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserProvider, UserContext };
