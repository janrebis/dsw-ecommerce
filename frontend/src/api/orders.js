import { http } from "./http";

export const ordersApi = {
  create: (dto) => http.post("/orders", dto),
  list: (params) => http.get("/orders", { params }), 
};