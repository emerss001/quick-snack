import urlBase from "./url-base";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    ingredients: string[];
    createdAt: string;
    updatedAt: string;
    menuCategoryId: number;
};

export async function getProductsByCategory(category: string): Promise<Product[] | undefined> {
    try {
        const response = await fetch(`${urlBase}/products/category/${category}`, {
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
        return data.products;
    } catch (error) {
        console.log("erro na função", error);
    }
}
