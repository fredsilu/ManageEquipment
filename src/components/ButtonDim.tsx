import React, { useState } from 'react';
import { TouchableWithoutFeedback, Animated, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface Button3DProps {
  title: string;
  onPress: () => void;
}

const Button3D: React.FC<Button3DProps> = ({ title, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);
  const animatedValue = new Animated.Value(1);

  const handlePressIn = () => {
    setIsPressed(true);
    Animated.spring(animatedValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  const animatedStyle = {
    transform: [{ scale: animatedValue }],
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <LinearGradient
          colors={isPressed ? ['#6a11cb', '#2575fc'] : ['#4c669f', '#3b5998']}
          style={styles.gradient}
        >
          <Text style={styles.text}>{title}</Text>
          <FontAwesomeIcon icon={faChevronRight} size={18} color="#ffffff" />
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginVertical: 10,
  },
  gradient: {
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'cursive', // Vous pouvez charger une police spécifique avec expo-font si nécessaire
    marginRight: 10,
  },
});

export default Button3D;
