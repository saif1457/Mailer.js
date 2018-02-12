var EMAIL_SENT = "EMAIL_SENT";
var request = "Request";
var filled = "Filled";
var confirmed = "Confirmed";

var app = SpreadsheetApp;
var requestSheet = app.getActiveSpreadsheet().getSheetByName("Request");
var candidateSheet = app.getActiveSpreadsheet().getSheetByName("Candidates");
var messageSheet = app.getActiveSpreadsheet().getSheetByName("MSGS");
var emailLog = app.getActiveSpreadsheet().getSheetByName("EmailLog");

var startRow = 2;  // First row of data to process
var numRows = candidateSheet.getLastRow()-1;   // Number of rows to process
var logRows = emailLog.getLastRow();
var dataRange = candidateSheet.getRange(startRow, 1, numRows, 16)
// Fetch values for each row in the Range.
var data = dataRange.getValues();

//Logger.log(data[1][2]);

    
function sendEmails() {
    //Logger.log(data[0][1]);
    for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    //Logger.log(data[i][2]);
    var emailAddress = row[0];  // First column
    var message = row[1];       // Second column
    var firstName = row[2];
    var surName = row[3];
    var candidatePhone = row[4];
    var decision = row[14];
    var emailSent = row[15];
    Logger.log(emailSent);
    var supervisorName = requestSheet.getRange(1,2).getValue();
    var supervisorPhone = requestSheet.getRange(2,2).getValue();
    var location = requestSheet.getRange(5,2).getValue();
    var startDate = requestSheet.getRange(7,2).getValue();
    var startTime = requestSheet.getRange(8,2).getValue();
    
    var messageID = "unknown";
    if (message == request) {
      message = messageSheet.getRange(2,2).getValue();
      messageID = "Request";
    }
    
    if (emailSent != EMAIL_SENT) {  // Prevents sending duplicates
    var subject = messageID;
     // MailApp.sendEmail(emailAddress, subject, message);
      candidateSheet.getRange(startRow + i, 16).setValue(EMAIL_SENT);
      //Make sure the cell is updated right away in case the script is interrupted
      SpreadsheetApp.flush(); 
    } 
      else if(emailSent == EMAIL_SENT) {
      
      if (decision == confirmed) {
      message = (firstName + " " + surName + ": Confirmed! Please be at " + location + " on " + startDate + " at " + startTime + ". " + "\n \n" + 
                   supervisorName + " will call you at " + candidatePhone + " with any details. " + "\n \n" +  "DO NOT REPLY HERE. " + supervisorName + " is at " + 
                   supervisorPhone + "." + "\n \n" + "Thanks.");
      messageID = "Confirmed!";
    } else if (decision == filled) {
      message = messageSheet.getRange(4,2).getValue();
      messageID = "Filled";
    } 
      subject = messageID;
      //MailApp.sendEmail(emailAddress, subject, message);
      candidateSheet.getRange(startRow + i, 17).setValue(EMAIL_SENT);
  }
 }
}

function checkMail(){

  var threads = GmailApp.search('subject:"Re:Request"');

  var end_messages = threads.length+1;
  Logger.log(end_messages);
  var ranger = emailLog.getRange("A2:D"+end_messages)

  var replay = [];
  var replier = [], size = 4;

  for (var i=0; i<threads.length; i++){ //GO THROUGH THREADS
    var messages = threads[i].getMessages(); // GO THROUGH MESSAGES
 
    for (var j=1; j<messages.length; j++){ // GO THROUGH MESSAGES, j=1 ONLY GETS THE REPLY
      

      var msg = messages[j].getBody();
      var str = messages[j].getFrom();
      var DateTime = messages[j].getDate();
      var emailName = str.substr(0,str.indexOf(' '));
      var emailName2 = str.substr(2,str.indexOf(' '));
     // Logger.log(emailName);
      var stopSearch = (msg.indexOf('On'));
      
      replay.push(emailName);
      replay.push(str);

      if ((msg.indexOf('YES') < stopSearch)){ //IF THE REPLY IS YES
        reply = "YES";
        
      } else if ((msg.indexOf('NO') < stopSearch)){ // IF THE REPLY IS NO
        reply = "NO";
        //   replay.push(reply);
        
      } else {
        reply = "gibberish";
      }
    }

        replay.push(reply);
        replay.push(DateTime);

    }
  while(replay.length > 0){
    replier.push(replay.splice(0,size));
  }
    //correct position
   // var replier = [replay,replay,replay];
 ranger.setValues(replier);
  
  replay.toString();
  replier.toString();
        Logger.log(replay);
  Logger.log("shit");
             Logger.log(replier);
  
}
  /*
  var threads = GmailApp.search('subject:"Re: Request"');
  //var threads = GmailApp.getInboxThreads(0,1); // Get first thread in inbox
  for (var i = 0; i < threads.length; i++) {
    var message = threads[i].getMessages(); // Get first message

    var replyDate = message[i].getDate();
    candidateSheet.getRange(2,14).setValue(replyDate);

    var response = message[i].getBody();
    candidateSheet.getRange(7,7).setValue(response);
    
    var replyFrom = message[i].getFrom();
    candidateSheet.getRange(2,12).setValue(replyFrom);
  }
 var thread = GmailApp.getInboxThreads(0,1)[0]; // Get first thread in inbox
 var message = thread.getMessages()[0]; // Get first message
 Logger.log(message.getDate()); // Log date and time of the message
  
 var thread = GmailApp.getInboxThreads(0,1)[0]; // Get first thread in inbox
 var message = thread.getMessages()[1]; // Get first message
 Logger.log(message.getFrom()); // Log from address of the message
 // Log the subjects of the messages in the thread
  
 var affirmative = "YES", nay = "NO";
  var firstThread = GmailApp.search('subject:"Re:Request"')[0];
 var messages = firstThread.getMessages();
  
 var message = firstThread.getMessages()[0]; // Get first message
  
 
 var replyDate = message.getDate();
 candidateSheet.getRange(numRows,14).setValue(replyDate);
 Logger.log(message.getBody()); // Log date and time of the message 

  
 var message = firstThread.getMessages()[1]; // Get first message
 var fromEmail = message.getFrom();
 candidateSheet.getRange(numRows,12).setValue(fromEmail);
 Logger.log(message.getFrom()); // Log from address of the message
  
 for (var i = 1; i < messages.length; i++) {
   if (messages[i].getBody().indexOf(affirmative) !== -1){
     Logger.log("YES");
     candidateSheet.getRange(numRows,13).setValue(affirmative);
   } else if (messages[i].getBody().indexOf(nay) !== -1){
     candidateSheet.getRange(numRows,13).setValue(nay);
     Logger.log("YES");
   }
 }*/

