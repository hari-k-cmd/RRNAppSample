import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from './UIComponents/Form';
import { AuthContext } from './../Providers/AuthProvider';
import FormInput from './UIComponents/FormInput';
import database from '@react-native-firebase/database';
import { createOneButtonAlert } from './UIComponents/AlertProvider';

export default function HomeScreen() {

    const context = useContext(AuthContext);
    if (!context) {
        return null;
    }
    const { user, logout } = context;
    const [title, setTitle] = useState('');
    const [dataSnapLength, setDataSnapLength] = useState(0);
    useEffect(() => {
        getCurrentData();

    }, [dataSnapLength])

    function getCurrentData() {
        console.log("getCurrentData called")
        const data = database()
            .ref('/');
        data.on('value', (snapshot => {
            const dataSnap = snapshot.val().length;
            if (dataSnap !== dataSnapLength) setDataSnapLength(dataSnap)
        }))

    }
    let createData = async (title: any) => {
        await database().ref('/').child(dataSnapLength + "").set(
            {
                title: title,
                uid: (Math.random() * 999999999999999999) + 1,
                isChecked: false
            });

        createOneButtonAlert("Success!", 'Data updated')


    }


    return (
        <View style={styles.container}>
            <FormInput
                value={title}
                placeholderText='City'
                onChangeText={(titleSet: React.SetStateAction<string>) => setTitle(titleSet)}
                autoCapitalize='none'
                autoCorrect={false}
            />

            <FormButton disabled={false} buttonTitle='Create' onPress={() => createData(title)} />
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
    text: {
        fontSize: 20,
        color: '#333333'
    }
});