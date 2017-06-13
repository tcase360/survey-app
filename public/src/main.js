 /**
  * This is a quick description of how I am solving
  * this "Survey App" data flow/initialization.
  *
  * 1). Call API
  * 2). Store global properties (survey code, name, etc.)
  * 3). Iterate through questions, first sending them
  *     into the "Element" function with the data object
  *     of each question. This will set common properties
  *     for each question and setting the HTML container
  *     for each one (once again, common throughout all
  *     elements).
  * 4). Send the element to the correct type to create the
  *     custom HTML for each one, and custom properties.
  *     This includes validation, HTML, etc.
  * 5). Append the HTML for each and add it to the linked
  *     list (DataStore), and set event listeners.
  */

 /**
  * This will be a linked list
  * @type {Object}
  *
  * To initialize the linked list, it will push a
  * new Element() constructor into the  mainArray,
  * therefore normalizing the methods and attributes.
  */

 var QuestionsCollection = Backbone.Collection.extend({
   url:'/src/mock-data.json',
   model: QuestionModel,
 });

function getModelFromCollection(id) {
  return questionsCollection.get(id);
}


function viewNextQuestion(self) {
 var model = getModelFromCollection(self.model.cid);
 var validated = model.get('validated');
 if(validated) {
   questionsCollection.nextQuestion(model);
   return true;
 } else {
   return false;
 }
}

function formValidityCheck() {
  var validity = true;
  var invalidArray = [];
  questionsCollection.each(function(element, index, array) {
    if(!element.attributes.validated || !element.attributes.required) {
      validity = false;
      invalidArray.push({
        element
      })
    }
  });

  if(!validity) {
    return invalidArray;
  } else {
    return true;
  }
}

 var QuestionsCollection = Backbone.Collection.extend({
   model: QuestionModel,

   // Scrolls to next question in survey
   nextQuestion: function(model) {
     var nextQuestion = $('#' + model.attributes.id).next();

     if(!!nextQuestion.length) {
       $('html, body').animate({
         scrollTop: (nextQuestion.offset().top)
       }, 250);
     } else {
       $('html, body').animate({
         scrollTop: ($('.submit-section').offset().top)
       }, 250);
     }
   }
 });

 var questionsCollection = new QuestionsCollection;

 var questions = mockData.data.questions.map(function(element, index, arr) {
   element.skipBtnLabel = mockData.data.skipBtnLabel;
   element.nextBtnLabel = mockData.data.nextBtnLabel;
   var question = new QuestionModel(element);
   questionsCollection.add(question);
 });

 questionsCollection.each(function(question) {
   var questionView;

   switch (question.attributes.type) {
     case 'text': {
       questionView = new TextQuestionView({
         model:question,
         id:question.attributes.id,
       });
     } break;

    //  case 'multiChoice': {
    //    questionView = new MultiChoiceQuestionView({
    //      model:question,
    //      id:question.attributes.id,
    //    });
    //  } break;

     case 'yesNo': {
       questionView = new YesNoQuestionView({
         model:question,
         id:question.attributes.id
       });
     } break;

     case 'rating': {
       questionView = new RatingQuestionView({
         model:question,
         id:question.attributes.id
       });
     } break;

     case 'form': {
       questionView = new FormQuestionView({
         model:question,
         id:question.attributes.id
       });
     } break;

     case 'multiChoice': {
       if(question.attributes.style === 'list') {
         questionView = new MultiChoiceQuestionView({
            model:question,
            id:question.attributes.id,
          });
       }
       if (question.attributes.style === 'dropdown') {
         questionView = new SingleChoiceQuestionView({
           model:question,
           id:question.attributes.id
         });
       }
     } break;

     default: {
       null;
     } break;
   }

   $("#container").append(questionView.render().$el);
 });

function postSurveyData(data, callback) {

}

function submitForm(e) {
  var validity = formValidityCheck();

  if(validity === true) {
    postSurveyData(questionsCollection.toJSON(), function(data) {
      console.log(validity);
    });
  } else {
    validity.forEach(function(data) {

    })
  }
}

function initializeSurvey(event) {
  $('#welcome-section').fadeOut('fast', function() {
      $('#container').fadeIn('fast', function() {
        $('#submit-section').fadeIn('fast');
      });
  });
}

$(document).ready(function() {
 $('#form-submit-button').on('click', submitForm);
 $('#initialize-survey').on('click', initializeSurvey);
});
