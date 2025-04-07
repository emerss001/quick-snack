import {
    ImageSourcePropType,
    StyleSheet,
    DimensionValue,
    Image,
    View,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";
import { AppText } from "./AppText";
import { colors } from "@/src/styles/colors";

interface AppOptionProps extends TouchableOpacityProps {
    title: string;
    image: ImageSourcePropType;
    dimensions: {
        height: DimensionValue;
        width: DimensionValue;
    };
}

const AppOption = ({ title, image, dimensions, ...rest }: AppOptionProps) => {
    return (
        <View style={styles.container}>
            <Image source={image} style={{ height: dimensions.height, width: dimensions.width }} />
            <TouchableOpacity style={styles.touchableClick} {...rest}>
                <AppText style={styles.textXs} font="Semibold">
                    {title}
                </AppText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 160,
        padding: 12,
        alignItems: "center",
        paddingVertical: 32,
        display: "flex",
        borderWidth: 0.5,
        borderRadius: 16,
        borderColor: colors.border,
        gap: 32,
    },

    touchableClick: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 9999,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.muted,
    },

    textXs: {
        fontSize: 12,
    },
});

export default AppOption;
