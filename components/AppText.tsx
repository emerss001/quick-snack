// components/AppText.tsx
import { Text, TextProps, TextStyle } from "react-native";
import { Fonts } from "@/assets/fonts/fonts";

interface AppTextProps extends TextProps {
    font?: keyof typeof Fonts; // "Regular" | "Semibold" | "Bold" | "Mediium"
    fontSize?: number;
}

export function AppText({ font = "Regular", fontSize, style, ...rest }: AppTextProps) {
    const baseStyle: TextStyle = {
        fontFamily: Fonts[font],
        ...(fontSize && { fontSize }), // só aplica se tiver valor
    };

    return <Text {...rest} style={[baseStyle, style]} />;
}
