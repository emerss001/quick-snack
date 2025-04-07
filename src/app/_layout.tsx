import { Slot } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { colors } from "../styles/colors";

export default function RootLayout() {
    return (
        <SafeAreaView className="bg-background">
            <StatusBar backgroundColor={colors.background} />
            <Slot />
        </SafeAreaView>
    );
}
