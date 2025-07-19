import type { ReaderFormData, Readers } from "../types/Readers";
import apiClient from "./apiClient";

export type CreateReaderResponse = {
    message: string;
};

export const getReader = async (): Promise<Readers[]> => {
    // / readers mean url http://localhost:3000/api/readers end point
    const response = await apiClient.get("/reader");
    return response.data;
};

export const createReader = async (reader: Omit<Readers, "id" | "borrowedBooks">): Promise<CreateReaderResponse> => {
    const response = await apiClient.post("/reader", reader);
    return response.data;
};

export const getReaderById = async (id: string): Promise<Readers> => {
    const response = await apiClient.get(`/reader/${id}`);
    return response.data;
};

export const updateEXReader = async (id: string, reader: ReaderFormData): Promise<CreateReaderResponse> => {
    const response = await apiClient.put(`/reader/${id}`, reader);
    return response.data;
};

export const deleteExReader = async (id: string) => {
    const response = await apiClient.delete(`/reader/${id}`);
    return response.data;
};
