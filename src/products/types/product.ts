export interface IProduct {
    id: number;
    name: string;
    quantity: number;
    price: number;
    minimunStock: number;
    barcode: string | null;
    unit: string;
}