import '../App.css';

import React from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './ResultContainerPlugin.jsx'
import HowToUse from './HowToUse.jsx'
import { Container, Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import store from "./../images/store.png";
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Scanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      decodedResults: []
    }

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  }

  render() {
    if(this.state.decodedResults.length > 0) {
      return <Navigate to='/storeform' />
    }
    return (
      <Container
      maxWidth="sm"
      fixed
      style={{ textAlign: "center", padding: "30px 10px" }}
    >

      <div className="App">
        <section className="App-section">
        <img src={store} alt="image" height="180px" />
         <Typography variant='h4'  color="#5A6CF3"
        style={{ textShadow: "0px 2px #dadbe3" , padding : "10px 20px" , marginBottom : "20px"}}>Scan QR <br /> To Enter Store!</Typography>
          <div  style={{marginTop : "20px", padding : "10px"}}>
          <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
           
            qrCodeSuccessCallback={this.onNewScanResult}/>
          </div>
          {/* <ResultContainerPlugin results={this.state.decodedResults} /> */}
        </section>
      </div>
  </Container>
    );
  }

  onNewScanResult(decodedText, decodedResult) {
    console.log(
      "App [result]", decodedResult);
    cookies.set('store', decodedResult , { path: '/' });
    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });
  }
}

export default Scanner;
