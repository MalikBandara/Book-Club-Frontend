// src/context/AuthProvider.tsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { setHeader } from "../service/apiClient";

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string>("");

    const login = (token: string) => {
        setAccessToken(token);
        setIsLoggedIn(true);
        localStorage.setItem("accessToken", token);
    };

    const logout = () => {
        setAccessToken("");
        setIsLoggedIn(false);
        localStorage.removeItem("accessToken");
        setHeader(""); // clear token from axios
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("accessToken");
        if (storedToken) {
            login(storedToken);
        }
    }, []);

    useEffect(() => {
        setHeader(accessToken);
    }, [accessToken]);

    return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};
