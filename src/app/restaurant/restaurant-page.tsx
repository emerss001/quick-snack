import { Category, getCategories } from "@/src/http/get-categories";
import { useLocalSearchParams } from "expo-router";
import { Animated, Easing, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import RestaurantImage from "./components/image-restaurant";
import RestautantCategories from "./components/categories";
import { AppText } from "@/components/AppText";
import App from "..";
import { CircleDashedIcon, LoaderCircle } from "lucide-react-native";
import { colors } from "@/src/styles/colors";

const restaurantPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const { option } = useLocalSearchParams();

    const spinValue = new Animated.Value(0);
    const rotate = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const spinFunction = () => {
        spinValue.setValue(0);
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => spinFunction());
    };

    useEffect(() => {
        spinFunction();

        async function fetchCategories() {
            try {
                const data = await getCategories();
                if (data) {
                    setCategories(data.categorysNames);
                    setLoading(false);
                }
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            }
        }
        fetchCategories();
    }, []);

    return (
        <View style={{ height: "100%", paddingBottom: 20 }}>
            <RestaurantImage />

            {!loading && categories.length > 0 ? (
                <RestautantCategories Categories={categories} />
            ) : (
                <View style={styles.loading}>
                    <AppText font="Semibold" fontSize={18}>
                        Carregando, por favor aguarde
                    </AppText>
                    <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]}>
                        <LoaderCircle size={50} color={colors.black} strokeWidth={1} />
                    </Animated.View>
                </View>
            )}
        </View>
    );
};

export default restaurantPage;

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    spinner: {
        marginTop: 10,
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
    },
});
