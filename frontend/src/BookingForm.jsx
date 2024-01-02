import { useState } from "react";
import ReviewDialog from "./ReviewDialog";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DOMPurify from "dompurify";
import { bookingSchema } from "./validations/bookingValidation";
import dayjs from "dayjs";

const today = dayjs();

export default function BookingForm({ addItem }) {
  const [formData, setFormData] = useState({
    name: "",
    nricFin: "",
    pod: "",
    bookingTiming: "",
    bookingDuration: "",
  });
  const [podLocation, setPodLocation] = useState("");
  const [chosenDate, setChosenDate] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);

  const podLocations = {
    "Pod 1": "Alpha Room",
    "Pod 2": "Bravo Room",
    "Pod 3": "Charlie Room",
    "Pod 4": "Delta Room",
    "Pod 5": "Echo Room",
    "Pod 6": "Foxtrot Room",
    "Pod 7": "Golf Room",
    "Pod 8": "Hotel Room",
  };

  const maskIdNum = (str) => {
    let firstChar = str.charAt(0);
    let subStr = str.substring(str.length - 4);
    let newStr = firstChar + "XXXX" + subStr;
    return newStr;
  };

  const validate = (review) => {
    if (review === "reviewConfirmed") {
      setIsReviewed(true);
    }
  };
  const handleChange = (evt) => {
    setIsReviewed(false);
    if (evt.target.name === "pod") {
      const location = podLocations[evt.target.value];
      setPodLocation(location);
    }
    setFormData((currData) => {
      return {
        ...currData,
        [evt.target.name]: DOMPurify.sanitize(evt.target.value),
      };
    });
  };

  const handleDateChange = (evt) => {
    const convertedDate = new Date(evt);
    setChosenDate(convertedDate.toLocaleDateString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isReviewed) {
      formData.podLocation = podLocation;
      formData.chosenDate = chosenDate;

      bookingSchema
        .validate(formData)
        .then((validFormData) => {
          validFormData.nricFin = maskIdNum(validFormData.nricFin);
          addItem(validFormData);
        })
        .catch((error) => {
          alert(error);
          console.log(error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-grouping">
        <TextField
          required
          variant="standard"
          fullWidth
          label="Name"
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          onChange={handleChange}
          value={formData.name}
        />
      </div>

      <div className="form-grouping">
        <TextField
          required
          variant="standard"
          fullWidth
          label="NRIC/FIN"
          type="text"
          placeholder="NRIC/FIN"
          name="nricFin"
          id="nricFin"
          onChange={handleChange}
          value={formData.nricFin}
        />
      </div>

      <div className="form-grouping">
        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel>Pod Number</InputLabel>
          <Select
            required
            name="pod"
            defaultValue={chosenDate}
            onChange={handleChange}
            label="Pod"
          >
            <MenuItem value="Pod 1">Pod 1</MenuItem>
            <MenuItem value="Pod 2">Pod 2</MenuItem>
            <MenuItem value="Pod 3">Pod 3</MenuItem>
            <MenuItem value="Pod 4">Pod 4</MenuItem>
            <MenuItem value="Pod 5">Pod 5</MenuItem>
            <MenuItem value="Pod 6">Pod 6</MenuItem>
            <MenuItem value="Pod 7">Pod 7</MenuItem>
            <MenuItem value="Pod 8">Pod 8</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="form-grouping">
        <TextField
          disabled
          variant="filled"
          fullWidth
          label="Pod Location"
          type="text"
          value={podLocation}
          name="podLocation"
          onChange={handleChange}
        />
      </div>

      <div className="form-grouping">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              required
              name="date"
              label="Date of Booking"
              defaultValue={today}
              onChange={handleDateChange}
              disablePast
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div className="form-grouping">
        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel>Timing of Booking</InputLabel>
          <Select
            required
            name="bookingTiming"
            defaultValue=""
            onChange={handleChange}
            label="Timing of Booking"
          >
            <MenuItem value="12pm">12pm</MenuItem>
            <MenuItem value="1230pm">1230pm</MenuItem>
            <MenuItem value="1pm">1pm</MenuItem>
            <MenuItem value="130pm">130pm</MenuItem>
            <MenuItem value="2pm">2pm</MenuItem>
            <MenuItem value="230pm">230pm</MenuItem>
            <MenuItem value="3pm">3pm</MenuItem>
            <MenuItem value="330pm">330pm</MenuItem>
            <MenuItem value="4pm">4pm</MenuItem>
            <MenuItem value="430pm">430pm</MenuItem>
            <MenuItem value="5pm">5pm</MenuItem>
            <MenuItem value="530pm">530pm</MenuItem>
            <MenuItem value="6pm">6pm</MenuItem>
            <MenuItem value="630pm">630pm</MenuItem>
            <MenuItem value="7pm">7pm</MenuItem>
            <MenuItem value="730pm">730pm</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="form-grouping">
        <FormControl variant="standard" sx={{ minWidth: 150 }}>
          <InputLabel>Duration of Booking</InputLabel>
          <Select
            required
            name="bookingDuration"
            defaultValue=""
            onChange={handleChange}
            label="Duration of Booking"
          >
            <MenuItem value="30mins">30mins</MenuItem>
            <MenuItem value="1hour">1hour</MenuItem>
            <MenuItem value="1.5hour">1.5hour</MenuItem>
            <MenuItem value="2hours">2hours</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="form-grouping">
        {!isReviewed ? (
          <ReviewDialog
            formData={formData}
            validate={validate}
            podLocation={podLocation}
            chosenDate={chosenDate}
          />
        ) : (
          <button>Submit</button>
        )}
      </div>
    </form>
  );
}
