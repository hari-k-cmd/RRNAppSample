import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import FormButton from './UIComponents/Form';
import { AuthContext } from './../Providers/AuthProvider';
import { Select } from './UIComponents/Select';

export default function HomeScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {

  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }
  const { user, logout } = context;


  return (
    <View style={styles.container}>
      <ImageBackground source={require('./../../Assets/pexels-bruno.jpg')} style={styles.image}>
        <Select />
        <View style={styles.containerForBtns}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => props.navigation.navigate('Create')}
          >
            <Text style={styles.navButtonText}>Something missing? Click here!</Text>
            <FormButton disabled={false} buttonTitle='Logout' onPress={() => logout()} />

          </TouchableOpacity>
        </View>
      </ImageBackground>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f1'
  },
  containerForBtns: {
    marginTop: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333333'
  },
  navButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});


