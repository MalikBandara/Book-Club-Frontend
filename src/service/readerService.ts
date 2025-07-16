import type { ReaderFormData, Readers } from "../types/Readers";
import apiClient from "./apiClient";

export const getReader = async (): Promise<Readers[]> => {
  const response = await apiClient.get("/reader");
  return response.data;
};

export const createReader = async (
  reader: Omit<Readers, "id" | "borrowedBooks">
): Promise<Readers> => {
  const response = await apiClient.post("/reader", reader);
  return response.data;
};

export const getReaderById = async (id: string): Promise<Readers> => {
  const response = await apiClient.get(`/reader/${id}`);
  return response.data;
};

export const updateEXReader = async (
  id: string,
  reader: ReaderFormData
): Promise<Readers> => {
  const response = await apiClient.put(`/reader/${id}`, reader);
  return response.data;
};
