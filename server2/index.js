const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const cheerio = require('cheerio');
const MailParser = require('mailparser').MailParser;

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), listMessages);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  console.log(credentials);
  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  gmail.users.labels.list(
    {
      userId: "me",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const labels = res.data.labels;
      if (labels.length) {
        console.log("Labels:");
        labels.forEach((label) => {
          console.log(`- ${label.name}: ${label.id}`);
        });
      } else {
        console.log("No labels found.");
      }
    }
  );
}

function listMessages(auth, query) {
  query = "messages@atozmsg.com";
  return new Promise((resolve, reject) => {
    const gmail = google.gmail({ version: "v1", auth });
    gmail.users.messages.list(
      {
        userId: "me",
        q: query,
        maxResults: 10,
      },
      (err, res) => {
        if (err) {
          reject(err);
          return;
        }
        //console.log(res.data.messages)
        if (!res.data.messages) {
          resolve([]);
          return;
        }
        resolve(res.data);

        getMail(res.data.messages[0].id, auth);
      }
    );
  });
}

function getMail(msgId, auth){
  //console.log(msgId)
  const gmail = google.gmail({version: 'v1', auth});
  //This api call will fetch the mailbody.
  gmail.users.messages.get({
      userId:'me',
      id: msgId ,
  }, (err, res) => {
    console.log(res.data.labelIds.INBOX)
      if(!err){
        console.log("no error")
        //console.log(res.data.payload)
          var body = res.data.payload.body.data;
          const buff = Buffer.from(body, 'base64')
          var htmlBody = buff.toString('utf-8');

          console.log(typeof htmlBody);
          var tempString = '';
          const temp = [];
          var spaceAdded = false;
          const message = {};
          var validate = /[A-Za-z0-9]/i;

          function spaceFinder(char){
            if((char === ' ') && spaceAdded ){
              return;
            } else {
              tempString += char;
              spaceAdded = false;
            }
          }

          console.log([...htmlBody].forEach( l => {
            if(validate.test(l)){
              spaceAdded = false;
              tempString += l;
              //if(spaceAdded){ tempString = '' }
              //console.log('adding ',tempString)
            } else if(spaceAdded && l === ' '){
              console.log('do nothing')
            } else if(l === ' ') {
              tempString+= l;
              spaceAdded = true;
            }

          }))

          message.name = tempString.substring( tempString.indexOf('NAME')+4, tempString.indexOf('PHONE') ).trim()
          message.phone = tempString.substring( tempString.indexOf('PHONE')+5, tempString.indexOf('MESSAGE') ).trim()
          message.message = tempString.slice( tempString.indexOf('MESSAGE')+7);

          mailparser = new MailParser();
          mailparser.on("end", (err,res) => {
              console.log("res1",res);
          })

          mailparser.on('data', (dat) => {
              //console.log(dat)
              if(dat.type === 'text'){
                  const $ = cheerio.load(dat.textAsHtml);
                  var links = [];
                  var modLinks = [];
                  $('a').each(function(i) {
                      links[i] = $(this).attr('href');
                  });

                  //Regular Expression to filter out an array of urls.
                  var pat = /------[0-9]-[0-9][0-9]/;

                  //A new array modLinks is created which stores the urls.
                  modLinks = links.filter(li => {
                      if(li.match(pat) !== null){
                          return true;
                      }
                      else{
                          return false;
                      }
                  });
                  console.log(modLinks);

                  //This function is called to open all links in the array.

              }
          })

          mailparser.write(htmlBody);
          mailparser.end();

      }
  });
}

