import HealthInfo from "../models/health-model";
import mock_data from "./sample_data.json";

describe(`Health Service Unit Tests`, function () {
  mock_data.scenarios.forEach((scenario) => {
    let insertedDataResponse = {};

    // test(`${scenario.test} Save health info into database`, async () => {
    //   const healthInfo = new HealthInfo(scenario.data);
    //   insertedDataResponse = await healthInfo.save();

    //   expect(insertedDataResponse).toBeDefined();
    //   expect(insertedDataResponse._id).toBeDefined();
    //   expect(insertedDataResponse.id).toBe(scenario.data.id);
    //   expect(insertedDataResponse.name).toBe(scenario.data.name);
    //   expect(insertedDataResponse.temperature).toBe(scenario.data.temperature);
    //   expect(insertedDataResponse.symptoms).toBe(scenario.data.symptoms);
    //   expect(insertedDataResponse.contactWithCovid).toBe(
    //     scenario.data.contactWithCovid
    //   );
    // });

    test(`${scenario.test} Retrieve health info from database`, async () => {
      const getDataResponse = await HealthInfo.find({});
      console.log(getDataResponse.length);
      // getDataResponse.forEach((e) => {
      //   console.log(`e: ${e}`);
      // });

      //console.log(insertedDataResponse.id);
      console.log(getDataResponse.includes("16102023-0900"));

      // expect(getDataResponse).toBeDefined();
      // expect(getDataResponse.includes(insertedDataResponse.id)).toBeDefined();

      // expect(insertedDataResponse.id).toBe(scenario.data.id);
      // expect(insertedDataResponse.name).toBe(scenario.data.name);
      // expect(insertedDataResponse.temperature).toBe(scenario.data.temperature);
      // expect(insertedDataResponse.symptoms).toBe(scenario.data.symptoms);
      // expect(insertedDataResponse.contactWithCovid).toBe(
      //   scenario.data.contactWithCovid
      // );
    });
  });
});
