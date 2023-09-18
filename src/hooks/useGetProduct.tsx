import { useQuery } from "react-query";
import axios, { AxiosPromise } from "axios";
import { Product } from "@/types/productType";

interface ProductsFetchResponse {
  // data: {
  //   Product: Product
  // },
  data:Product
}

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

// const fetcher = (productId: string): AxiosPromise<ProductsFetchResponse> => {
//   return axios.get(API_URL,{ query: `
//   query {
//     Product(id: "${productId}"){
//       name
//       description
//       category
//       price_in_cents
//       image_url
//     }
//   }
//   ` })
// }

const fetcher = (productId: string): AxiosPromise<ProductsFetchResponse> => {
  return axios.get(API_URL+"/"+productId)
}

export function useProduct(id: string){
    const { data }  = useQuery({
        queryFn: () => fetcher(id),
        queryKey: ['product', id],
        enabled: !!id,
        staleTime: 1000 * 60 * 5
    });
    console.log( data?.data,'hhhhhhhhh')
    return {
      data: data?.data
    }
}
