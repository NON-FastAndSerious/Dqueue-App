/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Container, Avatar, Button, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import Cookies from "universal-cookie";
import store from "./../images/store.png";
import { Navigate } from "react-router-dom";


const cookies = new Cookies();

const StoreForm = () => {
  const [name,setName] = React.useState("");
  const [phoneNumber , setPhoneNumber] = React.useState(null);
  const [toBarcode , setToBarcode] = React.useState(false);

  const submitButton = (e) => {
    e.preventDefault();
    console.log("idhra");
    if(name.length === 0 || phoneNumber === null){
      alert("Enter Valid Details");
      return;
    }
    setToBarcode(true);
    cookies.set('user' , {name : name , phNo : phoneNumber} ,  { path: '/' });
  }
  if(toBarcode) {
    return <Navigate to="/barCodeScanner" />
  }
  return (

    <Container
      maxWidth="sm"
      fixed
      style={{ textAlign: "center", padding: "50px 10px" }}
      >
      <img src={store} alt="image" height="150px" title="image"/>
      <Typography variant="h4" color="#5A6CF3"
        style={{ textShadow: "0px 4px #dadbe3" }}>
        Welcome to {cookies.get("store").decodedText}
      </Typography>
      <Container
        maxWidth="sm"
        fixed
        style={{ textAlign: "center", padding: "10px 30px" }}
      >
        <Typography variant="h6" style={{padding : "10px 0"}}>Enter your details!!</Typography>
        <TextField
          id="outlined-name"
          label="Name"
          value={name}
          onChange={(e) => {setName(e.target.value)}}
          style={{margin : "20px "}}
        />
        <TextField
          id="outlined-name"
          label="Phone Number"
          type="number"
          value={phoneNumber}
          style={{margin : "10px", marginBottom : "30px"}}
          onChange={(e) => {setPhoneNumber(e.target.value)}}
        />
        <Button variant="contained" onClick={submitButton}>Enter Store</Button>
      </Container>
    </Container>
  );
};

export default StoreForm;
