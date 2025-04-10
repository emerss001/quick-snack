import { useRouter } from "expo-router";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react-native";
import { TouchableOpacity, View, Image, StyleSheet } from "react-native";

const RestaurantImage = () => {
    const route = useRouter();
    return (
        <View style={styles.divImageRestaurant}>
            <TouchableOpacity
                style={[styles.buttonBack, { left: 12 }]}
                onPress={() => {
                    route.back();
                }}
            >
                <ChevronLeftIcon size={20} color="black" />
            </TouchableOpacity>

            <Image
                source={require("@/assets/images/fachada.png")}
                alt="Imagem do restaurante"
                style={styles.image}
                resizeMode="cover"
            />

            <TouchableOpacity style={[styles.buttonBack, { right: 12 }]}>
                <ScrollTextIcon size={20} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default RestaurantImage;

const styles = StyleSheet.create({
    divImageRestaurant: {
        position: "relative",
        height: 250,
        width: "100%",
    },

    image: {
        objectFit: "cover",
        width: "100%",
        height: "100%",
    },

    buttonBack: {
        position: "absolute",
        top: 12,
        backgroundColor: "#ffffff",
        zIndex: 50,
        padding: 10,
        borderRadius: 99999,
        alignItems: "center",
        justifyContent: "center",
    },
});
