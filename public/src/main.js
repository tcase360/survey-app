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
  * @type { Object }
  *
  * To initialize the linked list, it will push a
  * new Element() constructor into the  mainArray,
  * therefore normalizing the methods and attributes.
  */
var QuestionsCollection = Backbone.Collection.extend({
  model: QuestionModel,

  // Scrolls to next question in survey
  nextQuestion: function(model) {
    var currentQuestion = $('#' + model.attributes.id);
    var nextQuestion = currentQuestion.next();

    var screen_height = $(window).height();

    if(!!nextQuestion.length) {
      $('html, body').animate({
        scrollTop: (nextQuestion.offset().top - screen_height * 0.25)
      }, 250);
    } else {
      $('html, body').animate({
        scrollTop: ($('.submit-section').offset().top)
      }, 250);
    }

    updateProgress();
  }
});

var questionsCollection = new QuestionsCollection;

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


function addQuestionsToView() {
 questionsCollection.each(function(question) {
   var questionView;

   switch (question.attributes.type) {
     case 'text': {
       questionView = new TextQuestionView({
         model:question,
         id:question.attributes.id,
       });
     } break;

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
}

function updateProgress() {
  var length = questionsCollection.length;
  var invalidQuestions = formValidityCheck();
  var progressBar = $('.progress > .determinate');
  var progressCounter = $('.progress-counter');
  var percentage;

  if(!!invalidQuestions.length) {
    percentage = ((length - invalidQuestions.length) / length) * 100;
    progressBar.css('width', percentage + '%');
  } else {
    progressBar.css('width', '100%');
  }
  var progressCount = length - invalidQuestions.length;
  if(!progressCount) {
    progressCount = length;
  }
  progressCounter.text(progressCount + '/' + length);
}

function postSurveyData(formData, callback) {
  $.ajax({
    type:'POST',
    url: BASE_URL + '/api/v1/survey/view/' + (!!MYAPPS.getSk() ? MYAPPS.getSk() : '0') + '/' + window.SURVEY_DATA.code,
    data: JSON.stringify(formData),
    success: function(data) {
      callback();
    }
  })
}

function enrichData(data) {
  var enrichedData = {
    questions: data.map(function(element, index) {
      return {
        code: '' + element.code,
        type: element.type,
        answer: element.answer,
        question: element.question,
      }
    })
  }
  return enrichedData;
}

function submitForm(e) {
  var validity = formValidityCheck();
  var enrichedData = enrichData(questionsCollection.toJSON());

  if(validity === true) {
    postSurveyData(enrichedData, function(data) {
      $('.submit-section--body')
      .text(window.SURVEY_DATA.data.thanksText)
      .fadeIn('fast', function() {
        setTimeout(function() {
          if(MYAPPS.getNextUrl()) {
            MYAPPS.goNext();
          } else {
            MYAPPS.goHome();
          }
        }, 1000);
      });
    });
  } else {
    $('html, body').animate({
      scrollTop: ($('#' + validity[0].element.attributes.id).offset().top)
    }, 250);
    validity.forEach(function(data) {

    })
  }
}

function initializeSurvey(event) {
  var length = questionsCollection.length;
  var progressCounter = $('.progress-counter');

  $('#welcome-section').fadeOut('fast', function() {
      $('#container').fadeIn('fast', function() {
        progressCounter.text('0/' + length);
        $('footer').fadeIn('slow');
        $('#submit-section').fadeIn('fast');
        $('body').unbind('keydown');
        $('.question-container').first().addClass('active');
      });
  });
}

function pageLoaded(params) {
  MYAPPS.renderNavbar({
    nextBtn: false
  });
  $('#initialize-survey').text(params['data']['startBtnLabel']);
  $('#form-submit-button').text(params['data']['submitBtnLabel']);
  $('.submit-section--body').text(params['data']['thanksText']);
  $('.welcome-message--body--header').text(params['data']['welcomeText']);
  $('#loading_overlay').fadeOut('fast', function() {
    $('body').removeClass('loading');
    $('#welcome-section').fadeIn('slow');
  })
}

function detectEnterKey(event) {
  if(event.keyCode === 13) {
    initializeSurvey(event);
  }
}

function detectActiveDiv(event) {
  var elementsArray = $('.question-container').toArray();
  var screen_height = $(window).height();
  var activation_offset = 0.5; //determines how far up the the page the element needs to be before triggering the function
  var max_scroll_height = $('body').height() - screen_height - 5; //-5 for a little bit of buffer
  var y_scroll_pos = window.pageYOffset;

  //Does something when user scrolls to it OR
  //Does it when user has reached the bottom of the page and hasn't triggered the function yet

  elementsArray.map(function(element, index, array) {
    var element_position = $(element).offset().top;
    var activation_point = element_position - (screen_height * activation_offset);
    var element_in_view = y_scroll_pos > activation_point;
    var has_reached_bottom_of_page = max_scroll_height <= y_scroll_pos && !element_in_view;
    var element_reached_top_of_screen = element_position < y_scroll_pos;

    if(element_in_view || has_reached_bottom_of_page) {
      if(!$(element).hasClass('active')) {
        $(element).addClass('active');
      }
    } else {
      $(element).removeClass('active');
    }

    if(element_reached_top_of_screen) {
      $(element).removeClass('active');
    }
  });
}

$(document).ready(function() {
  $.ajax({
    method: 'GET',
    // if sk is present then:
    // /api/v1/survey/view/{sk}/0
    // if sk is not present then:
    // /api/v1/survey/view/0
    url: BASE_URL + '/api/v1/survey/view/' + (!!MYAPPS.getSk() ? MYAPPS.getSk() : '0') + '/' + (!!MYAPPS.getParam('pc') ? MYAPPS.getParam('pc') : '0'),
    dataType: 'JSON',
    success: function(data) {
      pageLoaded(data);
      window.SURVEY_DATA = data;
      if(!data.success && MYAPPS.getNextUrl()) {
        MYAPPS.goNext();
        return;
      } else if(!data.success) {
        MYAPPS.goHome();
        return;
      }
      var questions = data.data.questions.map(function(element, index, arr) {
        element.skipBtnLabel = data.data.skipBtnLabel;
        element.nextBtnLabel = data.data.nextBtnLabel;
        var question = new QuestionModel(element);
        questionsCollection.add(question);
      });

      addQuestionsToView();
    }
  })

 $('#form-submit-button').on('click', submitForm);
 $('#initialize-survey').on('click', initializeSurvey);
 $('body').on('keydown', detectEnterKey);
 $(window).on('scroll', detectActiveDiv);
 var trigger = MYAPPS.getNextUrl();

 $('body').css('margin-top', '100px');
});
