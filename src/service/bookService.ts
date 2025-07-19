import type { BookFormData, Books, BooksForSave } from "../types/Books";
import apiClient from "./apiClient";

// this use for the response
type CreateBookResponse = {
    message: string;
};

// Promise<Books[]>; return data as book array
export const getBook = async (): Promise<Books[]> => {
    const response = await apiClient.get("/book");
    return response.data;
};
//use for response
export const createBook = async (book: Omit<BooksForSave, "id">): Promise<CreateBookResponse> => {
    const response = await apiClient.post("/book", book);
    return response.data;
};

export const deleteExistingBook = async (id: string): Promise<CreateBookResponse> => {
    const response = await apiClient.delete(`/book/${id}`);
    return response.data;
};

export const getBookById = async (id: string): Promise<Books> => {
    const resp = await apiClient.get(`/book/${id}`);
    return resp.data;
};

export const updateExistingBook = async (id: string, book: BookFormData): Promise<CreateBookResponse> => {
    const response =  await apiClient.put(`/book/${id}`, book);
    return response.data
};
