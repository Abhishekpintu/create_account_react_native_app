import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator'; 
import LottieView from 'lottie-react-native';
import { COLOR_GREEN } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';

type SignUpSuccessScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SignUpSuccessScreen'>;
};

const SignUpSuccessScreen: React.FC<SignUpSuccessScreenProps> = ({ navigation }) => {

  /**
   * Below is the common state used to demonstrate the use of redux 
   */
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/raklogo.png')} 
        style={styles.logo}
      />
        <Text style={styles.title}>Successfully Submitted!</Text>
        <LottieView
          source={require('../../assets/anim/success.json')}  
          autoPlay
          loop
          style={styles.loader}
        />
        {/* fullName and emailId is used from the store */}
        <Text style={styles.message}>Our representative will get in touch with you shortly, <Text style={{fontWeight:'bold'}}>{user?.fullName}({user?.emailId})</Text></Text>
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
        color: COLOR_GREEN,
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
