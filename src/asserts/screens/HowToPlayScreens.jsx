import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FastImage from 'react-native-fast-image';

function HowToPlayScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <View style={styles.circle}>
                        <Icon name="arrow-back" size={24} color="#333" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.headerTitle}> How to Play </Text>
                <Icon name="emoji-objects" size={22} color="#FF69B4" style={styles.bulbIcon} />

                {/* <View style={{ width: 24 }} /> Spacer for alignment */}
            </View>

            {/* Center Content Section */}
            <View style={styles.centerContent}>
                {/* Cloud-like Design */}
                <View style={styles.cloud}>
                    <FastImage
                        source={require('../images/Cloud.png')} // Replace with your cloud image
                        style={styles.cloudImage}
                        resizeMode="contain"
                    >
                        <Text style={styles.cloudText}>Click on the game to learn how to play!</Text>
                    </FastImage>
                </View>

                <View style={styles.contentWrapper}>
                    {/* Buttons */}
                    <View style={styles.buttonColumn}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}> Let's Learn </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}> Wackey Word Wheel </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}> ― Fill in the blank </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}> ✍🏻 Make Your Own </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Zebra Image */}
                    <FastImage
                        source={require('../images/zebrabg.png')} // Replace with your zebra image
                        style={styles.zebraImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Four Buttons */}
                {/* <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Rule 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Rule 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Tips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Tricks</Text>
                    </TouchableOpacity>
                </View> */}

                {/* Zebra Image */}
                {/* <FastImage
                    source={require('../images/zebrabg.png')}
                    style={styles.zebraImage}
                    resizeMode="contain"
                /> */}
            </View>

            {/* Advertisement Section */}
            <View style={styles.adContainer}>
                <Text style={styles.adText}>Advertisement</Text>
                <FastImage
                    source={{ uri: 'https://via.placeholder.com/300x100' }} // Replace with your ad image or SDK
                    style={styles.adImage}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffeedd',
    },
    // Header styles
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f0f0f0',
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
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        // flexDirection: 'row',
    },
    bulbIcon: {
        marginLeft: 5,
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
        // width: '80%',
        padding: 20,
        // backgroundColor: '#f9f9f9',
        // borderRadius: 50,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.2,
        // shadowRadius: 5,
        // elevation: 5,
        marginBottom: 20,
    },
    cloudContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    cloudImage: {
        width: 350,
        height: 200,
        resizeMode: 'contain',
        right: 10
    },
    cloudText: {
        fontSize: 16,
        width: '50%',
        textAlign: 'center',
        color: '#555',
        fontWeight: 'bold',
        position: 'absolute',
        top: 70,
        left: 75
    },
    contentWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonColumn: {
        flex: 1,
        // flexDirection: 'column',
        // alignItems: 'center',
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        marginBottom: 20,
    },
    // button: {
    //     width: 100,
    //     height: 50,
    //     backgroundColor: '#3b9a67',
    //     borderRadius: 25,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     margin: 10,
    // },
    button: {
        width: '65%',
        height: 50,
        backgroundColor: '#3b9a67',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    zebraImage: {
        width: 180,
        height: 180,
        position: 'absolute',
        right: -30,
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
        color: '#333',
        marginBottom: 5,
    },
    adImage: {
        width: 300,
        height: 60,
    },
});

export default HowToPlayScreen;
