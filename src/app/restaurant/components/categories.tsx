import { AppText } from "@/components/AppText";
import { Category } from "@/src/http/get-categories";
import { getProductsByCategory, Product } from "@/src/http/get-products";
import { colors } from "@/src/styles/colors";
import { ClockIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Button, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ProductsList from "./products";
import { useQuery } from "@tanstack/react-query";
import AppButtonRefetch from "@/components/AppButtonRefetch";

interface RestaurantCategoriesProps {
    Categories: Category[];
}

const RestautantCategories = ({ Categories }: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(Categories[0].name);

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["products", selectedCategory],
        queryFn: () => getProductsByCategory(selectedCategory),
        refetchOnWindowFocus: false,
    });

    const hanleCategoryClick = (category: Category) => {
        setSelectedCategory(category.name);
    };

    if (isError) {
        return (
            <View style={{ height: "100%", paddingBottom: 20 }}>
                <View>
                    <AppText font="Medium" fontSize={18}>
                        Não foi possível carregar os dados
                    </AppText>
                    <AppButtonRefetch title="Tentar novamente" refetch={refetch} />{" "}
                </View>
            </View>
        );
    }

    return (
        <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.scollCategories}>
                    {Categories.map((category) => {
                        const isSelected = selectedCategory === category.name;
                        return (
                            <TouchableOpacity
                                key={category.name}
                                style={isSelected ? styles.categoriesClicked : styles.categories}
                                onPress={() => hanleCategoryClick(category)}
                            >
                                <AppText
                                    fontSize={12}
                                    style={isSelected ? { color: colors.background } : { color: colors.lines }}
                                >
                                    {category.name}
                                </AppText>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </ScrollView>

            {isLoading ? (
                <AppText>Carregando...</AppText>
            ) : (
                <ProductsList products={data || []} categoryName={selectedCategory} />
            )}
        </>
    );
};

export default RestautantCategories;

const styles = StyleSheet.create({
    scollCategories: {
        display: "flex",
        flexDirection: "row",
        gap: 15,
        marginTop: 20,
        paddingBottom: 20,
    },

    categories: {
        display: "flex",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderStyle: "solid",
        borderWidth: 0.5,
        borderColor: colors.lines,
        opacity: 0.8,
        color: colors.lines,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },

    categoriesClicked: {
        color: colors.primary,
        display: "flex",
        paddingHorizontal: 16,
        paddingVertical: 8,

        backgroundColor: colors.primary,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
    },
});
