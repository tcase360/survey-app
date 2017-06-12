// Model for generic questions, contains common attributes
var QuestionModel = Backbone.Model.extend({

  initialize: function() {
    this.attributes.id = 'question-element--' + this.attributes.code;


    switch (this.type) {
      case('text'): {
        this.questionObject = new TextQuestionModel(this);
      }

      case('multiChoice'): {
        this.questionObject = new MultiChoiceQuestionModel(this);
      }

      case('yesNo'): {
        this.questionObject = new YesNoQuestionModel(this);
      }

      case('rating'): {
        this.questionObject = new RatingQuestionModel(this);
      }

      case('form'): {
        this.questionObject = new FormQuestionModel(this);
      }

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
  initialize: function() {

  },

  defaults: {
    answer: null,
    validated: false,
  }
});


var MultiChoiceQuestionModel = Backbone.Model.extend({
  initialize: function() {

  },

  defaults: {
    answer: null,
    validated: false,
  }
});

var YesNoQuestionModel = Backbone.Model.extend({

});

var RatingQuestionModel = Backbone.Model.extend({
  initialize: function() {

  },

  defaults: {
    type: 'rating',
    answer: null,
    validated: false,
  }
});

var FormQuestionModel = Backbone.Model.extend({

});