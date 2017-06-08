var mockData = {
  "code": "BLKUG1YJ5W2W", // unique code of survey
  "name": "Survey Name", // name of survey
  "data": {
 "welcomeText": "Welcome",
 "thanksText": "Thanks",
 "skippable": false, // if user can skip all survey
 "nextBtnLabel": "Next",
 "submitBtnLabel": "Save",
 "skipBtnLabel": "Skip",
 "questions": [
   {
     "code": 1, // unique code of question. The code is unique inside survey
     "type": "text", // type of question
     "question": "Text Question",
     "description": "Text Description (optional)",
     "maxLength": 50, // the user can insert maxLength characters in input field
     "required": true, // if the user can skip this question
   },
   {
     "code": 2,
     "type": "multiChoice",
     "question": "Multiple Choice Question",
     "description": "Multiple Choice Description  (optional)",
     "style": "dropdown", // styles are dropdown | list
     "multiple": false, // the user can select more answers for this question.
     "required": true,
     "answers": [ // answers list. The user can choice one (more) of them
       {
         "key": 2,
         "value": "Answer 1"
       },
       {
         "key": 5,
         "value": "Answer 2"
       },
       {
         "key": 7,
         "value": "Answer 3"
       }
     ],
   },
   {
     "code": 3,
     "type": "yesNo",
     "question": "Yes/No Question",
     "description": "Yes/No Description  (optional)",
     "yesLabel": "Yes",
     "noLabel": "No",
     "required": true,
   },
   {
     "code": 6,
     "type": "rating",
     "question": "Rating Question",
     "description": "Rating Description (optional)",
     "required": true,
     "style": "faces", // style are stars | faces | numbers
   },
   {
     "code": 7,
     "type": "form",
     "question": "Form Question",
     "description": "Form Description (optional)",
     "required": false,
     "override": true, // if some field is not empty, the user can edit old value
     "fields": [ // fields list to show to user
       {
         "key": "first_name",
         "value": "First Name Label"
       },
       {
         "key": "last_name",
         "value": "Last Name Label"
       },
       {
         "key": "email",
         "value": "Email Label"
       },
       {
         "key": "document_type",
         "value": "Document Type Label"
       },
       {
         "key": "document_number",
         "value": "Document Number Label"
       },
       {
         "key": "gender",
         "value": "Gender Label"
       },
       {
         "key": "birth_date",
         "value": "Birth Date Label"
       }
     ],
   }
 ]
  }
}

var svg = {
  checkMark: '<svg style="width:24px;height:24px" viewBox="0 0 24 24">' +
              '<path fill="#000000" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />' +
              '</svg>'
}
