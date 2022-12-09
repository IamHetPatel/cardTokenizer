import React, { Component } from "react";
import {View,  SafeAreaView , StyleSheet,TextInput,Dimensions,ActivityIndicator,Alert,Button} from 'react-native';
import { IconButton } from "react-native-paper";
import * as SecureStore from "expo-secure-store"

const getToken = async ()=>{
  let result = {}
  result.t = await SecureStore.getItemAsync("access_token");
  result.id = await SecureStore.getItemAsync("id");
  return result
}
const deviceWidth = Math.round(Dimensions.get('window').width)
export default class Card extends Component {
   constructor() {
      super();
      this.state = {
       fullPAN: "",
         expDate: "",
        isLoading: false,
      };
   }
   updateInputVal = (val, prop) => {
      const state = this.state;
      state[prop] = val;
      this.setState(state);
    };
    functino =()=>{
      this.cardRegister();
      Alert.alert("New Card Registered");
      this.props.navigation.navigate('Listing')
    }

      
   cardRegister = () => {
    getToken()
    .then((result)=>{
      if (this.state.fullPAN === "" && this.state.expDate === "") {
         Alert.alert("Enter details to Update!");
       } else {
         this.setState({
           isLoading: true,
         });

      var myHeaders = new Headers();
         myHeaders.append("Content-Type", "application/json");
         myHeaders.append("Accept", "application/json");
         myHeaders.append("Authorization", `Bearer ${result.t}`);

var raw = JSON.stringify({

  fullPAN: this.state.fullPAN,
  expDate: this.state.expDate,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};


fetch("https://web-production-eedc.up.railway.app/card/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
}})
  .catch(error => console.log('error', error));
   }


render() {
   if (this.state.isLoading) {
     return (
       <View style={styles.preloader}>
         <ActivityIndicator size="large" color="#9E9E9E" />
       </View>
     );
   }
return (
   <SafeAreaView style={styles.container}>

      <View>
      <TextInput style = {styles.formField}
          placeholder="PanNo." 
          value={this.state.fullPAN}
          onChangeText={(val) => this.updateInputVal(val, "fullPAN")}
      />
      <TextInput style = {styles.formField}
          placeholder="Enter Expiry Date" 
          value={this.state.expDate}
          onChangeText={(val) => this.updateInputVal(val, "expDate")}
      />
      </View>
      <View style={{marginTop:30,marginBottom:30}}>     
      <IconButton
         icon="credit-card-plus-outline"
         iconColor={"#000000"}
         size={50}
         onPress={() => this.functino()}
      />
      </View>
      <Button
          color="#3740FE"
          style={styles.button}
          title="Check your cards"
          onPress={() =>this.props.navigation.navigate("Listing")}
        />
      </SafeAreaView>
   );
   }
}


const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   },
   formField:{
    marginBottom : 20,
    width : deviceWidth - 25,
    backgroundColor:'#a29bfe',
    height : 40,
    borderRadius : 20,
   }
});
   