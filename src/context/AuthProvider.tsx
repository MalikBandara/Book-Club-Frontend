// src/context/AuthProvider.tsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { setHeader } from "../service/apiClient";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);

    const login = (token: string) => {
        setAccessToken(token);
        setIsLoggedIn(true);
        localStorage.setItem("accessToken", token);
    };

    const logout = () => {
        setAccessToken("");
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
        setHeader("");
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            login(storedToken);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        setHeader(accessToken);
    }, [accessToken]);

    if (loading) {
        // show a loader or empty div until auth state ready
        return <div>Loading...</div>;
    }

    return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

