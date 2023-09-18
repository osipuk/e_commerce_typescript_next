export interface Product {
  title: string,
  price: number,
  id: string,
  thumbnail: string,
  description?: string,
  category?: string
}

export interface ProductInCart extends Product {
  quantity: number
}

export interface CartItemProps {
  product: ProductInCart
  handleUpdateQuantity(id: string, quantity: number): void
  handleDelete(id: string): void
}
