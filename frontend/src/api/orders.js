import { http } from "./http";

export const ordersApi = {
    create: (dto) => http.post("/orders", dto),
};