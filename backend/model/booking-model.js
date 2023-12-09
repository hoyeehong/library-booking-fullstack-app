import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  nricFin: {
    type: String,
    required: [true, "NRIC/FIN is required"],
  },
  pod: {
    type: String,
    required: [true, "Pod is required"],
  },
  bookingTiming: {
    type: String,
    required: [true, "Booking timing is required"],
  },
  bookingDuration: {
    type: String,
    required: [true, "Booking duration is required"],
  },
  podLocation: {
    type: String,
    required: [true, "Pod location is required"],
  },
  chosenDate: {
    type: String,
    required: [true, "Chosen date is required"],
  },
  booking_id: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Booking", BookingSchema);
