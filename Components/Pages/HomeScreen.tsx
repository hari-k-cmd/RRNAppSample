import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import FormButton from './UIComponents/Form';
import { AuthContext } from './../Providers/AuthProvider';
import databaseResp from './../Data/database';
import { Select } from './UIComponents/Select';

export default function HomeScreen(props: { navigation: { navigate: (arg0: string) => void; }; }) {
  
  const context = useContext(AuthContext);
  if ( ! context ) {
    return null;
  }
  const { user, logout } = context;
 

  return (
    <View style={styles.container}>
          <ImageBackground source={require('./../../Assets/pexels-bruno.jpg')} style={styles.image}>
      {/* <Text style={styles.text}>Welcome user {user.uid}</Text> */}

      <Select />

      {/* <FirebaseDatabaseProvider>
          <FirebaseDatabaseNode
            path="user_bookmarks/"
            orderByKey
            // orderByValue={"created_on"}
          >
            {d => {
              return (
                <React.Fragment>
                {d}
                </React.Fragment>
              );
            }}
          </FirebaseDatabaseNode>
        </FirebaseDatabaseProvider>
 */}
   <View style={styles.containerForBtns}>
      <FormButton disabled={false} buttonTitle='Logout' onPress={() => logout()} />
      {/* <FormButton buttonTitle='Create screen' onPress={() => createDataScreen()} /> */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => props.navigation.navigate('Create')}
      >
        <Text style={styles.navButtonText}>Something missing? add here</Text>
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
  containerForBtns:{
    marginTop: -20
  },
  text: {
    fontSize: 20,
    color: '#333333'
  },
  navButton: {
    marginTop: 15
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