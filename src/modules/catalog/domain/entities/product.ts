import { Money } from '../value-objects/money';
import { ProductId } from '../value-objects/product-id';

export class Product {
  private constructor(
    public readonly id: ProductId | null,
    public title: string,
    public description: string | null,
    public price: Money,
    public isAvailable: boolean,
    public imageUrl: string | null,
  ) {}

  static createNew(props: {
    title: string;
    description?: string | null;
    price: Money;
    imageUrl?: string | null;
  }): Product {
    return new Product(null, props.title, props.description ?? null, props.price, true, props.imageUrl ?? null);
  }

  static restore(props: {
    id: ProductId;
    title: string;
    description?: string | null;
    price: Money;
    imageUrl?: string | null;
  }) {
    return new Product(props.id, props.title, props.description ?? null, props.price, true, props.imageUrl ?? null);
  }

  update(props: {
    title?: string;
    description?: string | null;
    price?: Money;
    isAvailable?: boolean;
    imageUrl?: string | null;
  }): void {
    if (props.title !== undefined) this.title = props.title;
    if (props.description !== undefined) this.description = props.description;
    if (props.price !== undefined) this.price = props.price;
    if (props.isAvailable !== undefined) this.isAvailable = props.isAvailable;
    if (props.imageUrl !== undefined) this.imageUrl = props.imageUrl;
  }

  makeUnavailable() {
    this.isAvailable = false;
  }

  changePrice(newPrice: Money) {
    this.price = newPrice;
  }
}
