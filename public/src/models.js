// Model for generic questions, contains common attributes
var QuestionModel = Backbone.Model.extend({

  initialize: function() {
    this.attributes.id = 'question-element--' + this.attributes.code;

    switch (this.attributes.type) {
      case('text'): {
        this.questionObject = new TextQuestionModel(this);
      } break;

      case('multiChoice'): {
        this.questionObject = new MultiChoiceQuestionModel(this);
      } break;

      case('yesNo'): {
        this.questionObject = new YesNoQuestionModel(this);
      } break;

      case('rating'): {
        this.questionObject = new RatingQuestionModel(this);
      } break;

      case('form'): {
        this.questionObject = new FormQuestionModel(this);
      } break;

      default: null;
    }
  }
});

// Models for each type of question; only contains unique attributes
var TextQuestionModel = Backbone.Model.extend({
  initialize: function() {
    this.maxLength = this.attributes.maxLength;
  },

  defaults: {
    answer: null,
    validated: false,
  }
});

var SingleChoiceQuestionModel = Backbone.Model.extend({
  defaults: {
    answer: null,
    validated: false,
  }
});


var MultiChoiceQuestionModel = Backbone.Model.extend({
  defaults: {
    answer: null,
    validated: false,
  }
});

var YesNoQuestionModel = Backbone.Model.extend({
  defaults: {
    answer: null,
    validated: false
  }
});

var RatingQuestionModel = Backbone.Model.extend({
  defaults: {
    type: 'rating',
    answer: null,
    validated: false,
  }
});

var FormQuestionModel = Backbone.Model.extend({
  initialize: function() {
    var array = this.attributes.attributes.fields.map(function(element, index, array) {
      var answer = false;
      if(window.SURVEY_DATA.customer) {
        answer = window.SURVEY_DATA.customer[element.key];
      }
      return {
        key: element.key,
        label: element.value,
        answer: answer
      }
    });
    this.attributes.set('fields', array);
  },

  defaults: {
    validated: false,
    answers: false,
  }
});
