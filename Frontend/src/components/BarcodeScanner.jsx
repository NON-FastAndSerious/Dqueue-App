import "../App.css";

import React from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin.jsx";
import ResultContainerPlugin from "./ResultContainerPlugin.jsx";
import HowToUse from "./HowToUse.jsx";
import { Container, Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import store from "./../images/store.png";
import { Navigate } from "react-router-dom";
import axios from "axios";
import CardResult from "./CardResult";
import Cookies from "universal-cookie";
const cookies = new Cookies();

class BarcodeScanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: [],
    };

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    return (
      <Container
        maxWidth="sm"
        fixed
        style={{ textAlign: "center", padding: "30px 40px" }}
      >
        <div className="">
          <section className="">
            <div style={{ display: "flex", justifyContent: "space-between" , border : "0.1px solid grey" , padding : "10px 20px" , borderRadius : "10px" }}>
              <Typography
                variant="h4"
                style={{ textShadow: "0px 2px #dadbe3", color: "purple" }}
              >
                {cookies.get("store").decodedText}{" "}
              </Typography>
              <Avatar style={{ backgroundColor: "purple" }}>
                {cookies.get("user").name[0].toUpperCase()}
              </Avatar>

              {/* <img src={store} alt="image" height="50px" /> */}
            </div>
            <Typography
              variant="h6"
              color="#5A6CF3"
              style={{
                textShadow: "0px 2px #dadbe3",
                padding: "10px 10px",
                marginBottom: "10px",
              }}
            >
              Scan items To add into Cart!
            </Typography>
            <div style={{ marginTop: "10px", padding: "10px" }}>
              <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={this.onNewScanResult}
              />
            </div>
             <CardResult data={this.state.decodedResults} />
            {/* <ResultContainerPlugin results={this.state.decodedResults} /> */}
          </section>
        </div>
      </Container>
    );
  }

  onNewScanResult(decodedText, decodedResult) {
    
    axios
      .post(
        `https://dequeserver.herokuapp.com/getProduct?barcodeID`,
        {},
        {
          params: {
            barcodeID: Number(decodedResult.decodedText),
          },
        }
      )
      .then((res) => {
        console.log(res.data.data[0]);
        if(res.data.data.length > 0) {
          
          let decodedResulthere = this.state.decodedResults;
          decodedResulthere.push({...res.data.data[0], quantity : 1});
          this.setState({decodedResults : decodedResulthere});
          
        }
      })
      .catch((err) => console.log(err));
  }
}

export default BarcodeScanner;
