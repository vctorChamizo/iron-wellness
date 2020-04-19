import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getClasses = async () => await api.get("/classes/");

export const getClass = async (id) => await api.get(`/classes/${id}`);

export const addClass = async (_class) =>
  await api.create(`class/`, { _class });

export const editClass = async (_class) =>
  await api.put(`class/${_class._id}`, { _class });

export const removeClass = async (id) => await api.delete(`class/${id}`);
