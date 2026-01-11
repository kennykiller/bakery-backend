import { Money } from "../value-objects/money";
import { ProductId } from "../value-objects/product-id";

export class Product {
    constructor(
        public readonly id: ProductId,
        public title: string,
        public description: string | null,
        public price: Money,
        public isAvailable: boolean,
        public imageUrl: string | null
    ) {}

    makeUnavailable() {
        this.isAvailable = false;
    }

    changePrice(newPrice: Money) {
        this.price = newPrice;
    }
}