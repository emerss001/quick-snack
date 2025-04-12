import urlBase from "./url-base";

export type Category = {
    name: string;
};

export type GetCategoriesResponse = {
    categorysNames: Category[];
};

export async function getCategories(): Promise<GetCategoriesResponse | undefined> {
    try {
        const response = await fetch(`${urlBase}/categories`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorBody = await response.text(); // ou .json() se tiver certeza
            console.log(`Erro ${response.status}: ${response.statusText} - ${errorBody}`);
        }

        // Tenta converter para JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
