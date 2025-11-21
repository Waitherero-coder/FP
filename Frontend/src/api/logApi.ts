import axios from "axios";

const API_URL = "http://localhost:5000/api/logs";

// Create a new symptom log
export const createLog = (data: any) => axios.post(API_URL, data);

// Get logs for a specific user
export const getLogs = (userId: string) =>
  axios.get(`${API_URL}/${userId}`);

// Update log
export const updateLog = (logId: string, data: any) =>
  axios.put(`${API_URL}/${logId}`, data);

// Delete log
export const deleteLog = (logId: string) =>
  axios.delete(`${API_URL}/${logId}`);
