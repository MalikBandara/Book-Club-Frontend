import type { Users } from "../types/Users";
import apiClient from "./apiClient";

type UserResponse = {
    message: string;
};

export const createUser = async (user: Omit<Users, "id">): Promise<UserResponse> => {
    const response = await apiClient.post("/auth/signup", user);
    return response.data;
};
