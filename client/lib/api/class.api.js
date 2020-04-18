import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getClasses = async () => {
  return await api.get("/classes/");
};

export const getClass = async (id) => {
  return await api.get(`/classes/${id}`);
};
