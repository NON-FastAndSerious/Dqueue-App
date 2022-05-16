/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Container, Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import store from "./../images/store.png";
import { Navigate } from "react-router-dom";
const Home = () => {
  const [toScanner , setToScanner] = React.useState(false);  
  if(toScanner){
     return <Navigate to='/storescan'/>
  }
  return (
    <Container
      maxWidth="sm"
      fixed
      style={{ textAlign: "center", padding: "30px 10px" }}
    >
      <img src={store} alt="image" height="250px" />
      <Typography
        variant="h3"
        color="#5A6CF3"
        style={{ textShadow: "0px 4px #dadbe3" }}
      >
        {" "}
        D-Queue{" "}
      </Typography>
      <Typography variant="h6" color="#000000" style={{ marginTop: "20px" }}>
        Scan, Shop & Enjoy!
      </Typography>
      <div  style={{ marginTop: "60px" }} onClick={() => setToScanner(true)}>
        <svg
          style={{ boxShadow : "0px 2px 40px #DBDAF7" , cursor : "pointer" , borderRadius : "20px"}}
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="69.0267" height="69.0267" rx="16" fill="#DBDAF7" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.0618 31.2383H18.3022V24.6936C18.3064 22.9635 18.9868 21.3055 20.1946 20.0821C21.4025 18.8586 23.0395 18.1694 24.7477 18.1649H44.1232C47.6892 18.1649 50.5875 21.1011 50.5875 24.6936V31.2406H53.8121V34.5049H15.0603L15.0618 31.2383ZM21.5261 31.2383H47.3667V24.6936C47.3635 23.8258 47.0205 22.9947 46.413 22.3827C45.8055 21.7707 44.9831 21.4278 44.1262 21.4293H24.7477C23.8935 21.4315 23.075 21.7761 22.471 22.3878C21.8671 22.9995 21.5268 23.8285 21.5246 24.6936L21.5261 31.2383ZM50.589 37.7861V44.314C50.5876 46.05 49.9061 47.7145 48.6942 48.9421C47.4822 50.1697 45.8388 50.8601 44.1247 50.8618H24.7477C21.2005 50.8618 18.3022 47.9256 18.3022 44.314V37.7884H21.5246V44.3163C21.5232 45.1841 21.8618 46.017 22.466 46.6323C23.0703 47.2476 23.8908 47.5949 24.7477 47.5982H44.1232C44.9826 47.5982 45.8069 47.2524 46.4146 46.6369C47.0223 46.0215 47.3637 45.1867 47.3637 44.3163V37.7884L50.589 37.7861Z"
            fill="#5A6CF3"
          />
        </svg>
      </div>
      <Typography variant="p" color="#000055" style={{ marginTop: "60px" }}>
        Scan the QR <br/> before entering store!
      </Typography>
    </Container>
  );
};

export default Home;
