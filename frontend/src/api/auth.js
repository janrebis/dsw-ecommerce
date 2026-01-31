import { http } from "./http";

export const authApi = {
    register: (dto) => http.post("/auth/register", dto),
    login: (dto) => http.post("/auth/login", dto),
};