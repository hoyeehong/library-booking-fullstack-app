import * as yup from "yup";

export const bookingSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  nricFin: yup.string().matches(/^[STFG]\d{7}[A-Z]$/, "Invalid NRIC/FIN"),
  pod: yup.string().required("Pod is required"),
  podLocation: yup.string().required(),
  bookingTiming: yup.string().required("Booking timing is required"),
  bookingDuration: yup.string().required("Booking duration is required"),
});
