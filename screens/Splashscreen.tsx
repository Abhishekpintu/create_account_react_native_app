import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; 

type SplashScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SplashScreen'>;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('SignUpScreen'); 
    }, 2000); // Duration of the splash screen (2 seconds)
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/raklogo.png')} 
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', 
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode:'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default SplashScreen;
