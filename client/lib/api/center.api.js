import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getCenters = async () => {
  return await api.get("/centers/");
};

export const getCenter = async (id) => await api.get(`center/${id}`);

export const addCenter = async (center) => {
  const data = new FormData();
  data.append("centerImage", center.avatar[0]);
  return await api.post("/centers/create", { data, center });
};

export const editCenter = async (center) =>
  await api.put(`center/${center._id}`, { center });

export const removeCenter = async (id) => await api.delete(`Center/${id}`);
