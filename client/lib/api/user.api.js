import axios from "axios";
import _ from "lodash";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const upload = async (file) => {
  const data = new FormData();
  data.append("profileImage", file);
  return await api.post("/users/upload", data);
};

export const edit = async (user) =>
  await api.put(`users/${user._id}`, { user });
