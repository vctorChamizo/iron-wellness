import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getCenters = async () => {
  return await api.get("/centers/");
};

export const getCenter = async (id) => await api.get(`center/${id}`);

export const addCenter = async (center) =>
  await api.create(`center/`, { center });

export const editCenter = async (center) =>
  await api.put(`center/${center._id}`, { center });

export const removeCenter = async (id) => await api.delete(`Center/${id}`);
