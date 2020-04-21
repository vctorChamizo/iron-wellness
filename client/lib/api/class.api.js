import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getClasses = async () => await api.get("/classes/");

export const getClass = async (id) => await api.get(`/classes/${id}`);

export const addClass = async (_class) =>
  await api.post(`classes/create`, { _class });

export const removeClass = async (id) => await api.delete(`classes/${id}`);
