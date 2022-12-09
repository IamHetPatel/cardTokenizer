import React, { useEffect, useState } from 'react';
import {Text, View,StyleSheet,Button,Dimensions } from 'react-native';
import * as SecureStore from "expo-secure-store"

const getToken = async ()=>{
  let result = {}
  result.t = await SecureStore.getItemAsync("access_token");
  result.id = await SecureStore.getItemAsync("id");
  return result
}

// const deviceWidth = Math.round(Dimensions.get('window').width)

export default UserProfile = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fname, setFname] = useState([]);
  const [lname, setLname] = useState([]);
  const [phone, setPhone] = useState([]);
  console.log(data);
  
  useEffect(() => {
    getToken()
    .then((result)=>{
      let id = result.id;
    fetch('https://web-production-eedc.up.railway.app/users/consumer/'+`${id}`,{
        method: "GET",
        headers:{
            Authorization:
            `Bearer ${result.t}`
        }
    })
      .then((response) => response.json())
      .then((json) => {setData(json);
      setFname(json.fname);
      setLname(json.lname);
      setPhone(json.phone);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    })
    .catch(err=>console.log(err))
    
  }, []);

  return (
    <View>
    <View>
      {isLoading ? <Text>Loading...</Text> : 
      ( <><View style={styles.TextView}>
              <Text style={{ marginBottom: 5, fontWeight: '500' }}>FirstName: {fname}</Text>
            </View>
            <View style={styles.TextView}>
                <Text style={{ marginBottom: 5, fontWeight: '500' }}>LastName: {lname}</Text>
              </View>
              <View style={styles.TextView}>
                <Text style={{ marginBottom: 5, fontWeight:'500' }}>Phone: {phone}</Text>
              </View></>
      )}
    </View>
    <View style={{marginTop:30,marginBottom:30}}>
        <Button
          color="#3740FE"
          style={styles.button}
          title="Edit"
          onPress={() =>navigation.navigate("UpdateProfile")}
        />
        </View>
        <Button
          color="#3740FE"
          style={styles.button}
          title="Create your CARDs"
          onPress={() =>navigation.navigate("Card")}
        />
      
  </View>
  );
};

const styles = StyleSheet.create({
  TextView: {
    alignItems : 'center',
    backgroundColor : '#a29bfe',
    fontColor : '#FFFFFF',
    marginBottom : 15,
    borderRadius : 10,
    // width : deviceWidth - 25,
    height : 25
  },
    item:{
        flex:1,
        alignSelf:'stretch',
        marginBottom:50,
        padding:20,
        alignItems:'center',
        borderBottomColor:'#fff800',
        borderBottomWidth:10,
        justifyContent:'center',
    },
    container:{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: 35,
      backgroundColor: "#fff",
      alignItems:'flex-start',
        
    },
    button: {
      flex:1,
      justifyContent:'center',
      alignContent:'center',
      margin: 500, 
      padding:500,
    },
})
