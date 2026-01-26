export class UpdateProductCommand {
  constructor(
    public readonly productId: string,
    public readonly title?: string,
    public readonly description?: string | null,
    public readonly priceCents?: number,
    public readonly isAvailable?: boolean,
    public readonly imageUrl?: string | null,
  ) {}
}
