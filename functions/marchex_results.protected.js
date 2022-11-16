const Airtable = require('airtable');
const axios = require('axios');

exports.handler = async function (context, event, callback) {
  const accountSID = context.ACCOUNT_SID
  const authToken = context.AUTH_TOKEN
  const base = new Airtable({ apiKey: context.AIRTABLE_KEY }).base(context.AIRTABLE_BASE);
  const addOns = JSON.parse(event.AddOns)

  if (addOns.results.marchex_recording_analysis.status == "failed") {
    console.error("Marchex Add-on Results Failed");
    return callback(null, "");
  }

  console.log("addOn results URL: ", addOns.results.marchex_recording_analysis.payload[0].url);

  await axios.get(addOns.results.marchex_recording_analysis.payload[0].url, { auth: { username: accountSID, password: authToken } })
    .then(response => {
      console.log("marchex call outcomes ", response.data.call.outcomes);
      base('Results').create([
        {
          "fields": {
            "Conversation": response.data.call.outcomes.includes("Conversation").toString(),
            "Opportunity": (!response.data.call.outcomes.includes("Non - Opportunity")).toString(),
            "AppointmentBooked": response.data.call.outcomes.includes("Appointment Booked").toString(),
            "Transcription": response.data.call.transcript
          }
        }
      ], function (err, records) {
        if (err) {
          console.error(err);
          return callback(err);
        }
        records.forEach(function (record) {
          console.log("Airtable record for stored analysis: " + record.getId());
          return callback(null, "");
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
};