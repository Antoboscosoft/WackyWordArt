import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native'

function WackyWordWheelScreen({navigation}) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>Wacky Word Wheel</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#3b5a9a"
    }

})

export default WackyWordWheelScreen