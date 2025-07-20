// src/services/authService.ts
import apiClient from "./apiClient";

export type LoginData = {
    email: string;
    password: string;
};
export type AuthResponse = {
    accessToken: string;
    user: {
        _id: string;
        name: string;
        email: string;
    };
};

export const loginUser = async (payload: LoginData): Promise<AuthResponse> => {
    const res = await apiClient.post("/auth/login", payload);
    return res.data; // should contain accessToken
};

// Optionally, add a logout function (for FE only)
export const logout = () => {
    // Remove token from storage (if used)
    localStorage.removeItem("token");
};
