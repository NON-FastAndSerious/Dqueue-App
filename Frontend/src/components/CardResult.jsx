/* eslint-disable jsx-a11y/img-redundant-alt */
import { Box, Container } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Cookies from "universal-cookie";
import { Navigate, NavigationType } from "react-router-dom";
const cookies = new Cookies();

function filterResults(results) {
  let filteredResults = [];
  for (var i = 0; i < results.length; i++) {
    var isRepeat = 0;
    for (var j = i + 1; j < results.length; j++) {
      if (results[i].barcodeId === results[j].barcodeId) {
        isRepeat = 1;
        break;
      }
    }
    if (isRepeat === 0) filteredResults.push(results[i]);
  }
  return filteredResults;
}



const CardResult = ({ data }) => {

  const [cartData, setCartData] = React.useState(data);
  const [summary, setSummary] = React.useState([]);
  const [total, setTotal] = React.useState(0);
  const [toSummary , setToSummary] = React.useState(false);

  console.log("cart" , cartData);
    const addQuantity = (key) => {
      let newArr = [...cartData];
      newArr[key].quantity = cartData[key].quantity + 1;
      setCartData(newArr);
      console.log(key);
  }
  const minusQuantity = (key) => {
    let newArr = [...cartData];
      newArr[key].quantity = cartData[key].quantity - 1;
      setCartData(newArr);
      console.log(key);
}
  const submitButton = (e) => {
      e.preventDefault();
      cookies.set('cartData', cartData , { path: '/' });
      setToSummary(true);
  }
  const SingularCard = ({ data , fk }) => {
      console.log(fk);

    return (
      <Card style={{ border: "0.1px solid grey" , margin : "2"}}>
        <Box style={{ display: "flex" , justifyContent : "space-around" }}>
          <img
            height="130"
            width="130"
            src={`https://drive.google.com/thumbnail?id=${data.imageURL}`}
            alt="image"
            title="image"
            style={{padding : "5px"}}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {data.Name}
            </Typography>
            <Typography variant="p" component="div">
              MRP : Rs.{data.MRP}
            </Typography>
            <Typography variant="p" component="div">
              Weight : {data.Quantity}
            </Typography>
            <Box style={{display : "flex", padding : "10px 20px"}}>
              {/* <p>Quantity : </p>s */}
              <button style={{fontSize : "20px", margin: "2px"}} onClick={() => minusQuantity(fk)}>-</button>
              <button style={{fontSize : "15px" , padding : "10px"}}>{data.quantity}</button>
              <button style={{fontSize : "20px", margin: "2px"}}  onClick={() => addQuantity(fk)}>+</button>
            </Box>
          </CardContent>
        </Box>
      </Card>
    );
  };
  if(toSummary) {
    return <Navigate to='/summary' />
  }
  return (
    <Container>
      {cartData.map((singleData,key) => {
        if(singleData.quantity <= 0 ) return (<></>)  
        return <SingularCard data={singleData} fk={key} />;
      })}
      { cartData.length > 0 && <Button style={{marginTop : "2px"}}  variant="contained" onClick={submitButton}> Billing </Button> } 
       
    </Container>
  );
};

export default CardResult;
