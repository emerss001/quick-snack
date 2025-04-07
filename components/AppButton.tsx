// components/AppButton.tsx
import { TouchableOpacity } from "react-native";
import { AppText } from "./AppText";

interface AppButtonProps {
    title: string;
    variant?: "primary" | "secondary";
}

export function AppButton({ title, variant = "primary" }: AppButtonProps) {
    const variants = {
        primary: "bg-primary text-white",
        secondary: "bg-gray-200 text-black",
    };

    return (
        <TouchableOpacity className={`px-4 py-3 rounded-lg items-center justify-center bg-green-600 `}>
            <AppText className="text-xs" font="Semibold">
                {title}
            </AppText>
        </TouchableOpacity>
    );
}
