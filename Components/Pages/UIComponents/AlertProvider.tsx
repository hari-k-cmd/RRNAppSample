import React from "react";
import {  Alert } from "react-native";


export const createOneButtonAlert = (title: string,message: string | undefined) =>
Alert.alert(
  title,
  message,
  [
    { text: "OK", onPress: () => console.log("OK Pressed") }
  ]
);
