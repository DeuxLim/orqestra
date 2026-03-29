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
        console.log("request interceptor...", config);
        return config;
    },
    function (error) {
        console.log("request error interceptor...", error);
        return Promise.reject(error);
    },
);

// Add a response interceptor
api.interceptors.response.use(
    function onFulfilled(response) {
        console.log("response interceptor...", response);
        return response;
    },
    function onRejected(error) {
        console.log(error);
        return Promise.reject(error);
    },
);

export default api;
