import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ReviewDialog({
  formData,
  validate,
  podLocation,
  chosenDate,
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
    validate(e.target.value);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Next
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="review-dialog-title"
      >
        <DialogTitle id="review-dialog-title">
          {"Please review your booking details"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Name: {formData.name} <br />
            NRIC/FIN: {formData.nricFin} <br />
            Pod Number: {formData.pod} <br />
            Pod Location: {podLocation} <br />
            Date of Booking: {chosenDate} <br />
            Timing of Booking: {formData.bookingTiming} <br />
            Duration of Booking: {formData.bookingDuration} <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} value="cancel">
            Back to edit
          </Button>
          <Button autoFocus onClick={handleClose} value="reviewConfirmed">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
