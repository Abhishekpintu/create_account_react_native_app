import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App'; 
import LottieView from 'lottie-react-native';

type SignUpSuccessScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUpSuccessScreen'>;
};

const SignUpSuccessScreen: React.FC<SignUpSuccessScreenProps> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/img/raklogo.png')} 
        style={styles.logo}
      />
        <Text style={styles.title}>Successfully Submitted!</Text>
        <LottieView
          source={require('../assets/anim/success.json')}  
          autoPlay
          loop
          style={styles.loader}
        />
        <Text style={styles.message}> Our representative will get in touch with you shortly</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF', 
  },
   logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CBB17',
        marginTop: 50,
    },
    loader:{
        width:'100%',
        height:300,
        marginTop:20
    },
    message:{
        fontSize:12,
        color:"gray"
    }
});

export default SignUpSuccessScreen;
