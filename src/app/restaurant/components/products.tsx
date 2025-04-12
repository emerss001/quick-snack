import { AppText } from "@/components/AppText";
import { Product } from "@/src/http/get-products";
import { colors } from "@/src/styles/colors";
import { router } from "expo-router";
import { FlatList, Pressable, StyleSheet, View, Image } from "react-native";

interface ProductsListProps {
    products: Product[];
    categoryName: string;
}

const ProductsList = ({ products, categoryName }: ProductsListProps) => {
    const handleClickProduct = (productId: number) => {
        router.push({
            pathname: "/restaurant/product/product-page",
            params: { productId },
        });
    };
    return (
        <>
            <AppText font="Semibold" fontSize={14}>
                {categoryName}
            </AppText>
            <View style={styles.scrollContainer}>
                <FlatList
                    scrollEnabled={false}
                    data={products}
                    keyExtractor={(item) => item.id.toString()}
                    // contentContainerStyle={styles.scrollContainer}
                    renderItem={({ item }) => {
                        return (
                            <Pressable style={styles.scroll} onPress={() => handleClickProduct(item.id)}>
                                {/* ESQUERDA */}
                                <View style={styles.scrollItem}>
                                    <AppText fontSize={14}>{item.name}</AppText>
                                    <AppText numberOfLines={2} ellipsizeMode="tail" style={{ color: colors.lines }}>
                                        {item.description}
                                    </AppText>
                                    <AppText fontSize={16} font="Semibold" style={styles.itemPrice}>
                                        R$ {item.price.toFixed(2).replace(".", ",")}
                                    </AppText>
                                </View>
                                {/* DIREITA */}
                                <View style={styles.iamgeProduct}>
                                    <Image
                                        source={{ uri: item.imageUrl }}
                                        resizeMode="contain"
                                        style={{ width: 100, height: 100, borderRadius: 8 }}
                                    />
                                </View>
                            </Pressable>
                        );
                    }}
                />
            </View>
        </>
    );
};

export default ProductsList;

const styles = StyleSheet.create({
    scrollContainer: {
        flexDirection: "column",
    },

    scroll: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.lines,
    },

    scrollItem: {
        flex: 1,
        paddingRight: 12,
    },

    itemPrice: {
        paddingTop: 12,
    },

    iamgeProduct: {
        minHeight: 82,
        minWidth: 120,
        justifyContent: "center",
        alignItems: "center",
    },
});
