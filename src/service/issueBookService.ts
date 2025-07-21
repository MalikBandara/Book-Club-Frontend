import type { IssueBook } from "../types/IssuBook";
import apiClient from "./apiClient";


type issueBookResponse = {
    message: string;
};


export const issueNewBook = async (lendBook: Omit<IssueBook, "id">) => {
    const response = await apiClient.post("/issueBook", lendBook);
    return response.data;
};

export const getAllIssueBooks = async (): Promise<IssueBook[]> => {
    const response = await apiClient.get("/issueBook");
    return response.data;
};

export const getIssueBookById = async (id: string): Promise<IssueBook> => {
    const response = await apiClient.get(`/issueBook/${id}`);
    return response.data;
};

export const updateIssueBook = async (id: string) => {
    const response = await apiClient.post(`/issueBook/return/${id}`);
    return response.data;
};

export const getOverdueBooks = async () : Promise<IssueBook[]> =>{
   const response =  await apiClient.get("/issueBook/overdue")
   return response.data;

}


export const updateOverdueBookSt = async (id: string): Promise<issueBookResponse> => {
    const response = await apiClient.put(`/issueBook/updateOverdue/${id}`);
    return response.data;
};