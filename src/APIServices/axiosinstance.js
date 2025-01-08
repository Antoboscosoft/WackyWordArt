import axios from "axios";

const base_url= "http://172.105.54.28:8000/freeai";
// const base_url = "https://m4rh4wg8-8000.inc1.devtunnels.ms/freeai"
const localbase_urlprev = "https://m4rh4wg8-8000.inc1.devtunnels.ms";
const localbase_url = "http://172.105.54.28:8000";


const axiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosIns = axios.create({
    baseURL: localbase_url,
    headers: {
        "Content-Type": "application/json",
    },
})

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = asyncStorage.getItem("token");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
export { axiosIns };