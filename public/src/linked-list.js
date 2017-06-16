var mockData = {
  "success": true,
  "Code": "HXUQMH7XALED",
  "lastAnswerDate": "2017-06-12T13:02:43Z",
  "bgImage": "",
  "data": {
    "alreadyAnsweredLabel": "You have already taken this survey, please go click the button to go to the next step",
    "startBtnLabel": "Let's get started",
    "welcomeText": "Welcome to the survey",
    "thanksText": "Thanks for taking this survey",
    "skippable": true,
    "nextBtnLabel": "Next",
    "submitBtnLabel": "Save",
    "skipBtnLabel": "Skip",
    "questions": [
      {
        "code": 1,
        "type": "text",
        "question": "this is a text question",
        "maxLength": 50,
        "required": true,
        "cssLabel": "label-success"
      }, {
        "code": 2,
        "type": "multiChoice",
        "question": "multi choice list",
        "style": "list",
        "multiple": false,
        "required": true,
        "answers": [
          {
            "key": 1,
            "value": "ans1"
          }, {
            "key": "2",
            "value": "ans2"
          }, {
            "key": "3",
            "value": "ans3"
          }
        ],
        "countCode": 3,
        "cssLabel": "label-primary"
      }, {
        "code": 3,
        "type": "multiChoice",
        "question": "multi choice dropdown",
        "style": "dropdown",
        "multiple": false,
        "required": true,
        "answers": [
          {
            "key": 1,
            "value": "ans3"
          }, {
            "key": "2",
            "value": "ans2"
          }, {
            "key": "3",
            "value": "ans1"
          }
        ],
        "countCode": 3,
        "cssLabel": "label-primary"
      }, {
        "code": 4,
        "type": "yesNo",
        "question": "yes/no",
        "yesLabel": "Yes",
        "noLabel": "No",
        "required": true,
        "cssLabel": "label-info"
      },
      // {
      //   "code": 5,
      //   "type": "rating",
      //   "question": "rating question faces",
      //   "required": true,
      //   "style": "faces",
      //   "cssLabel": "label-warning",
      //   "styleLock": false
      // },
      {
        "code": 6,
        "type": "rating",
        "question": "rating question stars",
        "required": true,
        "style": "stars",
        "cssLabel": "label-warning",
        "styleLock": false
      },
      // {
      //   "code": 7,
      //   "type": "rating",
      //   "question": "rating question numebrs",
      //   "required": true,
      //   "style": "numbers",
      //   "cssLabel": "label-warning",
      //   "styleLock": false
      // },
      {
        "code": 8,
        "type": "form",
        "question": "hello world this is a form",
        "required": true,
        "override": false,
        "fields": [
          {
            "key": "first_name",
            "value": "first name"
          }, {
            "key": "email",
            "value": "email"
          }, {
            "key": "last_name",
            "value": "last name"
          }, {
            "key": "document_type",
            "value": "document type"
          }, {
            "key": "document_number",
            "value": "document number"
          }, {
            "key": "gender",
            "value": "gender"
          }, {
            "key": "birth_date",
            "value": "birth date"
          }
        ],
        "cssLabel": "label-danger",
        "filterFields": []
      }
    ],
    "questionCount": 8
  },
  "customer": {
    "lang": "eng",
    "is_logged": false,
    "id": "",
    "first_name": "",
    "last_name": "",
    "username": "",
    "realm": "",
    "birth_date": "",
    "gender": "",
    "email": "",
    "document_type": "",
    "document_number": ""
  }
};

{
  "questions" : [
    {
      "code": "1",
      "type": "text",
      "answer": "taylor",
      "question": "Text Question"
    }, {
      "code": "2",
      "type": "multiChoice",
      "answer": [
        {
          "key": "1",
          "value": "ans1"
        }
      ],
      "question": "Multiple Choice Question"
    }, {
      "code": "3",
      "type": "yesNo",
      "answer": false,
      "question": "Yes/No Question"
    }, {
      "code": "4",
      "type": "rating",
      "answer": "5",
      "question": "Rating Question"
    }, {
      "code": "5",
      "type": "form",
      "answer": [
        {
          "value": "taylor",
          "key": "first_name"
        }
      ],
      "question": "Form Question"
    }
  ]
} :

// multi choice has two styles - list or dropdown
// rating - "faces", "numbers" and "stars"
//
// after submit, show thank you text
// if trigger next step is empty, then show survey
// if trigger next step is not empty and the lastAnswerDate is present, automatically send to next step

var svg = {
  checkMark: '<svg style="width:24px;height:24px" viewBox="0 0 24 24">' + '<path fill="#000000" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />' + '</svg>'
}
