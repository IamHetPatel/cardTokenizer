
import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

export default class Welcome extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  render() {
    this.state = {}
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          Welcome to the most secure card tokenizer!!!
        </Text>
        
        <View style = {{marginBottom:30}}><Button
          color="#3740FE"
          title="Signin"
          onPress={() => this.props.navigation.navigate('login')}
        />
        </View>
        <Button
          color="#3740FE"
          title="Signup"
          onPress={() => this.props.navigation.navigate('signup')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  textStyle: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: "center"

  },
});
