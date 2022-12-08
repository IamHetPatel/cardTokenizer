// components/login.js
import React, { Component } from "react";
import * as SecureStore from 'expo-secure-store'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";

let statuscode = 0

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  // functino1 =()=>{
  //   this.userLogin();
  //   this.props.navigation.navigate('getDetails');
  // }

  

  _userLogin = () => {
    let res;
    console.log(res)
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signin!");
    } else {
      this.setState({
        isLoading: true,
      });
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      // myHeaders.append(
      //   "Authorization",
      //   "Basic PEJhc2ljIEF1dGggVXNlcm5hbWU+OjxCYXNpYyBBdXRoIFBhc3N3b3JkPg=="
      // );

      var raw = JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("https://web-production-eedc.up.railway.app/users/login", requestOptions)
        .then(response => {
          statuscode = response.status
          return response
        })
        .then(response => response.text())
        .then(async (result) => {
          result = JSON.parse(result)
          await SecureStore.setItemAsync("access_token", result.tokens.access_token)
          await SecureStore.setItemAsync("id", Number(result.id).toString())
          console.log(result.tokens.access_token)
          // console.log(t)
        })
        .then(() => {
          console.log("statuscode at login fxn= ", statuscode);
          if (statuscode == 200) {
            this.props.navigation.navigate('getDetails');
          }
          else {
            Alert.alert('Enter Valid Credentials')
          }
        })
        .catch(error => console.log('error', error));

    }
  }
  get userLogin() {
    return this._userLogin;
  }
  // set userLogin(value) {
  //   this._userLogin = value;
  // }
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
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, "password")}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#3740FE"
          title="Signin"
          onPress={() => this.functino()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("signup")}
        >
          Don't have account? Click here to signup
        </Text>
      </View>
    );
  }
  functino() {
    this.userLogin();
  }

}
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
});
