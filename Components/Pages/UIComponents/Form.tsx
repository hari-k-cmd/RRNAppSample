import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
export default function FormButton(props:Props) {
    return (
      <TouchableOpacity style={props.disabled? styles.buttonContainerDisabled : styles.buttonContainer} disabled={props.disabled} onPress={props.onPress}>
        <Text style={styles.buttonText}>{props.buttonTitle}</Text>
      </TouchableOpacity>
    );
  }

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: 220,
    height: 50,
    backgroundColor: '#ff5722',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonContainerDisabled:{
    marginTop: 10,
    width: 220,
    height: 50,
    backgroundColor: '#aaa',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff'
  }
});

export interface Props {
  buttonTitle: string;
  onPress: any;
  disabled: boolean
}
