import { getCategories } from "@/src/http/get-categories";
import { useLocalSearchParams } from "expo-router";
import { Animated, Button, Easing, ScrollView, StyleSheet, View, Image } from "react-native";
import React, { useEffect, useRef } from "react";
import RestaurantImage from "./components/image-restaurant";
import RestautantCategories from "./components/categories";
import { AppText } from "@/components/AppText";
import { ClockIcon, LoaderCircle } from "lucide-react-native";
import { colors } from "@/src/styles/colors";
import { useQuery } from "@tanstack/react-query";

const RestaurantPage = () => {
    const { option } = useLocalSearchParams();
    const spinValue = useRef(new Animated.Value(0)).current;

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["categories"],
        queryFn: () => getCategories(),
        refetchOnWindowFocus: false,
    });

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
    }, []);

    if (isError) {
        return (
            <View style={{ height: "100%", paddingBottom: 20 }}>
                <RestaurantImage />
                <View style={styles.error}>
                    <AppText font="Medium" fontSize={18}>
                        Não foi possível carregar os dados
                    </AppText>
                    <Button onPress={() => refetch()} title="Tentar novamente" color={colors.primary} />
                </View>
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={{ height: "100%", paddingBottom: 20 }}>
                <RestaurantImage />
                <View style={styles.loading}>
                    <AppText font="Semibold" fontSize={18}>
                        Carregando, por favor aguarde
                    </AppText>
                    <Animated.View style={[styles.spinner, { transform: [{ rotate }] }]}>
                        <LoaderCircle size={50} color={colors.black} strokeWidth={1} />
                    </Animated.View>
                </View>
            </View>
        );
    }

    return (
        <View style={{ height: "100%", paddingBottom: 20 }}>
            <RestaurantImage />
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
                <RestautantCategories Categories={data?.categorysNames || []} />
            </ScrollView>
        </View>
    );
};

export default RestaurantPage;

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
    error: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

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

    image: {
        height: 50,
        width: 50,
    },
});
