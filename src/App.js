import logo from './logo.svg';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
const createData=(
  NDC, Manufacturer, Medicine, Lot, Expiry,mg, QTY
) =>{
  return { NDC, Manufacturer, Medicine, Lot, Expiry,mg, QTY };
}

const rows = [
  // 
  // Add more rows as needed
];

const App = () => {
  const [rowsFinal, setRows] = useState(rows);
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior
    const barcodeValue = event.target.elements.barcodeInput.value;
    console.log(`Entered barcode: ${barcodeValue}`);
    // rows.push(createData('2345678901', 'MediCare', 'Antipyretic', 'E97531', '2023-09-05', '100mg', 120))
    // console.log(rows)

    /////// converting barcode value to the original values
    var NDC = "";
    var man = ""
    var med = ""
    var lot = ""
    var exp = ""
    var mg = ""
    var qt = 0
    var b = barcodeValue.split("(")
    for (let index = 1; index < b.length; index++) {
      let bb = b[index].split(")");
      if(bb[0]=='01'){
        NDC = bb[1].slice(3, 14)
      }
      else if(bb[0]=="17"){
        exp = bb[1]
      }
      else if(bb[0]=="10"){
        lot = bb[1]
      }
    }
    setRows((prevRows) => [
      ...prevRows,
      createData(NDC, man, med, lot, exp, mg,qt),
    ]);
    // You can perform additional actions with the barcode value here
  };

  return (
    <div className="App">
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="barcodeInput"
          name="barcodeInput"
          label="Enter the active barcode number or scan"
          variant="outlined"
        />
      </Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>NDC</TableCell>
            <TableCell align="right">Manufacturer</TableCell>
            <TableCell align="right">Medicine</TableCell>
            <TableCell align="right">Lot</TableCell>
            <TableCell align="right">Expiry</TableCell>
            <TableCell align="right">mg</TableCell>
            <TableCell align="right">QTY</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsFinal.map((row) => (
            <TableRow
              key={row.NDC}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.NDC}
              </TableCell>
              <TableCell align="right">{row.Manufacturer}</TableCell>
              <TableCell align="right">{row.Medicine}</TableCell>
              <TableCell align="right">{row.Lot}</TableCell>
              <TableCell align="right">{row.Expiry}</TableCell>
              <TableCell align="right">{row.mg}</TableCell>
              <TableCell align="right">{row.QTY}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default App;
