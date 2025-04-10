import { AppButton } from "@/components/AppButton";
import { AppText } from "@/components/AppText";
import { Category } from "@/src/http/get-categories";
import { getProductsByCategory, Product } from "@/src/http/get-products";
import { colors } from "@/src/styles/colors";
import { ClockIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ProductsList from "./products";

interface RestaurantCategoriesProps {
    Categories: Category[];
}

const RestautantCategories = ({ Categories }: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>(Categories[0].name);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const hanleCategoryClick = (category: Category) => {
        setSelectedCategory(category.name);
    };

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProductsByCategory(selectedCategory);
                if (data) {
                    setProducts(data);

                    setLoading(false);
                }
            } catch (err) {
                console.error("Erro ao buscar produtos:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [selectedCategory]);

    return (
        <ScrollView style={styles.divMenu} keyboardShouldPersistTaps="handled">
            <View style={styles.restaurantInformation}>
                <Image source={require("@/assets/icons/RestaurantLogo.png")} style={styles.image} />
                <View>
                    <AppText font="Semibold" fontSize={18}>
                        Donald's GBI
                    </AppText>
                    <AppText style={{ opacity: 0.55 }} fontSize={12}>
                        Fast Food
                    </AppText>
                </View>
            </View>
            <View style={styles.clock}>
                <ClockIcon size={12} color={colors.green} />
                <AppText fontSize={12} style={{ color: colors.green }}>
                    Aberto
                </AppText>
            </View>

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

            {loading ? (
                <AppText>Carregando...</AppText>
            ) : (
                <ProductsList products={products} categoryName={selectedCategory} />
            )}
        </ScrollView>
    );
};

export default RestautantCategories;

const styles = StyleSheet.create({
    divMenu: {
        flexGrow: 1,
        position: "relative",
        zIndex: 50,
        marginTop: -25,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        backgroundColor: colors.background,
    },

    scollCategories: {
        display: "flex",
        flexDirection: "row",
        gap: 15,
        marginTop: 20,
        paddingBottom: 20,
    },

    image: {
        height: 50,
        width: 50,
    },

    restaurantInformation: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    clock: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 10,
        gap: 6,
        color: colors.card[2],
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
