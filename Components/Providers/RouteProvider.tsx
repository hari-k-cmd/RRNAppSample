import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStack from '../Navigator/Auth';
import HomeStack from './../Navigator/Home';
import { AuthContext } from './AuthProvider';
import Loading from '../Pages/UIComponents/Loading';

export default function Routes() {
    const [loading, setLoading] = useState(true);
    const [initializing, setInitializing] = useState(true);

    const context = useContext(AuthContext);
    if ( ! context ) {
      return null;
    }
    const { user, setUser } = context;
    function onAuthStateChanged(user: any) {
        setUser(user);
        if (initializing) setInitializing(false);
        setLoading(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <NavigationContainer>
            {user ? <HomeStack /> : <AuthStack />}
        </NavigationContainer>
    );
}