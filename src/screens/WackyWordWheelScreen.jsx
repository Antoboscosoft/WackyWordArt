import React, { useRef, useState } from 'react';
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';


function WackyWordWheelScreen({ navigation }) {
  // List of verbs for the wheel
  const verbs = ['Dance', 'Walk', 'Jog', 'Run', 'Read', 'Eat', 'Sing', 'Play'];

  // State to manage the selected verb
  const [selectedVerb, setSelectedVerb] = useState('');

  // Sentence template
  const sentenceTemplate = 'Every morning, I [verb] to start my day.';

  // Callback when the wheel stops
  const onWheelFinish = (winner) => {
    setSelectedVerb(winner); // Update the selected verb
  };


  return (
    <View style={[styles.container]}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <View style={styles.circle}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}> Wacky Word Wheel </Text>
      </View>

      {/* Center Content Section */}
      <View style={styles.content}>
        <View style={styles.sentenceRow}>
          {/* Buttons */}
          <Text style={styles.sentenceText}>
            Inprogress
          </Text>
         
        </View>
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
  )
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
    justifyContent: 'flex-start',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    gap: 75,
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

  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  // Content styles
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
  sentenceRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  sentenceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#bbb',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#333',
    minWidth: 10,
    maxWidth: 120,
    textAlign: 'left',
  },
  dropdown: {
    width: 150,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  placeholder: {
    fontSize: 14,
    color: '#aaa',
  },
  selectedText: {
    fontSize: 14,
    color: '#333',
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


export default WackyWordWheelScreen