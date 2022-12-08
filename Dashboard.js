import React from "react";
import { Header } from "@react-navigation/elements";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, IconButton } from "react-native-paper";

const Dashboard = ({ navigation }) => {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header label="Tokenizer" />
        <Text>Tokenising Action Going on</Text>
        <StatusBar barStyle={"dark-content"} />
        <IconButton
          icon="account-box"
          iconColor={`#8a2be2`}
          size={50}
          onPress={() => navigation.navigate('getDetails')}
        />
        <Button
          color="#981ddf"
          style={styles.button}
          title="Card Details"
          onPress={() =>  navigation.navigate('card')}
        >Card Details</Button>
        
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: "#307ecc",
  },
});

export default Dashboard;
