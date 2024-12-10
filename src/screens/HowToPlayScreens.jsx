import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Background from '../components/Background';

function HowToPlayScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Header Section */}
            <Header title="How to Play" navigation={navigation} />

            <Background>
                {/* Center Content Section */}
                <View style={styles.centerContent}>
                    {/* Cloud-like Design */}
                    <View style={styles.cloud}>
                        <FastImage
                            source={require('../assets/images/cloud1.png')} // Replace with your cloud image
                            style={styles.cloudImage}
                            resizeMode="contain"
                        >
                            <Text style={styles.cloudText}>Click on the game to learn how to play!</Text>
                        </FastImage>
                    </View>

                    <View style={styles.contentWrapper}>
                        {/* Buttons */}
                        <View style={styles.buttonColumn}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LetsLearnScreen')}>
                                <Text style={styles.buttonText}> Let's Learn </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('WackWordArtScreen')}>
                                <Text style={styles.buttonText}> Wackey Word Wheel </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FillInTheBlankScreen')}>
                                <Text style={styles.buttonText}> ― Fill in the blank </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('MakeYourOwnScreen')}>
                                <Text style={styles.buttonText}> ✍🏻 Make Your Own </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Zebra Image */}
                        <FastImage
                            source={require('../assets/images/zebraY.png')} // Replace with your zebra image
                            style={styles.zebraImage}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Background>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    // Header styles
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ddd',
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#f18927',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#04acb8',
        fontWeight: 'bold',
        fontSize: 25,
        fontWeight: 'bold',
        textShadowColor: '#d8d6d6',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        letterSpacing: 1,
    },
    bulbIcon: {
        marginLeft: 5,
        opacity: 0
    },
    // Center content styles
    centerContent: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        // position: 'relative',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    cloud: {
        padding: 20,
        marginBottom: 10,
    },
    cloudContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    cloudImage: {
        width: 320,
        height: 180,
        resizeMode: 'contain',
        right: 10,
        zIndex: 1
    },
    cloudText: {
        fontSize: 19,
        width: '50%',
        textAlign: 'center',
        color: '#058c96',
        fontWeight: 'bold',
        position: 'absolute',
        top: 50,
        left: 85
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonColumn: {
        flex: 1,
        zIndex: 1
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    button: {
        width: '65%',
        height: 50,
        backgroundColor: '#f18927',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    button1: {
        width: '65%',
        height: 50,
        backgroundColor: '#04acb8',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
    },
    zebraImage: {
        width: 280,
        height: 280,
        position: 'absolute',
        right: -80,
        bottom: 20,

        // width: 150,
        // height: 150,
        // marginLeft: 10,
    },
    // Advertisement section styles
    adContainer: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#f2f2f2',
        borderTopWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
    },
    adText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ff0000',
        marginBottom: 5,
    },
    adImage: {
        width: 300,
        height: 60,
    },
});

export default HowToPlayScreen;
