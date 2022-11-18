import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:8000" })

export class ProductService {
    public static async addProduct(product: any): Promise<any> {
        try {
            const response = await instance.post('/product', product)

            return response?.data;
        } catch (err) {
            return {}
        }

    }
    public static async getProducts(): Promise<any> {
        try {
            const response = await instance.get('/product')

            return response?.data;
        } catch (err) {
            return []
        }

    }
    public static async updateProduct(productId: number, values: any): Promise<any> {
        return instance.put(`/product/${productId}`, values);
    }
}