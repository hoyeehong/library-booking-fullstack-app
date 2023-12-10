import { useState } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import BookingForm from "./BookingForm";

export default function BookingFormSubmission() {
  const [items, setItems] = useState([]);
  const [isFormUpdated, setIsFormUpdated] = useState(false);

  const addItem = (item) => {
    item.booking_id = uuid();
    console.log(`BookingID: ${item.booking_id}`);

    axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_API}`, //"http://localhost:3001/booking"
      data: item,
    }).then(function (response, error) {
      if (!response.status === 200) console.log(error);
      else {
        setItems((currItems) => {
          return [...currItems, { ...item }];
        });
        setIsFormUpdated(true);
      }
    });
  };

  return (
    <>
      {!isFormUpdated ? (
        <BookingForm addItem={addItem} />
      ) : (
        <div className="form-submission">
          <div className="form-grouping">
            <h1 className="h1-submission">Your submitted booking details.</h1>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>NRIC/FIN</TableCell>
                    <TableCell>Pod Number</TableCell>
                    <TableCell>Pod Location</TableCell>
                    <TableCell>Date of Booking</TableCell>
                    <TableCell>Timing of Booking</TableCell>
                    <TableCell>Duration of Booking</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((i, k) => (
                    <TableRow key={k}>
                      <TableCell>{i.name}</TableCell>
                      <TableCell>{i.nricFin}</TableCell>
                      <TableCell>{i.pod}</TableCell>
                      <TableCell>{i.podLocation}</TableCell>
                      <TableCell>{i.chosenDate}</TableCell>
                      <TableCell>{i.bookingTiming}</TableCell>
                      <TableCell>{i.bookingDuration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="form-grouping">
            <button onClick={() => setIsFormUpdated(false)}>
              Click here to create new booking
            </button>
          </div>
        </div>
      )}
    </>
  );
}
