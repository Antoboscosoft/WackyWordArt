import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const FadeAnime = ({ children }) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Start the animation
        Animated.timing(fadeAnim, {
            toValue: 1, // Final opacity
            duration: 500, // Duration in ms
            useNativeDriver: true, // Optimize performance by using native driver
        }).start();
    }, [fadeAnim]);

    return (
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
            {children}
        </Animated.View>
    );
};


export const SlideAnime = ({ children }) => {
  const slideAnim = useRef(new Animated.Value(100)).current; 

  useEffect(() => {
    // Start the animation
    Animated.timing(slideAnim, {
      toValue: 0, // Final position (on-screen)
      duration: 1000, // Duration in ms
      useNativeDriver: true, // Optimize performance by using native driver
    }).start();
  }, [slideAnim]);

  return (
    <Animated.View style={{ flex: 1,transform: [{ translateY: slideAnim }] }} >
      {children}
    </Animated.View>
  );
};

