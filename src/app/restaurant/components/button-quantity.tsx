import { AppText } from "@/components/AppText";
import { colors } from "@/src/styles/colors";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";

interface ButtonQuantityProps {
    initialQuantity?: number; // Quantidade inicial (opcional)
    onQuantityChange?: (newQuantity: number) => void; // Callback quando a quantidade muda
}

const ButtonQuantity = ({ initialQuantity = 0, onQuantityChange }: ButtonQuantityProps) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleDecrease = () => {
        if (quantity > 0) {
            // Só diminui se for maior que 0
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange?.(newQuantity);
        }
    };

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange?.(newQuantity);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonRemove} onPress={handleDecrease}>
                <ChevronLeftIcon color={colors.black} size={20} />
            </TouchableOpacity>

            <AppText fontSize={14} style={styles.quantityText}>
                {quantity}
            </AppText>

            <TouchableOpacity style={styles.buttonAdd} onPress={handleIncrease}>
                <ChevronRightIcon color={colors.background} size={20} />
            </TouchableOpacity>
        </View>
    );
};

export default ButtonQuantity;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    buttonRemove: {
        padding: 9,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.lines,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonAdd: {
        padding: 10,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.destructive,
    },
    quantityText: {
        minWidth: 24,
        textAlign: "center",
    },
});
