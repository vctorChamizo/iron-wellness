import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getCenters = async () => {
  return await api.get("/centers/");
};
