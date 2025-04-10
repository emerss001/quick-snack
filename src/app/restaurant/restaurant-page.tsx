import { Category, getCategories } from "@/src/http/get-categories";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import React, { useEffect, useState } from "react";
import RestaurantImage from "./components/image-restaurant";
import RestautantCategories from "./components/categories";

const restaurantPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const { option } = useLocalSearchParams();

    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await getCategories();
                if (data) {
                    setCategories(data.categorysNames);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchCategories();
    }, []);

    return (
        <View style={{ height: "100%", paddingBottom: 20 }}>
            <RestaurantImage />
            {!loading && categories.length > 0 && <RestautantCategories Categories={categories} />}
        </View>
    );
};

export default restaurantPage;

// <View>
//             {loading ? (
//                 <Text>Loading...</Text>
//             ) : (
//                 <FlatList
//                     data={categories}
//                     keyExtractor={(item) => item.name}
//                     renderItem={({ item }) => <Text>{item.name}</Text>}
//                 />
//             )}
//         </View>
