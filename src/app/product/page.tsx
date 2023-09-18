"use client"

import CartIcon from '@/components/icons/CartIcon';
import { useProduct } from '@/hooks/useGetProduct';
import { formatPrice } from '@/utils/formatPrice';
import styled from 'styled-components';
import { DefaultPageLayout } from '@/components/DefaultPageLayout';
import BackButton from '@/components/BackButton';
import { useRouter } from 'next/navigation';

const MainContainer = styled.main`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  section {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 32px;
    margin-top: 24px;

    img {
      max-width: 640px;
      width: 50%;
      border-radius: 5px;
    }
    
    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      button {
        background: #115D8C;
        mix-blend-mode: multiply;
        border-radius: 4px;
        color: white;
        border: none;
        cursor: pointer;
        padding: 10px 0;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        text-transform: uppercase;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }

  @media (min-width: 1024px) {
    section {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }

  @media (max-width: 768px) {
    section {
      img { 
        width: 100%;
      }

      button {
        margin-top: 2rem;
      }
    }
  }
`
const ProductDescription = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: var(--blue-600);
  }

  h2 {
    font-weight: 300;
    font-size: 32px;
    line-height: 150%;
    color: var(--blue-600);
    margin-top: 12px;
  }

  span:nth-of-type(2){
    font-weight: 600;
    font-size: 20px;
    color: var(--blue-600);
    margin-bottom: 24px;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    color: (--text-dark);
  }

  div {
    margin-top: 60px;

    h3 {
      text-transform: uppercase;
      color: var(--gray-400);
      font-weight: 500;
      font-size: 16px;
    }

    p {
      margin-top: 12px;
      font-size: 14px;
    }
  }
`

interface SearchParamsProps {
  searchParams: {
    id: string;
  }
}

export default function Product({ searchParams }: SearchParamsProps) {
  const router = useRouter();
  const { data } = useProduct(searchParams.id);
  
  function handleAddToCart() {
    let cartItems = localStorage.getItem('cart-items');
    if (cartItems) {
      let cartItemsArray = JSON.parse(cartItems);
      
      let existingProductIndex = cartItemsArray.findIndex((item: { id: string; }) => item.id === searchParams.id);

      if (existingProductIndex != -1){
          cartItemsArray[existingProductIndex].quantity += 1;
      } else {
          cartItemsArray.push({ ...data, quantity: 1, id: searchParams.id })
      }
      localStorage.setItem('cart-items', JSON.stringify(cartItemsArray));
    } else {
      const newCart = [{ ...data, quantity: 1, id: searchParams.id }]
      localStorage.setItem('cart-items', JSON.stringify(newCart));
    }

    router.push("/cart");
  }
  
  return (
    <DefaultPageLayout>
      <MainContainer>
        <BackButton navigate="/"/>
        <section>
          <img src={data?.thumbnail} alt="" />
          <div>
            <ProductDescription>
            <span>{data?.title.split(" ")[0]}</span>
              <h2>{data?.title}</h2>
              <span>{formatPrice(data?.price ?? 0)}</span>
             
              <div>
                <h3>Description</h3>
                <p>{data?.description}</p>
              </div>
            </ProductDescription>
            <button onClick={handleAddToCart}>
              <CartIcon color="#fff"/>
              Add Cart
            </button>
          </div>
        </section>
        
      </MainContainer> 
    </DefaultPageLayout>
 
    
  )
} 
