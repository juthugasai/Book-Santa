import React, {Component} from 'react';
import {View, Text, TextInput,ScrollView,StyleSheet,KeyboardAvoidingView,TouchableOpacity, Alert,Modal} from 'react-native';
import firebase from 'firebase'
import db from '../config';
export default class WelcomeScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            contact:'',
            confirmPassword: '',
            isModalVisible: false
        }
    }
    userLogin = (emailId, password)=>{

        firebase.auth().signInWithEmailAndPassword(emailId, password)
        .then(()=>{
            this.props.navigation.navigate('DonateBooks')
        })
        .catch((error)=>{
            //Handle errors here
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
            
        })
    }
    userSignUp = (emailId, password,confirmPassword) => {

        if(password!==confirmPassword){
            return Alert.alert("Passwords don't match\nPlease check your password")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailId, password)
            .then(()=>{
                db.collection("users").add({
                    first_name: this.firstName,
                    last_name:this.lastName,
                    contact:  this.contact,
                    email_id: this.state.emailId,
                    address:  this.state.address
                });
                return Alert.alert("User Added Successfully",
                '',
                [{text: 'OK', onPress: ()=> this.setState({isModalVisible:false})}]);
            })
            .catch(function(error){
                //Handle errors here
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
                
            })
    
        }
    }

    showModal = ()=>{
        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.isModalVisible}
                >
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <Text style={styles.modalTitle}>Registration</Text>
                            
                            <TextInput
                                style ={styles.formTextInput}
                                placeholder = {"First Name"}
                                maxLength = {10}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        firstName: text
                                    })
                                }}/>

                            <TextInput
                                style ={styles.formTextInput}
                                placeholder = {"Last Name"}
                                maxLength = {10}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        lastName: text
                                    })
                                }}/>

                            <TextInput
                                style ={styles.formTextInput}
                                placeholder = {"Address"}
                                multiline = {true}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        address: text
                                    })
                                }}/>
                            <TextInput
                                style ={styles.formTextInput}
                                placeholder = {"Contact"}
                                maxLength = {10}
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        contact: text
                                    })
                                }}/>

                            <TextInput
                                style ={styles.formTextInput}
                                placeholder = {"Email ID"}
                                keyboardType={"email-address"}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        lastName: text
                                    })
                                }}/>

                            <TextInput
                                style ={styles.formTextInput}
                                placeholder = {"Password"}
                                secureTextEntry={true}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        lastName: text
                                    })
                                }}/>

                            <TextInput
                                style ={styles.formTextInput}
                                placeholder = {"Confirm Password"}
                                secureTextEntry={true}
                                maxLength = {8}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        lastName: text
                                    })
                                }}/>

                            <View>
                                <TouchableOpacity    
                                onPress={()=>{
                                    this.userSignUp(this.state.emailId,this.state.password, this.state.confirmPassword)} }>
                                    <Text>Register</Text>
                                    </TouchableOpacity>

                                <TouchableOpacity
                                style = {styles.cancelButton}
                                onPress = {()=> this.setState({
                                    isModalVisible: false
                                })}>
                                    <Text style={{color: "#ff5722"}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>    
            </Modal>
        );
    }

    render(){
        return(
            <View style={styles.container}>

                <View style = {{justifyContent: "center", alignItems:"center"}}>
                    {this.showModal()}
                </View>
                <View>
                    <Text>Welcome to BookSanta</Text>
                </View>

                <View>
                    <TextInput
                        style  = {styles.loginBox}
                        placeholder = "abc@example.com"
                        keyboardType="email-address"
                        onChangeText = {(text)=>{
                            this.setState({
                                emailId: text
                            })
                    }}/>

                    <TextInput
                        style  = {styles.loginBox}
                        placeholder = "Password"
                        secureTextEntry={true}
                        onChangeText = {(text)=>{
                            this.setState({
                                password: text
                            })
                    }}/>

                    <TouchableOpacity
                        style={styles.button,{marginBottom:20,marginTop:20}}
                        onPress={()=>{
                            
                            this.userSignUp(this.state.emailId,this.state.password)
                        }}>
                        <Text style={styles.buttonText}>SignUp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button,{marginBottom:20,marginTop:20}}
                        onPress={()=>{
                            this.userLogin(this.state.emailId,this.state.password)
                        }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}
const styles= StyleSheet.create({
    loginBox:{
      width:300,
      height:40,
      fontSize:20,    
      margin:10,
      borderBottomWidth: 1.5,
      borderColor: "#ff8a65",
      paddingLeft: 10
    },
    button: {
        width:300,
        height:50,
        justifyContent: 'center',
        alignItem: 'center',
        borderRadius: 25,
        backgroundColor: '#ff9800', 
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
    },
    modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'#ff5722',
        margin:50
      },
      formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'#ffab91',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      container:{
        flex:1,
        backgroundColor:'#F8BE85',
        alignItems: 'center',
        justifyContent: 'center'
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
      },
})