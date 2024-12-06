import React, { useRef, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image';
import { DrawerLayout } from 'react-native-gesture-handler';
// import { Text, View } from 'react-native-reanimated/lib/typescript/Animated'
import PageIcon from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // For drawer items

function HomeScreen({ navigation }) {
    const drawerRef = useRef(null);

    // Drawer Content with Icons
    const renderDrawerContent = () => (
        // return (
        <View style={styles.drawerContainer}>
            <Text style={styles.drawerTitle} onPress={() => drawerRef.current.closeDrawer()} hitslop={20}>
                <Text style={[{ alignSelf: 'flex-start', marginRight: 10 }]}> ☰    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Text>
                Menu
            </Text>
            <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                    drawerRef.current.closeDrawer();
                    navigation.navigate('Profile');
                }}>
                <Icon name="account" size={24} color="#3b5a9a" style={styles.drawerItemIcon} />
                <Text style={styles.drawerItemText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                    drawerRef.current.closeDrawer();
                    navigation.navigate('Game');
                }}>
                <Icon name="gamepad-variant" size={24} color="#3b5a9a" style={styles.drawerItemIcon} />
                <Text style={styles.drawerItemText}>Games</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                    drawerRef.current.closeDrawer();
                    navigation.navigate('TutorialScreen');
                }}>
                <Icon name="book-open-variant" size={24} color="#3b5a9a" style={styles.drawerItemIcon} />
                <Text style={styles.drawerItemText}>Tutorial Screen</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                    drawerRef.current.closeDrawer();
                    navigation.navigate('Progress');
                }}>
                <Icon name="chart-bar" size={24} color="#3b5a9a" style={styles.drawerItemIcon} />
                <Text style={styles.drawerItemText}>Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                    drawerRef.current.closeDrawer();
                    navigation.navigate('Settings');
                }}>
                <Icon name="cog" size={24} color="#3b5a9a" style={styles.drawerItemIcon} />
                <Text style={styles.drawerItemText}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                    drawerRef.current.closeDrawer();
                    navigation.navigate('Home');
                }}>
                <Icon name="logout" size={24} color="#3b5a9a" style={styles.drawerItemIcon} />
                <Text style={styles.drawerItemText}>Logout</Text>
            </TouchableOpacity>
        </View>
        // );
    );
    // }

    return (
        <DrawerLayout
            ref={drawerRef}
            drawerWidth={250}
            drawerPosition="left"
            renderNavigationView={renderDrawerContent}
            drawerType='slide'>
            <View style={styles.container}>
                {/* Top bar */}
                <View style={styles.topBar}>
                    {/* Menu Icon */}
                    <TouchableOpacity onPress={() => drawerRef.current.openDrawer()}>
                        <Text style={styles.homeheadicon}>☰</Text>
                        {/* <PageIcon name="menu" size={28} color="#3b5a9a" /> */}
                    </TouchableOpacity>
                    {/* Menu */}
                    <Text style={styles.title}>Home</Text>
                    {/* Settings Icon */}
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Text style={styles.homeheadicon}>⚙️</Text>
                        {/* <PageIcon name="settings" size={28} color="#3b5a9a" /> */}
                    </TouchableOpacity>
                </View>

                {/* Main section */}
                <View style={styles.content}>
                    {/* <Text style={[styles.welcomeText, { color: '#3b5a9a', position: 'absolute', top: 200 }]}>
                        Welcome to WWF Kids!
                    </Text> */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('HowToPlayScreen')}>
                        <Text style={styles.buttonText}> 💡 How to Play </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Progress')}>
                        <Text style={styles.buttonText}> Play   ▶   </Text>
                    </TouchableOpacity>
                    <FastImage
                        style={[styles.zebraImage]}
                        source={require('../images/zebrabg.png')}
                    />
                </View>

                {/* Bottom section */}
                <View style={styles.adContainer}>
                    <Text style={styles.adText}>Advertisement</Text>
                    {/* Placeholder for an ad image or component */}
                    <FastImage
                        style={styles.adImage}
                        source={{ uri: 'https://via.placeholder.com/300x100' }} // Replace with your ad image or SDK component
                        resizeMode="contain"
                    />
                </View>
            </View>
        </DrawerLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffeedd', //'#fff',
        // alignItems: 'center',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#dfd5cb', //'#fff',
    },
    homeheadicon: {
        fontSize: 30,
        color: '#3b5a9a',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#3b5a9a', //'#3b9a67',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3b5a9a',
        marginBottom: 20,
    },

    // buttonsContainer: {
    //     flex: 1,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginTop: 50,
    //     width: '90%',
    //     // gap: 10
    // },
    button: {
        backgroundColor: '#3b9a67', // '#007AFF',
        padding: 15,
        // flex: 1,
        // height: 50,
        // flexDirection: 'column',
        borderRadius: 50,
        marginBottom: 15,
        marginRight: 220,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        // textAlign: 'center',
    },
    // zebra
    zebraImage: {
        width: 280,
        height: 250,
        resizeMode: 'contain',
        position: 'absolute',
        marginLeft: 10,
        right: -50
    },

    // Drawer styles
    drawerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    drawerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#3b5a9a',
        backgroundColor: '#ffeedd',
        // textAlign: 'center',
        padding: 10,
        borderRadius: 10,

    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        marginLeft: 10
    },
    drawerItemIcon: {
        marginRight: 10,
    },
    drawerItemText: {
        fontSize: 18,
        color: '#567100',
    },

    // Advertisement styles
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
        color: '#de0000',
        marginBottom: 5,
    },
    adImage: {
        width: 300,
        height: 45,
    },

})

export default HomeScreen