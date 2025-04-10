// components/AppButton.tsx
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { AppText } from "./AppText";

interface AppButtonProps {
    title: string;
    variant?: "primary" | "secondary";
}

export function AppButton({ title, variant = "primary" }: AppButtonProps) {
    const isPrimary = variant === "primary";

    return (
        <TouchableOpacity style={[styles.button, isPrimary ? styles.primary : styles.secondary]}>
            <AppText style={[styles.text, isPrimary ? styles.textPrimary : styles.textSecondary]} font="Semibold">
                {title}
            </AppText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    primary: {
        backgroundColor: "#22c55e", // verde (como o `bg-green-600`)
    },
    secondary: {
        backgroundColor: "#e5e7eb", // cinza claro (como `bg-gray-200`)
    },
    text: {
        fontSize: 12,
    },
    textPrimary: {
        color: "#ffffff",
    },
    textSecondary: {
        color: "#000000",
    },
});
