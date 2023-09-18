import axios, { AxiosPromise } from "axios";
import { useQuery } from "react-query";
import { useFilter } from "./useFilter";
import { mountQuery } from "@/utils/mountFilters";
import { useDeferredValue } from "react";
import Product from "@/app/product/page";

interface Product {
  name: string;
  // price_in_cents: number;
  price:number;
  id: string;
  brand:string;
  title:string;
  image_url: string;
  thumbnail:string;
}

interface ProductsFetchResponse {
  data: {
    allProducts: Product[],
    products: Product[],
  },
  products:Product[]
}

const fetchProducts = (query: string): AxiosPromise<ProductsFetchResponse> => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
  console.log(API_URL,'fff');
  return axios.get(API_URL);
  // return axios.post(API_URL, { query });
}

export function useProducts() {

  const { type, priority, search } = useFilter();
  const searchDeferred = useDeferredValue(search);
  const queryMounted = mountQuery(type, priority);

  const { data } = useQuery({
    queryFn: () => fetchProducts(queryMounted),
    queryKey: ['products', type, priority], 
  });

  console.log(data,'ddddd');
  const allProducts = data?.data?.products;
  const filteredProductsBySearch = allProducts?.filter(product => product.title.toLowerCase().includes(searchDeferred.toLowerCase()));
  console.log(filteredProductsBySearch,'bbb');
  return {
    data: filteredProductsBySearch
  }
}
