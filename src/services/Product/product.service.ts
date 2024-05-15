import { HTTP } from "../instance";

export interface IParams {
  name: string | null;
  limit?: number;
  orderBy?: string;
  order?: string;
}

export const getProducts = (params: IParams) => {
  return HTTP.get("/products", {
    params: {
      ...params,
    },
  });
};

export const getProductDetail = (id: string) => {
  return HTTP.get(`/products/${id}`);
};
