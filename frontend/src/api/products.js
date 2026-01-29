import { http } from "./http";

export const productsApi = {
    list: () => http.get("/products"),
    details: (id) => http.get(`/products/${id}`),
};