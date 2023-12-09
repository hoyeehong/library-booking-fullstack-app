import mock_happy_flow_data from "./happy_flow_data.json";
import mock_unhappy_flow_data from "./unhappy_flow_data.json";
import request from "supertest";
import "dotenv/config";

describe(`Booking Service Happy Flow Tests`, function () {
  mock_happy_flow_data.scenarios.forEach((scenario) => {
    test(`${scenario.test}-Save booking info into database`, async () => {
      const response = await request(process.env.ENDPOINT)
        .post("/booking")
        .send(scenario.data);

      expect(response.status).toBe(scenario.status);
      expect(response.body).toBe(scenario.message);
    });
  });
});

describe(`Booking Service Unhappy Flow Tests`, function () {
  mock_unhappy_flow_data.scenarios.forEach((scenario) => {
    test(`${scenario.test}-Save booking info into database`, async () => {
      const response = await request(process.env.ENDPOINT)
        .post("/booking")
        .send(scenario.data);

      expect(response.status).toBe(scenario.status);
      expect(response.body.message).toBe(scenario.message);
    });
  });
});

describe(`Retrieve Booking Service Tests`, function () {
  test(`Retrieve booking info from database`, async () => {
    // const getDataResponse = await BookingModel.find({});
    // expect(getDataResponse).toBeDefined();
    const response = await request(process.env.ENDPOINT).get("/booking");
    expect(response.status).toBe(200);
    expect(response).toBeDefined();
  });
});
