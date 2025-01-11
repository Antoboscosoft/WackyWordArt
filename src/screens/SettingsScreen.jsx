import React, { useEffect, useRef, useState } from 'react'
import { Animated, Easing, Image, StyleSheet, Switch, Touchable, TouchableOpacity, View, Text, Alert } from 'react-native';
import Header from '../components/Header';
import Background from '../components/Background';
import alarm from '../assets/images/alarm64.png';

import soundIcon from '../assets/images/icons/sound.png';
import musicIcon from '../assets/images/icons/music.png';
import themeIcon from '../assets/images/icons/theme.png';
import parentIcon from '../assets/images/icons/parents.png';
import resetIcon from '../assets/images/icons/reset.png';


function SettingsScreen({ navigation }) {
    const shakeAnimation = useRef(new Animated.Value(0)).current;

    const rotation = useRef(new Animated.Value(0)).current;

    const [isNotificationsEnabled, setNotificationsEnabled] = useState(true);
    const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);

    const [isSoundEnabled, setSoundEnabled] = useState(true);
    const [isMusicEnabled, setMusicEnabled] = useState(true);

    const [currentTheme, setCurrentTheme] = useState('white');

    
    const handleLogout = () => {
        // Implement logout functionality here
        console.log('User logged out');
        // navigation.navigate('Login');
        navigation.navigate('LoginScreen');
    }

    // Rotating animation for the alarm icon
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotation]);

    const rotate = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Settings options
    const settingsOptions = [
        { id: 1, title: 'Notificatons', icon: '🔔' },
        { id: 2, title: 'Account', icon: '👤' },
        { id: 3, title: 'Privacy', icon: '🔒' },
        { id: 4, title: 'Language', icon: '🌐' },
        { id: 5, title: 'Help', icon: '❓' },
    ];

    // useEffect(() => {
    //     // Start shaking animation
    //     const startShakingWithBreak = () => {
    //         Animated.loop(
    //             Animated.sequence([
    //                 // Continuous fast shaking for 2-3 seconds
    //                 Animated.loop(
    //                     Animated.sequence([
    //                         Animated.timing(shakeAnimation, {
    //                             toValue: 1,
    //                             duration: 10, // Fast shake
    //                             easing: Easing.linear,
    //                             useNativeDriver: true,
    //                         }),
    //                         Animated.timing(shakeAnimation, {
    //                             toValue: -1,
    //                             duration: 10, // Fast shake
    //                             easing: Easing.linear,
    //                             useNativeDriver: true,
    //                         }),
    //                     ]),
    //                     { iterations: 5 } // 15 iterations = ~3 seconds of continuous shaking
    //                 ),
    //                 // Pause for 2 seconds
    //                 Animated.delay(2000),
    //             ])
    //         ).start();
    //     };

    //     startShakingWithBreak();
    // }, [shakeAnimation]);

    // // Interpolating shakeAnimation to rotation degrees
    // const rotation = shakeAnimation.interpolate({
    //     inputRange: [-1, 1],
    //     outputRange: ['-20deg', '20deg'],
    // });

    const handleThemeChange = () => {
        // Alert.alert(
        //     'Theme Selector',
        //     'Choose your favorite theme!',
        //     [
        //         { text: 'Jungle', onPress: () => console.log('Jungle Pressed') },
        //         { text: 'Space', onPress: () => console.log('Space Pressed') },
        //         { text: 'Underwater', onPress: () => console.log('Underwater Pressed') },
        //     ],
        //     { cancelable: true }
        // )
        if(currentTheme === 'white') {
            setCurrentTheme('dark')
        } else if(currentTheme === 'dark') {
            setCurrentTheme('lightGray');
        } else {
            setCurrentTheme('white');
        }
    };
    
    const themeStyles = {
        backgroundColor: currentTheme === 'white' ? '#FFFFFF' 
            : currentTheme === 'dark' ? '#000000' : '#D3D3D3',
        textColor: currentTheme === 'white' ? '#000000'
            : currentTheme === 'dark' ? '#FFFFFF' : '#000000',
    };

    const handleResetProgress = () => {
        Alert.alert(
            'Reset Progress',
            'Are you sure you want to reset your game progress? This action cannot be undone.',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Reset', onPress: () => console.log('Reset Pressed'), style: 'destructive' },
            ],
        )
    };


    const handleParentalControl = () => {
        Alert.alert(
            'Parental Control',
            'Enter the passcode to access restricted settings.',
        )
    };





    return (
        <View style={[styles.container, { backgroundColor: themeStyles.backgroundColor }]}>
            <Background>
                <Header title="Settings" navigation={navigation} />
                {/* Account Section */}
                {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <View style={styles.accountInfo}>
                        <Text style={styles.infoLabel}>Name:</Text>
                        <Text style={styles.infoText}>John Doe</Text>
                    </View>
                    <View style={styles.accountInfo}>
                        <Text style={styles.infoLabel}>Email:</Text>
                        <Text style={styles.infoText}>johndoe@example.com</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.editProfileButton}
                        onPress={() => navigation.navigate('EditProfile')}
                    >
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View> */}
                
                {/* <Text style={styles.sectionTitle}> Preferences</Text> */}

                {/* Preferences Section */}
                {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferences</Text>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceText}>Enable Notifications</Text>
                        <Switch
                            value={isNotificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                            thumbColor={isNotificationsEnabled ? '#da8113' : '#ccc'}
                        />
                    </View>
                    <View style={styles.preferenceItem}>
                        <Text style={styles.preferenceText}>Dark Mode</Text>
                        <Switch
                            value={isDarkModeEnabled}
                            onValueChange={setDarkModeEnabled}
                            thumbColor={isDarkModeEnabled ? '#da8113' : '#ccc'}
                        />
                    </View>
                </View> */}

                {/* Settings Container */}
                <View style={styles.settingsContainer}>
                    {/* Sound Toggle */}
                    <View style={styles.settingItem}>
                        <Image 
                        source={soundIcon} 
                        // source={ require('<a href="https://www.flaticon.com/free-icons/theme" title="theme icons">Theme icons created by Ian Anandara - Flaticon</a>') }
                        style={styles.icon} />
                        <Text style={styles.settingText}>Sound Effects</Text>
                        <Switch
                            value={isSoundEnabled}
                            onValueChange={setSoundEnabled}
                            thumbColor={isSoundEnabled ? '#fbc531' : '#ccc'}
                        />
                    </View>

                    {/* Music Toggle */}
                    <View style={styles.settingItem} aria-disabled>
                        <Image source={musicIcon} style={styles.icon} />
                        <Text style={styles.settingText}>Background Music</Text>
                        <Switch
                            value={isMusicEnabled}
                            onValueChange={setMusicEnabled}
                            thumbColor={isMusicEnabled ? '#fbc531' : '#ccc'}
                        />
                    </View>

                    {/* Theme Selector */}
                    <TouchableOpacity style={styles.settingItem} onPress={handleThemeChange}>
                        <Image source={themeIcon} style={styles.icon} />
                        <Text style={[styles.settingText, { color: themeStyles.textColor }, { fontWeight: 'bold' }]}>Change Theme</Text>
                    </TouchableOpacity>

                    {/* Parental Controls */}
                    <TouchableOpacity style={styles.settingItem} onPress={handleParentalControl}>
                        <Image source={parentIcon} style={styles.icon} />
                        <Text style={styles.settingText}>Parental Controls</Text>
                    </TouchableOpacity>

                    {/* Reset Progress */}
                    <TouchableOpacity style={styles.settingItem} onPress={handleResetProgress}>
                        <Image source={resetIcon} style={styles.icon} />
                        <Text style={styles.settingText}>Reset Progress</Text>
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>

                {/* Current Theme Display */}
                {/* <View style={styles.currentTheme}>
                    <Text style={[styles.currentThemeText, { color: themeStyles.textColor }]}>
                        Current Theme: {currentTheme === 'white'
                            ? 'White Theme'
                            : currentTheme === 'dark'
                            ? 'Dark Theme'
                            : 'Light Gray Theme'}
                    </Text>
                </View> */}

            </Background>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        marginHorizontal: 20,
        marginVertical: 10,
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    accountInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 16,
        color: '#666',
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    editProfileButton: {
        alignSelf: 'flex-start',
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#da8113',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    preferenceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    preferenceText: {
        fontSize: 16,
        color: '#333',
    },
    logoutButton: {
        alignSelf: 'center',
        marginTop: 20,
        paddingVertical: 12,
        paddingHorizontal: 50,
        // backgroundColor: '#f3095b',
        backgroundColor: '#da8113',
        borderRadius: 25,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // Settings container
    settingsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    settingText: {
        fontSize: 16,
        flex: 1,
        color: '#333',
        fontWeight: 'bold',
    },
    currentTheme: {
        marginTop: 20,
        alignItems: 'center',
    },
    currentThemeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});


const styles1 = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    alarmIcon: {
        width: 80,
        height: 80,
        tintColor: '#f3095b'
        // resizeMode: 'contain',
        // marginBottom: 10,
    },
    optionsContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    optionIcon: {
        fontSize: 24,
        marginRight: 15,
    },
    optionTitle: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
    // icon: {
    //     width: 60,
    //     height: 60,
    //     resizeMode: 'contain',
    // },
    // label: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     marginBottom: 10,
    // },
})

export default SettingsScreen