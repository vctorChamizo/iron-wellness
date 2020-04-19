import axios from "axios";
import _ from "lodash";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getUsersByType = async (type) =>
  await api.get(`users/type?type=${type}`);

export const getUser = async (id) => await api.get(`users/${id}`);

export const addUser = async (user) => await api.create(`users/`, { user });

export const editUser = async (user) =>
  await api.put(`users/${user._id}`, { user });

export const removeUser = async (id) => await api.delete(`users/${id}`);

export const upload = async (file) => {
  const data = new FormData();
  data.append("profileImage", file);
  return await api.post("/users/upload", data);
};
