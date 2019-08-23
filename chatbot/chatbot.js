'use strict'
const dialogflow = require('dialogflow');
const config = require('../config/keys');

const sessionClient = new dialogflow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = {
  textQuery: async function(text) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: req.body.text,
          languageCode: config.dialogFlowSessionLanguageCode,
        },
      },
    };
    let responses = await sessionClient
      .detectIntent(request);
    return responses;
  }
}