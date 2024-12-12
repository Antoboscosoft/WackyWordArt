import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Background from '../components/Background';
import { common } from '../utills/Utils';

function HowToPlayScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Background>
                {/* Header Section */}
                <Header title="How to Play" navigation={navigation} />

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
                            source={common.Zebra} // Replace with your zebra image
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerContent: {
        flex:1, 
        padding: 20
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
        color: common.color.secondary,
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
        backgroundColor: common.color.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    button1: {
        width: '65%',
        height: 50,
        backgroundColor: common.color.secondary,
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
    },
});

export default HowToPlayScreen;
