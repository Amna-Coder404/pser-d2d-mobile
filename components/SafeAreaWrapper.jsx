import {
    SafeAreaView,
} from "react-native-safe-area-context";

function SafeAreaWrapper({ children }) {
    return (
        <SafeAreaView
            style={{
                flex: 1, backgroundColor: "#fff",
            }}
        >
            {children}
        </SafeAreaView>
    );
}

export default SafeAreaWrapper;