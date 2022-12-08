import React from 'react';
import { Container,Row,Col,Form ,Button} from 'bootstrap';
import {connect} from 'react-redux';
const axios = require('axios');

class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.id,
            fname:this.props.fname,
            lname:this.props.lname,
            uploadedFile:null
        }
    }

    fetchUserDetails=(id)=>{
        //console.log(user_id);
        var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic <credentials>");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
};
        axios.get("https://web-production-eedc.up.railway.app/users/consumer/:id"+user_id,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
            this.setState({email:res
                .data.results[0].email});
            this.setState({profileImage:res.data.results[0].profileImage})
        })
        .catch(err=>console.log(err))
    }

    changeProfileImage=(event)=>{
       
        this.setState({uploadedFile:event.target.files[0]});
    }

    UpdateProfileHandler=(e)=>{
        e.preventDefault();
        //create object of form data
        const formData=new FormData();
        formData.append("profileImage",this.state.uploadedFile);
        formData.append("user_id",this.state.user_id);

        //update-profile
        axios.post("https://web-production-eedc.up.railway.app/users/consumer/:id",formData,{
            headers: {
                "content-type": "application/json"
              }
        }).then(res=>{
            console.log(res);
           this.setState({msg:res.data.message});
           this.setState({profileImage:res.data.results.profileImage});
        })
        .catch(err=>console.log(err))
    }


    componentDidMount(){
     this.fetchUserDetails(this.state.user_id);
    }

render(){

    if(this.state.profileImage){
        var imagestr=this.state.profileImage;
        imagestr = imagestr.replace("public/", "");
        var profilePic="http://localhost:5000/"+imagestr;
    }else{
         profilePic=DefaultUserPic;
    }

    return (
        <Container>
        <Row>
       <Col>
       <img src={profilePic} alt="profils pic" />
       </Col>
        <Col>
            <h1>User Profile</h1>
            <Form className="form">     
    <p>{this.state.msg}</p>
  <Form.Group controlId="formCategory1">
    <Form.Label>Username</Form.Label>
    <Form.Control type="text" defaultValue={this.state.username}/>
  
  </Form.Group>
  <Form.Group controlId="formCategory2">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" defaultValue={this.state.email} />
  
  </Form.Group>
 
  {/* <Form.Group controlId="formCategory4">
    <Form.Label>Profile Image</Form.Label>
    <Form.Control type="file" name="profileImage" onChange={this.changeProfileImage}/>
    </Form.Group>
  <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button> */}
  </Form>
   </Col>

       </Row>
        </Container>
    )
}
}

const mapStatetoProps=(state)=>{
    return{
        user_id:state.user.userDetails.userid,
        username:state.user.userDetails.username,
       email:state.user.email,
    //    profileImage: state.user.profileImage,
       msg:state.user.msg
    }
   }
   
   

   export default connect(mapStatetoProps)(UserProfile);



// import React, { useState } from 'react';
// import { View, TextInput, Button, AsyncStorage } from '@react-native-async-storage/async-storage';

// const UserProfile = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [Number, setPhone] = useState('');

//   const saveProfile = async () => {
//     try {
//       await AsyncStorage.setItem('@user:name', name);
//       await AsyncStorage.setItem('@user:email', email);
//       await AsyncStorage.setItem('@user:phone', Number);
//     } catch (e) {
//       // saving error
//     }
//   };

//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={text => setName(text)}
//       />
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={text => setEmail(text)}
//       />
//       <TextInput
//         placeholder="Phone"
//         value={Number}
//         onChangeText={text => setPhone(text)}
//       />
//       <Button title="Save Profile" onPress={saveProfile} />
//     </View>
//   );
// };

// export default UserProfile;

