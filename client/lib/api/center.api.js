import axios from "axios";

const api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

export const getCenters = async () => await api.get("/centers/");
