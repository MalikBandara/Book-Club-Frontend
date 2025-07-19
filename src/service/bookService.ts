import type { Books, BooksForSave } from "../types/Books";
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
