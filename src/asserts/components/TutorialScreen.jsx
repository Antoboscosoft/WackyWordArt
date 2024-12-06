import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function TutorialScreen() {
  return (
    <View style={[styles.tutorialContainer]}>
        <Text style={styles.tutorialText}>Tutorial</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    tutorialContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tutorialText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
})

export default TutorialScreen