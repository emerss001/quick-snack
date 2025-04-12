import { Product } from "./get-products";
import urlBase from "./url-base";

export async function getProductById(productId: number): Promise<Product | undefined> {
    try {
        const response = await fetch(`${urlBase}/products/${productId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorBody = await response.text(); // ou .json() se tiver certeza
            throw new Error(`Erro ${response.status}: ${response.statusText} - ${errorBody}`);
        }

        const data = await response.json();
        return data.product;
    } catch (error) {
        console.log("Erro na função getProductById:", error);
    }
}
