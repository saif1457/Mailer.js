# Mailer.js
A short Google script that automates sending mail, retrieving replies and updating spreadsheet, written in Google(Java)Script.
It makes use of Google Sheets, Gmail and automated triggers to periodically update the spreadsheet. To use this script will require authorising the script permission to access GDrive, read, view and send email as you.


<img src="http://res.cloudinary.com/dcl78rpmg/image/upload/q_40/v1518433399/jay-wennington-2250_bpyr6z.jpg" style="width:100%"> [Photo by Jay Wennington on Unsplash](https://unsplash.com/photos/loAgTdeDcIU)

There are two functions `sendEmails()` and `checkMail` - no prizes for guessing what they do. 

## sendEmails()

`sendEmails()` begins by taking in information of the candidate from `Candidates` in the Google Sheets, as well as information about the job request, the supervisor details and location/times - which are all user-inputted values in the `Request` sheet.

After more user-input of the candidate details in the `Candidates` sheet, the email will check if `column P` has logged this candidate as `EMAIL_SENT`. Originally when a new candidate is added to the list, this column value will be empty, so the first request email will be sent. If the candidate has already been emailed then it will look at `column O` to see if you've made a decision out of `Confirmed` or `Filled`. 

Once you've decided, if `Confirmed`, the script will send an according email giving the candidate a reminder of details such as when and where to be, as well as supervisor contact details.

if `Filled`, it will send a very upsetting rejection letter. :disappointed_relieved:


## checkEmail()

`checkEmail` is integeral to the decision making process -- it goes through your inbox looking for emails with the subject `RE: Request`. This works because the first email you sent had the subject of `Request`, so this captures only relevant replies. 

The script then logs the sender email address, the DateTime of the message and whether the reply was `YES` or `NO`. No other information is taken in, and if the message does not include this then the reply is saved as `gibberish`.

The output of this function occurs back in the Google Sheet `EmailLog`, which is updated as messages come in.

## Instructions for use:

- Copy the [Google Sheet into your GDrive.](https://docs.google.com/spreadsheets/d/13R153zrVxPanArFD4faLedq6qBUz48S7bsDMLdercGE/edit?usp=sharing)
- Either run the script natively from ~~this Google Script repo~~ (apparently Google decided to have "an internal error has occurred and your request was not completed.")
- In light of the above, the best way is to open the Google Sheet you just copied, and go `Tools > Script Editor` and copy and paste the Mailer.js code into there.
- Save, and run.

If you have any further questions, [send mail.](mailto:saifbhatti@u.northwestern.edu)

---

### Request Sheet:

<img src="https://i.gyazo.com/89cb1c1ac1e3778d9a0d0dd496119b01.png" style="width:100%">
The orange cells are all user inputted information.

### Candidate Sheet - User Input


<img src="https://i.gyazo.com/1eb5df849ffa62be24a9caa50451e154.png" style="width:100%">

The orange cells are all user inputted information.
### Candidate Sheet - User Decision

<img src="https://i.gyazo.com/e889311f7387ef38794fc49ad2d8f31c.png" style="width:100%">

The orange cells are all user inputted information.

### EmailLog Sheet:
<img src="https://i.gyazo.com/e889311f7387ef38794fc49ad2d8f31c.png" style="width:100%">

This is the output from `checkEmails()` function.

---
### Example: Request Email

`Can you work for ABC Zoo at 23 Zootopia Close from 04/03/2018 at 09:00 to 04/20/2018 at 17:00? Reply YES or NO.`


### Example: Confirmed Email

`Saif Bhatti: Confirmed! Please be at 23 Zootopia Close on 04/03/2018 at 09:00. John Smith will call you at 703-507-8746 with any details. DO NOT REPLY HERE. John Smith is at 773-558-3951. Thanks.`

### Example: Filled Email :unamused:


`A colleague was selected. If a future need arises, we will contact you.`


---

## Improvements

- For some reason, the `DateTime` information from Gmail only gives the date and not the actual timestamp of the email. This info can be extracted by other means however, probably.
