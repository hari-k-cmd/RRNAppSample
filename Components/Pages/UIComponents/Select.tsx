import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker';
// import databaseResp from './../../Data/database';
import database from '@react-native-firebase/database';
import CheckBox from '@react-native-community/checkbox';
import FormInput from "./FormInput";


function handleConfirm(pItems: any) {
    // throw new Error("Function not implemented.");
    console.log('pItems =>', pItems);

}

export const allValue = {
    title: '',
    uid: 0,
    isChecked: false
}

export const Select = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [allValues, setAllValues] = useState([allValue]);
    const [toggleCheckBox, setToggleCheckBox] = useState(true);
    const [allValuesLocal, setAllValuesLlocal] = useState([allValue]);
    const [dataSnapLength, setDataSnapLength] = useState(0);


    const searchData = (text: string) => {
        // setAllValues(allValuesLocal);
        // const newData = allValues.filter((item) => {
        //     return item.title.search(text) > -1;
        // });
        // setAllValues(newData);
        setSelectedValue(text);

        console.log(text);

        text = text.toLowerCase()
        let trucks = allValuesLocal;
        let filteredName = trucks.filter((item) => {
            return item.title.toLowerCase().match(text)
        })
        if (!text || text === '') {
            setAllValues(allValuesLocal);
        } else if (!Array.isArray(filteredName) && !filteredName) {
            // set no data flag to true so as to render flatlist conditionally
            //   this.setState({
            //     noData: truex
            //   })
        } else if (Array.isArray(filteredName)) {
            //   this.setState({
            //     noData: false,
            //     data: filteredName
            //   })
            setAllValues(filteredName);
        }


    };

    // function setToggleCheckBoxFuntion(newValue: any, index: number): void {
    //     if(!newValue) newValue = false

    //     console.log(newValue, index)
    //     setAllValues(allValuesLocal);
    //     var tempAllValueChecked = allValues;
    //     tempAllValueChecked[index].isChecked === newValue;
    //     setAllValues(tempAllValueChecked);

    // }

    const setToggleCheckBoxFuntion = (title: any, index: number, uid:number, isChecked2: boolean) => {
        let temp = allValues.map((allValue) => {
          if (index === allValue.uid) {
            return { ...allValue, isChecked: !allValue.isChecked };
          }
          return allValue;
        });
        setAllValues(temp);

        console.log(!isChecked2);
        console.log(index);
        console.log(title);
        createData(title, index, uid, !isChecked2)
      };
    
    
      let createData = (title: any, index: number, uid:number, isChecked: boolean) => {

        // console.log('2777777777777777', dataSnapLength);
        database().ref('/').child(index+ "").update(
            {
                title,
                uid,
                isChecked
            });


    }

    

    useEffect(() => {
        // let data: any = databaseResp()
        // console.log(data);
        // if (data !== undefined) {
        //     setAllValues(data);
        // }
        console.log('(*******************************)');

        database()
            .ref('/')
            .once('value')
            .then(snapshot => {
                //   console.log('User data: ', snapshot.val());
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
            {/* <Text >Welcome ssss</Text> */}
            {/* <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue: any, itemIndex: any) =>
                    setSelectedValue(itemValue)
                }>
                {allValues.map((i: { uid: any; title: any; }) =>
                    <React.Fragment key={i.uid}>
                        <CheckBox
                            value={toggleCheckBox}
                            onValueChange={(newValue: any) => setToggleCheckBox(newValue)} />
                        <Picker.Item  label={i.title} value={i.title} />
                    </React.Fragment>
                )}

            </Picker> */}
            {/* <TextInput onChangeText={(text) => searchData(text)} value={selectedValue} /> */}
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
                            // onValueChange={(newValue: any) => setToggleCheckBox(newValue)} 
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
        // paddingTop: 40,
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


