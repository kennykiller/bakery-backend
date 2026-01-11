export class ProductId {
    private constructor(private readonly value: string) {}

    static fromString(id: string) {
        if (!id) throw new Error('Invalid product id');
        return new ProductId(id);
    }

    toString() {
        return this.value;
    }
}