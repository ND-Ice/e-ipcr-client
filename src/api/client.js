import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://e-ipcr-backend.herokuapp.com/api",
});

export default apiClient;
