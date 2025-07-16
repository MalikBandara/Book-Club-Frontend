import type { Readers } from "../types/Readers";
import apiClient from "./apiClient";

export const getReader = async (): Promise<Readers[]> => {
  const response = await apiClient.get("/reader");
  return response.data;
};

export const createReader = async (reader: Omit<Readers, "id" | "borrowedBooks">): Promise<Readers> => {
  const response = await apiClient.post("/reader", reader);
  return response.data;
};


