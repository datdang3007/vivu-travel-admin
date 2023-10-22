import axios from "axios";
import { PROCESS_ENV } from "src/constants/env";

const baseURL = PROCESS_ENV.BE_API_URL;
const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
