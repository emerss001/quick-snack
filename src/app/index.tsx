import { FontAssets } from "@/assets/fonts/fonts";
import { View, Image, StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { AppText } from "../../components/AppText";
import { colors } from "../styles/colors";
import AppOption from "@/components/AppOption";
import { router } from "expo-router";
import ConsumptionMethod from "../types/consumption-method";

export default function App() {
    const [fontsLoaded] = useFonts(FontAssets);

    if (!fontsLoaded) {
        return null;
    }

    function handlePressNextPage(option: string) {
        router.push({
            pathname: "/restaurant/restaurant-page",
            params: { option },
        });
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    source={require("@/assets/icons/Logo.png")}
                    style={{ height: 82, width: 82 }}
                    alt="avatar imagem"
                />
                <AppText style={styles.textTitle} font="Semibold">
                    Quick Snack
                </AppText>
            </View>

            <View style={styles.textCenter}>
                <AppText style={styles.text26} font="Semibold">
                    Seja bem-vindo!
                </AppText>
                <AppText style={styles.textsmall} font="Regular">
                    Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada
                    detalhe!
                </AppText>
            </View>

            <View style={styles.viewOptions}>
                <AppOption
                    dimensions={{ height: 82, width: 78 }}
                    title="Para comer aqui"
                    image={require("@/assets/images/Burgher.png")}
                    onPress={() => handlePressNextPage(ConsumptionMethod.DINE_IN)}
                />
                <AppOption
                    dimensions={{ height: 80, width: 74 }}
                    title="Para Levar"
                    image={require("@/assets/images/Bag.png")}
                    onPress={() => handlePressNextPage(ConsumptionMethod.TAKE_OUT)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingTop: 96,
    },

    containerLogo: {
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
    },

    textTitle: {
        color: colors.black,
    },

    textCenter: {
        paddingTop: 96,
        alignItems: "center",
        gap: 8,
    },

    text26: {
        fontSize: 26,
    },

    textsmall: {
        opacity: 0.55,
        textAlign: "center",
        maxWidth: 330,
    },

    viewOptions: {
        paddingTop: 56,
        flexDirection: "row",
        gap: 16,
    },
});
