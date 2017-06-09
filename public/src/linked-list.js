var mockData = {
  "success": true,
  "Code": "Y8LXB2N6377K",
  "bgImage": "",
  "data": {
    "welcomeText": "",
    "thanksText": "",
    "skippable": false,
    "nextBtnLabel": "Next",
    "submitBtnLabel": "Save",
    "skipBtnLabel": "Skip",
    "questions": [
      {
        "code": 1,
        "type": "text",
        "question": "Text Question",
        "description": "Text Question Description",
        "maxLength": 50,
        "required": true,
        "cssLabel": "label-default"
      }, {
        "code": 2,
        "type": "form",
        "question": "Form Question",
        "description": "Form Question  Description",
        "required": true,
        "override": false,
        "fields": [
          {
            "key": "first_name",
            "value": "First Name"
          }, {
            "key": "last_name",
            "value": "Last Name"
          }, {
            "key": "email",
            "value": "Email"
          }, {
            "key": "document_type",
            "value": "Document Type"
          }, {
            "key": "document_number",
            "value": "Document Number"
          }, {
            "key": "gender",
            "value": "Gender"
          }, {
            "key": "birth_date",
            "value": "Birth Date"
          }
        ],
        "cssLabel": "label-danger",
        "filterFields": []
      }, {
        "code": 1,
        "type": "multiChoice",
        "question": "Multiple Choice Question",
        "description": "Multiple Choice Question Description",
        "style": "list",
        "multiple": false,
        "required": true,
        "answers": [
          {
            "key": 1,
            "value": "ANS1"
          }, {
            "key": "2",
            "value": "ANS2"
          }, {
            "key": "3",
            "value": "ANS3"
          }
        ],
        "countCode": 3,
        "cssLabel": "label-primary"
      }, {
        "code": 2,
        "type": "yesNo",
        "question": "Yes/No Question",
        "description": "Yes/No Question Description",
        "yesLabel": "Yes",
        "noLabel": "No",
        "required": true,
        "cssLabel": "label-info"
      }, {
        "code": 3,
        "type": "rating",
        "question": "Rating Question",
        "description": "Rating Question Description",
        "required": true,
        "style": "faces",
        "cssLabel": "label-warning",
        "styleLock": false
      }
    ]
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

  var svg = {
    checkMark: '<svg style="width:24px;height:24px" viewBox="0 0 24 24">' + '<path fill="#000000" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />' + '</svg>'
  }
