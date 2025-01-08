import React, { useEffect, useRef } from 'react'
import { Animated, Easing, Image, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';
import alarm from '../assets/images/alarm64.png';
import { Text } from 'react-native-svg';

function SettingsScreen({ navigation }) {
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start shaking animation
        const startShakingWithBreak = () => {
            Animated.loop(
                Animated.sequence([
                     // Continuous fast shaking for 2-3 seconds
                     Animated.loop(
                        Animated.sequence([
                            Animated.timing(shakeAnimation, {
                                toValue: 1,
                                duration: 10, // Fast shake
                                easing: Easing.linear,
                                useNativeDriver: true,
                            }),
                            Animated.timing(shakeAnimation, {
                                toValue: -1,
                                duration: 10, // Fast shake
                                easing: Easing.linear,
                                useNativeDriver: true,
                            }),
                        ]),
                        { iterations: 5 } // 15 iterations = ~3 seconds of continuous shaking
                    ),
                    // Pause for 2 seconds
                    Animated.delay(2000),
                ])
            ).start();
        };

        startShakingWithBreak();
    }, [shakeAnimation]);

    // Interpolating shakeAnimation to rotation degrees
    const rotation = shakeAnimation.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-20deg', '20deg'],
    });



    return (
        <View style={styles.container}>
            <Background>
            <Header title="Settings" navigation={navigation} />
            <View style={styles.iconContainer}>
                <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                    {/* <FastImage source={alarm} style={styles.icon} /> */}
                    <Image source={alarm} style={[styles.icon, { transform: [{ rotate: '10deg' }], elevation: 10, alignItems: 'center', justifyContent: 'center' }]} />
                    <Text style={[styles.label]}>Clock</Text>
                </Animated.View>
            </View>
            </Background>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
})

export default SettingsScreen