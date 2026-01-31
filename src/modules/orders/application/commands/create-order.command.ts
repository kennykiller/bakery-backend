export class CreateOrderCommand {
  constructor(
    public readonly userId: string | null,
    public readonly items: {
      productId: string;
      priceCents: number;
      quantity: number;
    }[],
    public readonly deliveryAddress?: string,
    public readonly comment?: string,
  ) {}
}
