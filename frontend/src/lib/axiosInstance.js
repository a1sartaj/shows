import axios from "axios"


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URI,
    headers: {
        'Content-Type': 'application/json'
    }
})

// axiosInstance.interceptors.response.use(
//     (response) => response, // Return the response directly if it's successful

//     (error) => {
//         if(error.response?.status === 401) {

//         }
//     }
// )


export default axiosInstance