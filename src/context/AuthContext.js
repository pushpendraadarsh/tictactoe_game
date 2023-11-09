import React, { createContext, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
export const base_url = process.env.REACT_APP_API_URL;
export const app_url = process.env.REACT_APP_APP_URL;
export const socketurl = process.env.REACT_APP_SOCKET_URL;
export const AuthProvider = ({ children }) => {
    const loginstatus = localStorage.getItem('login');
    const [isAuthenticated, setIsAuthenticated] = useState(loginstatus && loginstatus !== '' ? true : false);
    const login = (data, callback) => {
        // axios.post(base_url + 'api/login', data)
        //     .then(response => {
        //         if (response.data.error === true) {
        //         } else {
        //             localStorage.setItem('login', response.data.username);
        //             setIsAuthenticated(true);
        // callback(response.data);
        //         }
        //     }).catch(error => {
            //         console.error('Error fetching data:', error);
            //     });
            localStorage.setItem('login', data.id);
            setIsAuthenticated(true);
            callback(data.id);
    };
    const addbets = (data, callbacks,callbacke) => {
        axios.post(base_url + 'api/addbet', data)
            .then(response => {
                callbacks(response.data);
            }).catch(error => {
                callbacke();
                console.error('Error fetching data:', error);
            });
    };
    
    const logout = () => {
        localStorage.removeItem('login');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ socketurl,isAuthenticated,loginstatus,app_url, login,addbets, logout }}>
            {children}
        </AuthContext.Provider>
    );
};