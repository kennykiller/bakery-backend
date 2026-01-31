import { ProductId } from 'src/modules/catalog/domain/value-objects/product-id';

export class OrderItem {
  constructor(
    public readonly productId: ProductId,
    public readonly priceCents: number,
    private quantity: number,
  ) {
    if (quantity <= 0) throw new Error('Quantity must be positive');
    if (priceCents < 0) throw new Error('Price must be non-negative');
  }

  static create(props: { productId: ProductId; priceCents: number; quantity: number }): OrderItem {
    return new OrderItem(props.productId, props.priceCents, props.quantity);
  }

  getQuantity(): number {
    return this.quantity;
  }

  get subtotal(): number {
    return this.priceCents * this.quantity;
  }

  increase(by: number) {
    if (by <= 0) throw new Error('Increase must be positive');
    this.quantity += by;
  }

  changeQuantity(newQuantity: number) {
    if (newQuantity <= 0) throw new Error('Quantity must be positive');
    this.quantity = newQuantity;
  }
}
