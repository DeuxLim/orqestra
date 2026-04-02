import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
});

// Add a request interceptor
api.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a response interceptor
api.interceptors.response.use(
    function onFulfilled(response) {
        return response;
    },
    function onRejected(error) {
        return Promise.reject(error);
    },
);

export default api;
