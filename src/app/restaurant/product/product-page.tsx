import { AppText } from "@/components/AppText";
import { getProductById } from "@/src/http/get-product-by-id";
import { colors } from "@/src/styles/colors";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import ButtonQuantity from "../components/button-quantity";
import { useState } from "react";

const ProductPage = () => {
    const { productId } = useLocalSearchParams();
    const [quantity, setQuantity] = useState(0);
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getProductById(String(productId)),
        refetchOnWindowFocus: false,
    });

    return (
        <View style={{ height: "100%" }}>
            <Image source={{ uri: data?.imageUrl }} resizeMode="contain" style={styles.image} />
            <ScrollView style={styles.divMenu} keyboardShouldPersistTaps="handled">
                <View style={styles.logoAndName}>
                    {/* LOGO E NOME DO RESTAURANTE */}
                    <Image source={require("@/assets/icons/RestaurantLogo.png")} style={{ width: 16, height: 16 }} />
                    <AppText fontSize={12} style={styles.restautantName}>
                        Donald's GBI
                    </AppText>
                </View>
                <AppText fontSize={16} font="Semibold">
                    {data?.name}
                </AppText>

                <View style={styles.priceAndQuantity}>
                    <AppText font="Semibold" fontSize={20} style={{ flexShrink: 1 }}>
                        R$ {data?.price.toFixed(2).replace(".", ",")}
                    </AppText>
                    <ButtonQuantity />
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductPage;

const styles = StyleSheet.create({
    divMenu: {
        position: "relative",
        zIndex: 50,
        marginTop: -25,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
    },

    image: {
        width: "100%",
        minHeight: 332,
        marginTop: -25,
    },

    logoAndName: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
    },

    restautantName: {
        color: "#323232",
        opacity: 0.4,
    },

    priceAndQuantity: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 12,
    },
});
