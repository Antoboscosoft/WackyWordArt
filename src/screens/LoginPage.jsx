import React, { useRef } from 'react'
import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

function LoginPage({ navigation }) {

  const bounceAnim = useRef(new Animated.Value(1)).current;


  const handleLogin = () => {
    console.log("Login pressed");
  };

  const handlePressIn = () => {
    Animated.spring(bounceAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    // Bounce back animation
    Animated.spring(bounceAnim, {
      toValue: 1, // Scale back to original size
      friction: 3, // Smooth animation
      tension: 40,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Home');
    });
  };


  return (
    <View style={[styles.container]}>
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
      <Image
        source={require('../assets/images/zebras/CuteZebrabg.png')}
        style={[styles.mascotImage]}
      />
      <Text style={styles.title}> Welcome to Kid's World! </Text>
      <Text style={styles.subtitle}>Let's Learn & Play Together</Text>

      {/* <TextInput
        placeholder='Enter your username'
        style={styles.input}
        placeholderTextColor={'#000000'}
      />
      <TextInput
        placeholder='Enter your password'
        secureTextEntry={true}
        style={styles.input}
        placeholderTextColor={'#000000'}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.registerText}>Don't have an account? Register here</Text>
            </TouchableOpacity> */}

      <Animated.View style={[styles.animatedButton, { transform: [{ scale: bounceAnim }] }]}>
        <TouchableOpacity
          onPress={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.registerText}>Click to go Home </Text>
        </TouchableOpacity>
      </Animated.View>
      {/* </ScrollView> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ffdf7e',
    // backgroundColor: '#1cbc9f',
    backgroundColor: '#e6810d',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    // color: '#ff6347', // Playful orange color
    color: '#e5e1e0', // Playful orange color
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Comic Sans MS', // Fun font
  },
  subtitle: {
    fontSize: 18,
    // color: '#444',
    color: '#085bea',
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Comic Sans MS',
  },
  input: {
    width: '80%',
    // backgroundColor: '#ffa07a', // Light orange input background
    backgroundColor: '#f7e1d8', // Light orange input background
    borderRadius: 25,
    padding: 15,
    marginBottom: 15,
    color: '#fff', // White text
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
    textAlignVertical: 'center',
  },
  loginButton: {
    // backgroundColor: '#32cd32', // Bright green button
    backgroundColor: '#084208', // Bright green button
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: '80%',
  },
  loginButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //   registerText: {
  //     color: '#ff4500', // Bright red for register text
  //     fontSize: 16,
  //     marginTop: 10,
  //     textDecorationLine: 'underline',
  //     textAlign: 'center',
  //   },
  animatedButton: {
    alignSelf: 'center',
  },
  registerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#32cd32',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#32cd32',
    backgroundColor: '#fff',
    textAlign: 'center',
    textShadowColor: '#32cd32',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});


export default LoginPage