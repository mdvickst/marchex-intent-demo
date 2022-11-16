
// This is your new function. To start, set the name and path on the left.

exports.handler = function(context, event, callback) {
    const response = new Twilio.twiml.VoiceResponse();
    console.log("forwardCall from: " + event.From + " to: " + context.FORWARD_TO);
    
    response.dial(context.FORWARD_TO, {
          record: "record-from-answer-dual",
          callerId: event.From
        });
  
    return callback(null, response);
    
  };