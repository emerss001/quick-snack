// components/AppText.tsx
import { Text, TextProps, TextStyle } from "react-native";
import { Fonts } from "@/assets/fonts/fonts";

interface AppTextProps extends TextProps {
    font?: keyof typeof Fonts; // "Regular" | "Semibold" | "Bold"
}

export function AppText({ font = "Regular", style, ...rest }: AppTextProps) {
    return <Text {...rest} style={[{ fontFamily: Fonts[font] } as TextStyle, style]} />;
}
