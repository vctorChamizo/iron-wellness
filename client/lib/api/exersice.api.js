import axios from "axios";
import _ from "lodash";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getExersices = async (type) => await api.get(`exersice/`);

export const getExersice = async (id) => await api.get(`exersice/${id}`);

export const addExersice = async (exersice) =>
  await api.create(`exersice/`, { exersice });

export const editExersice = async (exersice) =>
  await api.put(`exersice/${exersice._id}`, { exersice });

export const removeExersice = async (id) => await api.delete(`exersice/${id}`);
