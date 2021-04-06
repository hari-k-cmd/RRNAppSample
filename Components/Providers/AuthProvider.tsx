import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { createOneButtonAlert } from '../Pages/UIComponents/AlertProvider';

export const AuthContext = createContext<IAuth | null>(null);

type ComponentProps = {
  children: any;
}
export const AuthProvider = (props: ComponentProps): JSX.Element =>{
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email: string, password: string) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            
            createOneButtonAlert("Login failed", e.message)
          }
        },
        register: async (email: string, password: string) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
            if(e.message.includes('email address is already in use')){
              try {
                await auth().signInWithEmailAndPassword(email, password);
              } catch (e) {
                console.log(e);
                
                createOneButtonAlert("Login failed", e.message)
              }
            } else{
            createOneButtonAlert("Register failed", e.message)
            }
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.error(e);
            createOneButtonAlert("Logout failed", e.message)

          }
        }
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export interface IAuth {
  user: any,
  setUser: any,
  login: any,
  register: any,
  logout: any
}