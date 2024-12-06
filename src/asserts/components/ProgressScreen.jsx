import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { Text, View } from 'react-native-reanimated/lib/typescript/Animated'

function ProgressScreen() {
  return (
    <View style={[styles.profileContainer]}>
        <Text style={styles.text}>Progress</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffefdd',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'ffefdd', //'#3b5a9a',
    },
})


export default ProgressScreen