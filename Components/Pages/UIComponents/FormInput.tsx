import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function FormInput(props: Props) {
  const { labelValue, placeholderText, ...rest } = props;
  return (
    <TextInput
      value={props.labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={props.placeholderText}
      placeholderTextColor='#666'
      onChangeText={props.onChangeText}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: 220,
    height: 50,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    color: '#ff5722'
  }
});

export interface Props {
  labelValue?: string;
  value?: string;
  placeholderText?: any;
  onChangeText?: any;
  autoCapitalize?: any;
  keyboardType?: any;
  autoCorrect?: boolean;
  secureTextEntry?: boolean

}
