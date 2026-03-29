import api from "./api";

let csrfFetched = false;

export const getCsrfToken = async () => {
    if (!csrfFetched) {
        await api.get("/sanctum/csrf-cookie");
        csrfFetched = true;
    }
};
