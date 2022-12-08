import React, { useEffect, useState } from "react";
import { Component } from "react";
import { FlatList, Text, View } from "react-native";

import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
import { Avatar, Button, Card } from "react-native-paper";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const leftContent = (props) => <Avatar.Icon {...props} icon="credit-card" />;


export default Listing = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [refetch, setRefetch] = useState(false);

  deleteCard(() => {
    
}
  );

  useEffect(() => {
    fetch("https://web-production-eedc.up.railway.app/card/", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNjAzOTM4LCJpYXQiOjE2NzA1MTc1MzgsImp0aSI6IjEzMWVlM2I4ZjNmYzRkY2M5YThiZDg4ZDhhZDdjYTE0IiwidXNlcl9pZCI6MX0.ufrODuhavXIZzc77wxIj7ERN0QYOK4Y0X0WmRWjeJTc",
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [refetch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={{ flex: 500, padding: 1 }}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: 18, color: "green", textAlign: "center" }}
              >
                Here are your cards
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "green",
                  textAlign: "center",
                  paddingBottom: 10,
                }}
              >
              </Text>
              <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                  <Card
                    style={{
                      margin: 5,
                      backgroundColor: "#8a2be2",
                      borderRadius: 10,
                      width: deviceWidth - 15,
                    }}
                  >
                    <Card.Title left={leftContent} />
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        marginLeft: 20,
                      }}
                    >
                      <Text style={{ flex: 1, fontSize: 15, color: "white" }}>
                        Bank Name :
                      </Text>
                      <Text style={{ flex: 1, fontSize: 15, color: "white" }}>
                        {item.bank}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        marginLeft: 20,
                      }}
                    >
                      <Text style={{ flex: 1, fontSize: 15, color: "white" }}>
                        Reference Id :
                      </Text>
                      <Text style={{ flex: 1, fontSize: 15, color: "white" }}>
                        {item.referenceId}
                      </Text>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        padding: 10,
                        marginLeft: 20,
                      }}
                    >
                      <Text style={{ flex: 1, fontSize: 15, color: "white" }}>
                        Expiry Date :
                      </Text>
                      <Text style={{ flex: 1, fontSize: 15, color: "white" }}>
                        {item.expDate}
                      </Text>
                    </View>
                    <Card.Actions>
                      <Button 
                      color="#FFFFFF"
                      onPress={() =>  {var myHeaders = new Headers();
                        myHeaders.append("Authorization", "Basic PEJhc2ljIEF1dGggVXNlcm5hbWU+OjxCYXNpYyBBdXRoIFBhc3N3b3JkPg==");
                        
                        var requestOptions = {
                          method: 'DELETE',
                          headers: myHeaders,
                          redirect: 'follow'
                        };
                        
                        fetch("https://web-production-eedc.up.railway.app/card/"+`${this.cardId}`, requestOptions)
                          .then(response => response.text())
                          .then(result => console.log(result))
                          .catch(error => console.log('error', error));}}
                      >Delete</Button>
                    </Card.Actions>
                  </Card>
                )}
              />
            </View>
          )}
        </View>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text style={styles.content}>{item.content}</Text>
            )}
          />
        </View>
        <Button
          title="🔀 Refresh"
          onPress={() => setRefetch(!refetch)}
          color="#66BB6A"
        >
          🔀 Refresh
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const deviceWidth = Math.round(Dimensions.get("window").width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
