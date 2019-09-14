const {createEventAdapter} = require('@slack/events-api');
const slackEvents = createEventAdapter('1f7b2d9d7ac6fbb56c93d6f1d386b71f');
const processInput = require('./processInput')
const port = 8080;
const MY_NAME = 'DurtleApp';
const MY_TAG = '<@UFTR64DSA>';






// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im

slackEvents.on('message', (event) => {
  //Dont respond to my own messages or in a group if im not tagged
  if (event.username == MY_NAME || event.channel_type != 'im' && !event.text.includes(MY_TAG)){
    return;
  }
  processInput.processMessage(event);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`);
});
