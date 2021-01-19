import React, {Component} from 'react';
import {Header} from 'react-native-elements';
import {View, Text, TextInput,StyleSheet,KeyboardAvoidingView,TouchableOpacity, Alert} from 'react-native';


const MyHeader = props =>{
    return(
        <Header
        centerComponent = {{
            text: props.title,
            style: {color: "black", fontSize: 20, fontWeight: 'bold'}}}
        backgroundColor= "blue"/>
    );
}

export default MyHeader;
