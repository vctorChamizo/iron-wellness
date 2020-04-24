import axios from "axios";
import _ from "lodash";

const api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

export const signup = async (user) => await api.post("/auth/signup", { user });

export const login = async (username, password) =>
  await api.post("/auth/login", {
    username,
    password,
  });

export const socialLogin = async () => await api.get("/auth/google");

export const loggedin = async () => {
  const result = await api.get("/auth/loggedin");
  return result.status === 204 ? null : result.data;
};

export const logout = async () => await api.get("/auth/logout");
