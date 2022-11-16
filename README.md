# marchex-intent-demo
An example of how to process the callbacks from the Marchex Transcription with Conversation Intent and Outcome Add-on for Twilio

## Installation
- Make a copy of the Airtable base [here](https://airtable.com/shrEERrU1lY4cq61M).
- Run `npm install`
- Copy ".env.example" to ".env": `cp .env.example .env`
  - Add your Twilio Account SID and Auth Token
  - Add your Airtable API Key and Base ID from step 1
  - Enter your cell phone # in E.164 in the "FORWARD_TO" variable
- Use the Twilio CLI to deploy the functions to your Twilio account `twilio deploy`. Click [here](https://www.twilio.com/docs/labs/serverless-toolkit/getting-started#install-the-twilio-serverless-toolkit) for help installing the Serverless CLI.
- Copy the URL for the /forwardCall endpoint and for the /marchex_results
- Navigate to the Twilio Console and set the /forwardCall URL to the webhook for [incoming calls](https://www.twilio.com/docs/usage/webhooks/voice-webhooks#incoming-voice-call).
- Navigate to the [Add-Ons Marketplace](https://console.twilio.com/us1/develop/add-ons/catalog?frameUrl=%2Fconsole%2Fadd-ons%3Fx-target-region%3Dus1) and install the **Marchex Transcription with Conversation Intent and Outcome** add-on.
- Provide a "UNIQUE NAME" for the installation.
- check the Recording Types, for this demo make sure at least the "Dial Verb Recordings" is checked.
- Past your full /marchex_results into the "CALLBACK URL" and select POST for the "CALLBACK REQUEST METHOD". 
- Click **Save** and make a test call to your Twilio Number. After the call is over your content intent and transcription should be added to Airtable!
