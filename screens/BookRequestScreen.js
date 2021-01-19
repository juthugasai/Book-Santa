import React, {Component} from 'react';
import {View, Text, TextInput,StyleSheet,KeyboardAvoidingView,TouchableOpacity, Alert} from 'react-native';
import {MyHeader} from '../components/MyHeader'
import db from '../config';
import firebase from 'firebase';
export default class BookRequestScreen extends Component{
    constructor(){
        super()
        this.state={
            userId: firebase.auth().currentUser.email ,
            bookName: "",
            reasonToRequest: ""
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    
    
    addRequest=(bookName,reasonToRequest)=>{
        var userId=this.state.userId;
        var randomRequestId = this.createUniqueId();
        db.collection("requested_books").add({
            "user_id":userId,
            "book-name":bookName,
            "reason_to_request":reasonToRequest,
            "request_id":randomRequestId
        });
        this.setState({
            bookName:'',
            reasonToRequest:''
        })

        return Alert.alert("Book Requested Successfully")
        
    }
    
    
    
    render(){
        return(
          <View style={{flex:1}}>
            <MyHeader 
            title='Request Book'/>
            <KeyboardAvoidingView style={styles.keyboardStyle}>
                <TextInput style={styles.formTextInput}
                placeholder={'Enter Book Name'}
                onChangeText={(text)=>{
                    this.setState({
                        bookName:text
                    })
                }}/>
                value = {this.state.bookName}
                <TextInput style={[styles.formTextInput, {height: 300}]}
                multiline
                numberOfLines={8}
                 placeholder={'Why do you need the book?'}
                 onChangeText={(text)=>{
                     this.setState({
                         reasonToRequest:text
                     })
                 }}
                 value = {this.state.reasonToRequest}/>

                <TouchableOpacity style={styles.button}
                onPress={{}}>
                    <Text>Request</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    keyboardStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTextInput: { 
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"#ff5722",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
        },

});