const googleAuth = require('./googleAuth')
const { WebClient } = require('@slack/client');
const responses= require('./responses')
const MY_NAME = 'DurtleApp';
const MY_TAG = '<@UFTR64DSA>';

/**
*Put all options for responses here
*/
exports.processMessage = function(event){
  const web = new WebClient('xoxp-46330246865-116115870822-536328244515-f8f62f0df431fad776f048993e3dcca3')
  var text = event.text.toLowerCase();
  if (text.includes(' e\n') || text.includes('events') || text.includes('week') ||  text.includes('today')){
    responses.sendMessage(web, event, "Upcoming Events");
    const params = {web:web, original:event};
    params.days = parseDays(text);
    googleAuth.getGoogleEvents(responses.listEvents, params);
  }
  else{
    responses.sendMessage(web, event, "Here are some things you can ask me! \n Events (shows events in next 48 hrs), Today (shows events for next 24 hrs), Week (shows events for next week) ");
  }
}

function parseDays(text){
  if (text.includes('week')){
    return 7;
  }
  if (text.includes('today')){
    return 1;
  }
  return undefined;
}
