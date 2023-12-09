import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import BookingModel from "./model/booking-model.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3001;
connectDB();

app.get("/health", (req, res) => {
  res.status(200).send(`OK`);
});

app.post("/booking", async (req, res) => {
  try {
    const newBooking = new BookingModel(req.body);
    await newBooking.save();
    res.status(200).json(`Successfully saved new booking information`);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.get("/booking/:booking_id?", async (req, res) => {
  let bookingInfo = {};
  try {
    if (req.params.booking_id) {
      bookingInfo = await BookingModel.findOne({
        booking_id: req.params.booking_id,
      });
    } else {
      bookingInfo = await BookingModel.find({});
    }
    res.status(200).send(bookingInfo);
  } catch (error) {
    return res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});
