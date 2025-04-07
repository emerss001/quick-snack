import { FontAssets, Fonts } from "@/assets/fonts/fonts";
import { View, Text, Image } from "react-native";
import { useFonts } from "expo-font";

export default function App() {
    const [fontsLoaded] = useFonts(FontAssets);

    if (!fontsLoaded) {
        return null;
    }
    return (
        <View className="bg-background">
            <View className="items-center justify-center gap-2 mt-20">
                <Image source={require("@/assets/icons/Logo.png")} style={{ height: 82, width: 82 }} />
                <Text className="font-bold text-xl">Quick Snack</Text>
            </View>
            <View className="px-6 mt-10 items-center">
                <Text className="text-4xl font-semibold" style={{ fontFamily: Fonts.Regular }}>
                    Seja bem-vindo
                </Text>
                <Text className="text-base text-center mt-2 max-w-[325]" style={{ fontFamily: Fonts.Regular }}>
                    Escolha como prefere aproveitar sua refeição. Estamos aqui para oferecer praticidade e sabor em cada
                    detalhe!
                </Text>
            </View>
        </View>
    );
}
