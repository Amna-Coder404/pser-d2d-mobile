import { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";

import COLOR from "../constant/colors";

const Loader = () => {
    const rotation = useRef(
        new Animated.Value(0)
    ).current;

    const reverseRotation = useRef(
        new Animated.Value(0)
    ).current;

    const glowScale = useRef(
        new Animated.Value(0.9)
    ).current;

    useEffect(() => {

        const outerAnimation = Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 1200,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        const innerAnimation = Animated.loop(
            Animated.timing(reverseRotation, {
                toValue: 1,
                duration: 1800,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        );

        const glowAnimation = Animated.loop(
            Animated.sequence([
                Animated.timing(glowScale, {
                    toValue: 1.15,
                    duration: 1000,
                    useNativeDriver: true,
                }),

                Animated.timing(glowScale, {
                    toValue: 0.9,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        );

        outerAnimation.start();
        innerAnimation.start();
        glowAnimation.start();

        return () => {
            outerAnimation.stop();
            innerAnimation.stop();
            glowAnimation.stop();
        };

    }, []);

    const outerRotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    const innerRotate = reverseRotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["360deg", "0deg"],
    });

    return (
        <View style={styles.container}>

            {/* Animated Logo */}
            <View style={styles.animationContainer}>

                {/* Pulsing Blue Glow */}
                <Animated.View
                    style={[
                        styles.glow,
                        {
                            transform: [
                                { scale: glowScale }
                            ],
                        },
                    ]}
                />

                {/* Outer Rotating Ring */}
                <Animated.View
                    style={[
                        styles.outerRing,
                        {
                            transform: [
                                { rotate: outerRotate }
                            ],
                        },
                    ]}
                />

                {/* Inner Rotating Ring */}
                <Animated.View
                    style={[
                        styles.innerRing,
                        {
                            transform: [
                                { rotate: innerRotate }
                            ],
                        },
                    ]}
                />

                {/* Logo */}
                <View style={styles.logoWrapper}>
                    <Image
                        source={require("../assets/images/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>

            </View>

            <Text style={styles.title}>
                PSER D2D
            </Text>

            <Text style={styles.subtitle}>
                Loading...
            </Text>

        </View>
    );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: COLOR.background,
    },

    animationContainer: {
        width: 130,
        height: 130,

        justifyContent: "center",
        alignItems: "center",
    },


    /* Soft Blue Glow */

    glow: {
        position: "absolute",

        width: 85,
        height: 85,

        borderRadius: 50,

        backgroundColor: COLOR.primary,

        opacity: 0.12,
    },


    /* Outer Rotating Ring */

    outerRing: {
        position: "absolute",

        width: 120,
        height: 120,

        borderRadius: 60,

        borderWidth: 3,

        borderColor: COLOR.border,

        borderTopColor: COLOR.primary,
        borderRightColor: COLOR.primary,
    },


    /* Inner Rotating Ring */

    innerRing: {
        position: "absolute",

        width: 104,
        height: 104,

        borderRadius: 52,

        borderWidth: 2,

        borderColor: COLOR.border,

        borderBottomColor: COLOR.primaryDark,
        borderLeftColor: COLOR.primaryDark,
    },


    /* Logo Card */

    logoWrapper: {
        width: 76,
        height: 76,

        justifyContent: "center",
        alignItems: "center",

        borderRadius: 20,

        backgroundColor: COLOR.surface,

        borderWidth: 1,
        borderColor: COLOR.border,

        elevation: 6,

        shadowColor: COLOR.primary,
        shadowOpacity: 0.15,
        shadowRadius: 15,
        shadowOffset: {
            width: 0,
            height: 5,
        },
    },


    logo: {
        width: 58,
        height: 58,
    },


    /* Text */

    title: {
        marginTop: 28,
        fontSize: 21,
        fontWeight: "700",
        color: COLOR.text,
    },


    subtitle: {
        marginTop: 6,
        fontSize: 13,
        color: COLOR.textSecondary,
    },

});


export default Loader;