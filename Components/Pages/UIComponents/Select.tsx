import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import database from '@react-native-firebase/database';
import CheckBox from '@react-native-community/checkbox';
import FormInput from "./FormInput";

export const allValue = {
    title: '',
    uid: 0,
    isChecked: false
}

export const Select = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [allValues, setAllValues] = useState([allValue]);
    const [allValuesLocal, setAllValuesLlocal] = useState([allValue]);
    const [dataSnapLength, setDataSnapLength] = useState(0);


    const searchData = (text: string) => {
        setSelectedValue(text);
        text = text.toLowerCase()
        let trucks = allValuesLocal;
        let filteredName = trucks.filter((item) => {
            return item.title.toLowerCase().match(text)
        })
        if (!text || text === '') {
            setAllValues(allValuesLocal);
        } else if (!Array.isArray(filteredName) && !filteredName) {
           // tobe
        } else if (Array.isArray(filteredName)) {
            setAllValues(filteredName);
        }


    };

    const setToggleCheckBoxFuntion = (title: any, index: number, uid:number, isChecked2: boolean) => {
        let temp = allValues.map((allValue) => {
          if (index === allValue.uid) {
            return { ...allValue, isChecked: !allValue.isChecked };
          }
          return allValue;
        });
        setAllValues(temp);
        createData(title, index, uid, !isChecked2)
      };
    
    
      let createData = (title: any, index: number, uid:number, isChecked: boolean) => {
        database().ref('/').child(index+ "").update(
            {
                title,
                uid,
                isChecked
            });
    }
    useEffect(() => {
        database()
            .ref('/')
            .once('value')
            .then(snapshot => {
                setAllValues(snapshot.val());
                setAllValuesLlocal(snapshot.val())
                const dataSnap = snapshot.val().length;
                if (dataSnap !== dataSnapLength) setDataSnapLength(dataSnap)
            }).catch(err => {
                console.log('User error: ', err);
                return err
            });
 

    }, [])
    return (
        <View style={styles.container}>
            <FormInput
          placeholderText='Enter text to search'
          onChangeText={(text: string) => searchData(text)} 
          value={selectedValue}
          autoCapitalize='none'
          autoCorrect={false}
        />
            <FlatList
                data={allValues}
                renderItem={({ item, index }) =>

                    <View key={item.uid} style={styles.viewLayout}>
                          <CheckBox
                            value={item.isChecked}
                            onChange={(newValue: any)=> {
                              
                                setToggleCheckBoxFuntion(item.title, index, item.uid, item.isChecked)}
                            }
                            />
                        <Text style={styles.itemUID}>{item.uid} -</Text>
                        <Text style={styles.item}>{item.title}</Text>
                    </View>
                } />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    item: {
        padding: 10,
        fontSize: 14,
        height: 44,
        width: 180
    },
    itemUID:{
        padding: 10,
        fontSize: 14,
        height: 44,
        width: 180
    },
    viewLayout:{
        flex: 1,
        flexDirection:'row'
    }
});


