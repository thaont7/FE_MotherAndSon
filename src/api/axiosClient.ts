import axios from "axios";
const axiosClient = axios.create({ baseURL:"https://jsonplaceholder.typicode.com" });
axiosClient.interceptors.response.use(res=>res.data);
export default axiosClient;
