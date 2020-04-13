import axios from "axios";
import _ from "lodash";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const upload = async (file) => await api.post("/users/upload", { file });

export const edit = async (user) =>
  await api.put(`users/${user._id}`, { user });
