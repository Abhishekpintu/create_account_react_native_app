import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BASEURL, COLOR_000, COLOR_b0c4de, LIGHT_GRAY, PRIMARY_COLOR, SECONDARY_COLOR, SIGNUP_USER } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { login } from '../store/slices/authSlice';

type SignUpScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignUpScreen'>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {

    
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const [fullName, setFullName] = useState('');
    const [emailId, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    /**
     * validates emailID 
     */
    const validateEmail = (emailId: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return emailRegex.test(emailId);
    };

    /**
     * validates Password, regex is alphanumeric 
     */
    const validatePassword = (password: string): boolean => {
        const alphanumericRegex = /^[a-zA-Z0-9]+$/; // Check for both letters and numbers
        return alphanumericRegex.test(password);
    };

    /**
     * validates all inputs  
     */
    const validateInputs = () => {
        let valid = true;
        if (!fullName.trim()) {
            setFullNameError('Full Name is required');
            valid = false;
        } else {
            setFullNameError('');
        }

        if (!emailId.trim()) {
            setEmailError('Email ID is required');
            valid = false;
        } else if (!validateEmail(emailId)) {
            setEmailError('Please enter a valid email address');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            valid = false;
        } else if (!validatePassword(password)) {
            setPasswordError('Password should contain only letters and numbers');
            valid = false;
        }
        else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            valid = false;
        }
        else {
            setPasswordError('');
        }

        return valid;
    };

    /**
     * Based on the validation, data is posted to server
     */
    const handleSignup = async () => {

        if (validateInputs()) {
            setIsLoading(true);
          
            try {
                const response = await fetch(BASEURL+SIGNUP_USER, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        fullName,
                        emailId,
                        password,
                        isTermsAndConditionsAgreed:isChecked
                  }),
                });
                console.log(response)
                if (response.ok) {
                    
                    navigation.replace('SignUpSuccessScreen'); 
                  
                  // Dispatch login action with user data
                    dispatch(login({ fullName, emailId }));
                
                } else {
                  const errorResult = await response.json();
                  if (errorResult.message.includes('Email')) {
                    setEmailError(errorResult.message);
                  }

                  if (errorResult.message.includes('Password')) {
                    setPasswordError(errorResult.message);
                  }
                  console.log(errorResult)
                }
              } catch (error) {
                Alert.alert('Signup Failed', 'Network error. Please try again later.');
              }
              finally {
                setIsLoading(false);
              }
            }
    }

    return (
        <View style={styles.container} testID="SignupScreenContainer">
            <Image
                source={require('../../assets/img/raklogo.png')}
                style={styles.logo}
            />
            <Text style={styles.title}>Create Account</Text>


            {/* Full Name Input */}
            <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="#666" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    value={fullName}
                    maxLength={50} //max allowed 50 characters
                    onChangeText={setFullName}
                />
            </View>
            {fullNameError ?
                <Text style={styles.errorText}>{fullNameError}</Text>
                : null}

            {/* Email Input */}
            <View style={styles.inputContainer}>
                <Icon name="envelope" size={20} style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Email ID"
                    value={emailId}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            {emailError ?
                <Text style={styles.errorText}>{emailError}</Text>
                : null}

            {/* Password Input */}
            <View style={styles.inputContainer}>
                <Icon name="lock" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} testID='passwordToggle'>
                    <Icon name={showPassword ? "eye-slash" : "eye"} style={styles.icon} />
                </TouchableOpacity>
            </View>

            {passwordError ?
                <Text style={styles.errorText}>{passwordError}</Text>
                : null}

            {/* Terms and Conditions Checkbox */}
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20 }}>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => setIsChecked(!isChecked)} testID='termNcondition'>
                    <Icon name={isChecked ? "check-square" : "square"} style={[styles.icon, { fontSize: 20, marginLeft: 0 }]} />
                    <Text>I agree with <Text style={{ color: PRIMARY_COLOR }}>Terms</Text> and <Text style={{ color: PRIMARY_COLOR }}>Privacy</Text></Text>
                </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            {isLoading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) :  <TouchableOpacity style={[
                styles.signupButton,
                { backgroundColor: isChecked ? PRIMARY_COLOR : COLOR_b0c4de },
            ]} disabled={!isChecked}

                onPress={handleSignup}>
                <Text style={styles.signupButtonText}>SIGN UP</Text>
            </TouchableOpacity>
}   
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', // Background color
    },
    logo: {
        width: 300,
        height: 100,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: SECONDARY_COLOR,
        marginTop: 20,
        alignSelf: 'flex-start'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        borderColor: LIGHT_GRAY,
        borderWidth: 2,
        padding: 2,
        marginTop: 20,
        width: '100%',

    },
    icon: {
        marginRight: 10,
        color: LIGHT_GRAY,
        fontSize: 16,
        marginLeft: 10
    },
    input: {
        flex: 1,
        fontSize: 14,
    },
    signupButton: {
        backgroundColor: PRIMARY_COLOR,
        padding: 15,
        flexDirection: 'row',
        borderRadius: 10,
        marginTop: 20,
        elevation: 3, // For shadow effect on Android
        shadowColor: COLOR_000, // For shadow effect on iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    signupButtonText: {
        color: '#fff',
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
    },
    errorText: {
        color: PRIMARY_COLOR,
        fontSize: 12,
        alignSelf: 'flex-start',
        marginTop: 2
    }
});

export default SignUpScreen;
