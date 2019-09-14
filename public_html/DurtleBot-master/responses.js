const {google} = require('googleapis');
const { WebClient } = require('@slack/client');
const moment = require('moment')


/**
Print text to slack
*/
exports.sendMessage = function(web, event, message){
  web.chat.postMessage({ channel: event.channel, text: message })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts);
  })
  .catch(console.error);
}


/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
exports.listEvents = function(auth, params) {
  var text = ''
  var endDate = new Date()
  if (params.days){
    endDate.setDate(endDate.getDate()+params.days)
  }else{
    endDate.setDate(endDate.getDate()+2)
  }
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'joutpfdudebkt26inu4c1gtpom9veud1@import.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    timeMax: endDate.toISOString(),
    maxResults: params.maxResults ? params.maxResults :50,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        text += ` ${event.summary.substring(0, event.summary.length - 18)} \n ${moment(start).format('ddd MMM Do h:mma')} \n`;
        if (event.location) text += event.location+'\n';
        if (event.description) text += event.description+'\n';
        text += '\n'
      });
    } else {
      text += 'No upcoming events found.';
    }
    exports.sendMessage(params.web, params.original, text)
  });
}

/**
   web.apiCall('conversations.history',{channel :'CFRQY0030',limit : 5})
   .then((res)=>{
     console.log(res)
   })
   .catch(console.error);
*/
