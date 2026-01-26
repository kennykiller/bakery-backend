export class CreateProductCommand {
  constructor(
    public readonly title: string,
    public readonly description: string | null,
    public readonly priceCents: number,
    public readonly imageUrl: string | null,
  ) {}
}
