import { Slot } from "expo-router";
import { SafeAreaView, StatusBar } from "react-native";
import { colors } from "../styles/colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 8, // 8 minutes
            refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 30, // 30 minutos
        },
    },
});

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <SafeAreaView className="bg-background">
                <StatusBar backgroundColor={colors.background} />
                <Slot />
            </SafeAreaView>
        </QueryClientProvider>
    );
}
