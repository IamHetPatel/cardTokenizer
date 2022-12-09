import React from "react";
import { Header } from "@react-navigation/elements";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, IconButton } from "react-native-paper";

const Dashboard = ({ navigation }) => {
  return (
      <View style={styles.container}>
        <Header label="Tokenizer" />
        <Text>Click here to view your User Profile</Text>
        <StatusBar barStyle={"dark-content"} />
        <View style={{marginTop:30,marginBottom:30}}>
        <IconButton
          icon="account-box"
          iconColor={`#8a2be2`}
          size={50}
          onPress={() => navigation.navigate('UserProfile')}
        />
        </View>
        <Button
          color="#981ddf"
          title="Card Details"
          onPress={() => navigation.navigate('Card')}
        >Card Details</Button>
        
      </View>
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
