import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const restaurantPage = () => {
    const { option } = useLocalSearchParams();
    return (
        <View>
            <Text>Olá mundo: {option}</Text>
        </View>
    );
};

export default restaurantPage;
