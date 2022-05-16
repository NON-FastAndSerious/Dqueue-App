import React from 'react'
import Cookies from "universal-cookie";
import { Button, Container, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import store from "./../images/store.png";

import { compose } from '@mui/system';
const cookies = new Cookies();

const Summary = () => {
  
  const rows = cookies.get('cartData');  
  let total = 0;
  rows.map((row) => {
     total = total + (row.quantity * row.MRP);
  })
  console.log(total);
  return (
    <Container
      maxWidth="sm"
      fixed
      style={{ textAlign: "center", padding: "50px 10px" }}
      >
          <img src={store} alt="image" height="150px" title="image"/>
    <Typography variant='h5' color="#5A6CF3"
        style={{ textShadow: "0px 2px #dadbe3" , margin : "10px" }}>Hi, {cookies.get('user').name} <br/> Your Cart Summary </Typography>
     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>MRP</TableCell>
            <TableCell>Qunatity</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.Name}
              </TableCell>
              <TableCell >{row.MRP}</TableCell>
              <TableCell >{row.quantity}</TableCell>
              <TableCell >{row.quantity * row.MRP}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Button variant='contained' style={{margin : "10px"}}> Pay Rs. {total} </Button> <br/>
      <Typography variant='p'>OR</Typography> <br />
      <Button variant='contained' style={{margin : "10px"}}> Go to Counter </Button>
      </Container>
  )
}

export default Summary