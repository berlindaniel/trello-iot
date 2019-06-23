'use strict';
const AWS = require('aws-sdk');
const SNS = new AWS.SNS({ apiVersion: '2010-03-31' });
const PHONE_NUMBER = process.env.PHONE_NUMBER;
var trelloApiKey = process.env.API_KEY;
var trelloToken = process.env.TOKEN;
var trelloCoffeeListId = process.env.COFFEE_ID;
var trelloWaterListId = process.env.WATER_ID;
var trelloMMListId = process.env.MM_ID;
var Trello = require("trello");
var t = new Trello(trelloApiKey, trelloToken);

const SINGLE_CLICK_MESSAGE = "Coffee time. Don't drink too fast and remember to drink water!";
const LONG_CLICK_MESSAGE = "M&M's again? Guess you don't mind that sugar crash that's coming in 20 minutes.";
const DOUBLE_CLICK_MESSAGE = "Water. Good call, you'll thank yourself later!";

exports.handler = (event, context, callback) => {

    var date = new Date(Date.now() - 14400000).toString();
    var dateET = date.substring(0, 24);
    var day = date.substring(0, 3);

     let clickMessage = SINGLE_CLICK_MESSAGE;

    if (event.clickType === "LONG") {
        clickMessage = LONG_CLICK_MESSAGE;
        t.addCard('M&M Break on ' + day, "On " + dateET, trelloMMListId,
        function (error, trelloCard) {
          if (error) {
              console.log('Could not add card:', error);
          }
          else {
              console.log('Added card:', trelloCard);
          }
      });
    }

    if (event.clickType === "DOUBLE") {
        clickMessage = DOUBLE_CLICK_MESSAGE;
        t.addCard('Water Refill on ' + day, "On " + dateET, trelloWaterListId,
        function (error, trelloCard) {
          if (error) {
              console.log('Could not add card:', error);
          }
          else {
              console.log('Added card:', trelloCard);
          }
      });
    }

    else {
        t.addCard('Coffee Break on ' + day, "On " + dateET, trelloCoffeeListId,
        function (error, trelloCard) {
          if (error) {
              console.log('Could not add card:', error);
          }
          else {
              console.log('Added card:', trelloCard);
          }
      });
    }

    const params = {
        PhoneNumber: process.env.PHONE_NUMBER,
        Message: clickMessage,
    };

    SNS.publish(params, callback);
};
