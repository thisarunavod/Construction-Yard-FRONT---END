import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000", // Your backend URL
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('accessToken')
        if (token){    config.headers.Authorization = `Bearer ${token}`; }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response)=> response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark the request as retried

            try {
                // Refresh the token
                const refreshToken = localStorage.getItem("refreshToken");
                const response = await api.post('/auth/refresh-token', {}, {
                    headers: {
                        Authorization: `Bearer ${refreshToken}`,
                    },
                });

                // Update the access token in localStorage
                localStorage.setItem('accessToken', response.data.accessToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                // If refresh fails, log the user out
                return Promise.reject(refreshError);
            }
        }

        // If the error is not a 401 or the request has already been retried, reject the promise
        return Promise.reject(error);

    }
)


export default api