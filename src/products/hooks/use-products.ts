import { instance } from "../../mocks/server";
import { useQuery } from "react-query";
import { IProduct } from "../types/product";

const fetchProducts = async (): Promise<IProduct[]> => {
  const { data } = await instance.get("/api/products");
  return data;
};

export function useProducts() {
  return useQuery("products", () => fetchProducts());
}
