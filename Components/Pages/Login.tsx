import React, { useState, useContext } from 'react';
import { View, ImageBackground, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FormButton from './UIComponents/Form';
import FormInput from './UIComponents/FormInput';
import { AuthContext } from './../Providers/AuthProvider';
import { emailValidate } from '../Helpers/EmailValidate';
import { passwordValidate } from '../Helpers/PasswordValidate';

export default function LoginScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [touched, setTouched] = useState(false);

  const context = useContext(AuthContext);
  if ( ! context ) {
    return null;
  }
  const { login,register } = context;


  return (

    <View style={styles.container}>
    <ImageBackground source={require('./../../Assets/pexels-bruno.jpg')} style={styles.image}>
      <Text style={styles.text}>Welcome to RRN App</Text>
      <View style={styles.formContainer}>
        <FormInput
          value={email}
          placeholderText='Email'
          onChangeText={(userEmail: React.SetStateAction<string>) => {
            setTouched(true)
            setEmail(userEmail),
              setValidEmail(emailValidate(userEmail))
          }
          }
          autoCapitalize='none'
          keyboardType='email-address'
          autoCorrect={false}
        />
        <FormInput
          value={password}
          placeholderText='Password'
          onChangeText={(userPassword: React.SetStateAction<string>) => {
            setTouched(true)
            setPassword(userPassword)
            setValidPassword(passwordValidate(userPassword))
          }}
          secureTextEntry={true}
        />

        {touched && !validEmail? <Text style={styles.textError}>* Please enter valid email address </Text> :null}
        {touched && !validPassword? <Text style={styles.textError}>* Password should have atleast 6 alpha numaric characters </Text>:null}

        <FormButton
          buttonTitle='Sign-in'
          disabled={!(validEmail && validPassword)}
          onPress={() => register(email, password)}
        />
      </View>
    </ImageBackground>

  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
},
text: {
  color: "#ff5722",
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 10,
  marginTop: -50
},
textError:{
  fontSize: 10,
  color: "red",
},
image: {
  flex: 1,
  resizeMode: "cover",
  justifyContent: "center"
},
formContainer: {
  left: 75,
},
navButton: {
  marginTop: 15
},
navButtonText: {
  fontSize: 16,
  color: '#ff5722'
}
});
