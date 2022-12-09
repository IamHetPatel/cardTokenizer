// components/signup.js
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
// import firebase from '../database/firebase';

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      role: "CONSUMER",
      password: "",
      isLoading: false,
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  functino =()=>{
    this.registerUser();
    this.props.navigation.navigate("login");
  }

  registerUser = () => {
    if (this.state.email === "" && this.state.password === "") {
      Alert.alert("Enter details to signup!");
    } else {
      this.setState({
        isLoading: true,
      });
      //  {
      //     res.user.updateProfile({
      //       username: this.state.username
      //     })
      //     console.log('User registered successfully!')
      //     this.setState({
      //       isLoading: false,
      //       username: '',
      //       email: '',
      //       password: ''
      //     })
      //     this.props.navigation.navigate('Login')
      //   })
      //   .catch(error => this.setState({ errorMessage: error.message }))
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Accept", "application/json");
      myHeaders.append(
        "Authorization",
        "Basic PEJhc2ljIEF1dGggVXNlcm5hbWU+OjxCYXNpYyBBdXRoIFBhc3N3b3JkPg=="
      );

      var raw = JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        role: this.state.role,
        password: this.state.password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://web-production-eedc.up.railway.app/users/register",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    }
  };
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
          placeholder="Name"
          value={this.state.username}
          onChangeText={(val) => this.updateInputVal(val, "username")}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, "email")}
        />
        {/* <TextInput
          style={styles.inputStyle}
          placeholder="Role"
          value={this.state.role}
          onChangeText={(val) => this.updateInputVal(val, "role")}
        /> */}
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
          title="Signup"
          onPress={() => this.functino()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate("login")}
        >
          Already Registered? Click here to login
        </Text>
      </View>
    );
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
