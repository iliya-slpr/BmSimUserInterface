import axios from "axios";
import { baseUrl } from "./Constants";
const axiosInstance = axios.create({
	baseURL: `${baseUrl}/simulations/`,
});


export default axiosInstance;