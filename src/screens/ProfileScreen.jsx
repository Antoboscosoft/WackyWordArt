import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Background from '../components/Background';
import FastImage from 'react-native-fast-image';

function ProfileScreen({ navigation }) {
    const [isEditing, setIsEditing] = useState(false);
    const [userName, setUserName] = useState('John Doe');
    const [userEmail, setUserEmail] = useState('johndoe@example.com');
    const [savedMessage, setsavedMessage] = useState();


    // useEffect(() => {
    //     const loadProfile = async () => {
    //         const savedName = await AsyncStorage.getItem('userName');
    //         const savedEmail = await AsyncStorage.getItem('userEmail');
    //         if(savedName) setUserName(savedName);
    //         if(savedEmail) setUserEmail(savedEmail);
    //     };

    //     // loadProfile();
    // }, []);



    const toggleEdit = async() => {
        if (isEditing) {
            console.log("Saved : ", userName, userEmail);
            // return;
            // Saving data to async:
            await AsyncStorage.setItem('userName', userName);
            await AsyncStorage.setItem('userEmail', userEmail);
            setsavedMessage("Saved Successfully");
            setTimeout(() => {
                setsavedMessage();
            }, 2000);
        }

        setIsEditing(!isEditing);
    };


    return (
        <View style={styles.container}>
            <Background>
                <Header title="Profile" navigation={navigation} />
                <ScrollView contentContainerStyle={styles.content}>
                    {/* Profile Picture */}
                    <View style={styles.profilePictureContainer}>
                        <FastImage
                            source={require('../assets/images/profileimg01.png')}
                            style={[styles.profilePicture]}
                        // resizeMode="cover"
                        />
                    </View>

                    {/* User Info */}
                    {isEditing ? (
                        <View style={styles.editableContainer}>
                            <TextInput
                                style={styles.input}
                                value={userName}
                                onChangeText={setUserName}
                                placeholder="Enter your name"
                                placeholderTextColor='#aaa'
                            />
                            <TextInput
                                style={styles.input}
                                value={userEmail}
                                onChangeText={setUserEmail}
                                placeholder="Enter your email"
                                placeholderTextColor='#aaa'
                                keyboardType="email-address"
                            />
                        </View>
                    ) : (
                        <>
                            <Text style={styles.userName}>{userName}</Text>
                            <Text style={styles.userEmail}>{userEmail}</Text>
                        </>
                    )}

                    {/* Action Buttons */}
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity style={styles.button}  disabled
                        // onPress={toggleEdit}
                        >
                            <Text style={styles.buttonText}>
                            {/* Edit Profile */}
                            {isEditing ? 'Save' : 'Edit Profile'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
                            <Text style={styles.buttonText}>Settings</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Additional Info */}
                    <View style={styles.additionalInfo}>
                        <Text style={styles.infoStyle}>About</Text>
                        <Text style={styles.infoText}>Hi, I’m John Joe. I love music, traveling, and coding! This is my profile page.</Text>
                    </View>

                </ScrollView>
            </Background>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alighnItems: 'center',
        padding: 20,
        // marginTop: 20,
    },
    profilePictureContainer: {
        // alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 3,
        borderColor: '#da8113',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        // textAlign: 'center',
        marginHorizontal: 15,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        // textAlign: 'center',
        marginHorizontal: 15,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        width: '45%',
        height: 40,
        backgroundColor: '#db6d0c',
        // backgroundColor: '#f3095b',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',

        // paddingVertical: 10,
        // paddingHorizontal: 20,
        // borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    additionalInfo: {
        width: '100%',
        marginTop: 20,
        backgroundColor: '#f7f7f7',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    infoStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        color: '#666',
        lineHeight: 20,
    },
})

export default ProfileScreen