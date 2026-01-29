import { http } from "./http";

export const cartApi = {
    get: () => http.get("/cart"),
    addItem: (dto) => http.post("/cart/items", dto),
    updateItem: (productId, dto) => http.put(`/cart/items/${productId}`, dto), 
    removeItem: (productId) => http.delete(`/cart/items/${productId}`),
};