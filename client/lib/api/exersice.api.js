import axios from "axios";

const api = axios.create({
  baseURL: process.env.LOCAL_URL,
  withCredentials: true,
});

export const getExersices = async () => await api.get("/exersices/");
