import { StyleSheet, Text, View } from 'react-native'

const NotFound = ({ text }) => {
    return (
        <View style={stlyes.container}>
            <Text>
                {text}
            </Text>
        </View>
    )
}

export default NotFound


const stlyes = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})