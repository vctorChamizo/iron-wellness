import axios from "axios";
import _ from "lodash";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getActivities = async () => await api.get(`activities/`);

export const addActivity = async (activity) =>
  await api.post(`activities/create`, { activity });

export const removeActivity = async (id) =>
  await api.delete(`activities/${id}`);
