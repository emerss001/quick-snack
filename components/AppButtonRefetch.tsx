import { TouchableOpacity, StyleSheet } from "react-native";
import { AppText } from "./AppText";
import { colors } from "@/src/styles/colors";

interface AppButtonRefetchProps {
    title: string;
    refetch: () => void;
}

const AppButtonRefetch = ({ title, refetch }: AppButtonRefetchProps) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
                refetch();
            }}
        >
            <AppText style={{ color: colors.background }} font="Semibold">
                {title}
            </AppText>
        </TouchableOpacity>
    );
};

export default AppButtonRefetch;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#22c55e",
    },
});
