import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Alert
} from "react-native";

import * as SecureStore from "expo-secure-store"

const getToken = async ()=>{
  let result = {}
  result.t = await SecureStore.getItemAsync("access_token");
  result.id = await SecureStore.getItemAsync("id");
  return result
}

export default class Update extends Component {
  
  constructor() {
    super();
    this.state = {
      user: "",
      fname: "",
      lname: "",
      phone: "",
      isLoading: false,
    };
  }
  
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };
  functino =()=>{
    this.userUpdate();
    Alert.alert("Details Updated");
    this.props.navigation.navigate('UserProfile');
  }
  
  userUpdate = () => {
    getToken()
    .then((result)=>{
      let id = result.id;
    if (this.state.fname === "" && this.state.lname === "" && this.state.user === "" && this.state.phone === "") {
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
      user: this.state.user,
      fname: this.state.fname,
      lname: this.state.lname,
      phone: this.state.phone
})

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
fetch("https://web-production-eedc.up.railway.app/users/consumer/"+`${id}`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
}})
  .catch(error => console.log("error", error));
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
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="UserID"
          value={this.state.user}
          onChangeText={(val) => this.updateInputVal(val, "user")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="FirstName"
          value={this.state.fname}
          onChangeText={(val) => this.updateInputVal(val, "fname")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="LastName"
          value={this.state.lname}
          onChangeText={(val) => this.updateInputVal(val, "lname")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Phone"
          value={this.state.phone}
          onChangeText={(val) => this.updateInputVal(val, "phone")}
        />
     <View style={{marginTop:30,marginBottom:30}}>
       <Button
          color="#981ddf"
          style={styles.button}
          title="Update"
          onPress={() =>  this.functino()}
        />
        </View> 
        <Button
          color="#981ddf"
          style={styles.button}
          title="Home"
          onPress={() =>this.props.navigation.navigate('Dashboard')}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  inputStyle: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    margin: 500, 
    padding:500,
  },
});

    