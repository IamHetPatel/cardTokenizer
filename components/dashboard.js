import React, { Component } from "react";

import { Header } from "@react-navigation/elements";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, IconButton } from "react-native-paper";

export default class Dashboard extends Component{
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
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header label="Tokenizer" />
        <StatusBar barStyle={"dark-content"} />
        <Button
          onPress={() => this.props.navigation.navigate("Listing")}
          title="NextScreen"
        >
          click</Button>
      </View>
      
    </SafeAreaProvider>
  );
};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#6c5e7",
  },
});
