var TextQuestionView = Backbone.View.extend({
  template: _.template($('#textInputQuestionTemplate').html()),

  className: 'question-container text-question-container mui-container',

  initialize: function() {
    this.render();
  },

  events: {
     'keydown': 'inputText',
     'click .next-question-button': 'nextButtonCheck'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  inputText: function(event) {
    var value = $(event.target).val();
    var model = getModelFromCollection(this.model.cid);
    model.set({ 'answer': value });

    if(value !== '') {
      model.set({ validated: true });
    }
  },

  nextButtonCheck: function(event) {
    var nextQuestionTriggered = viewNextQuestion(this);
    if (!nextQuestionTriggered) {
      // error handling
    }
  }
});

var SingleChoiceQuestionView = Backbone.View.extend({
  template: _.template($('#singlePickDropdownTemplate').html()),

  tagName: 'div',

  className: 'question-container single-choice-question-container mui-container',

  intialize: function() {

    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  events: {
    'click li': 'selectAnswer',
    'click .next-question-button': 'nextButtonCheck'
  },

  selectAnswer: function(event) {
    var currentTarget = $(event.currentTarget);
    var value = currentTarget.data().index;
    var text = currentTarget.find('a').text();
    var model = getModelFromCollection(this.model.cid);

    var container = currentTarget.closest('.single-choice-question-container');
    var button = container.find('button');

    button.html(text + '\n <span class="mui-caret"></span>');

    model.set({
      answer: value,
      validated: true
    });
  },

  nextButtonCheck: function(event) {
    var nextQuestionTriggered = viewNextQuestion(this);
    if (!nextQuestionTriggered) {
      // error handling
    }
  }
});

var MultiChoiceQuestionView = Backbone.View.extend({
  template: _.template($('#multiChoiceQuestionTemplate').html()),

  tagName:'div',

  className: 'question-container multiple-choice-question-container mui-container',

  intialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  events: {
    'click a': 'chooseOption',
    'click .next-question-button': 'nextButton'
  },

  chooseOption: function(event) {
    var model = getModelFromCollection(this.model.cid);
    var target = $(event.target);
    var link = target.find('a');

    var container = target.closest('.multiple-choice-list');
    var array = container.find('a').toArray();

    var value = target.attr('data-checked');

    if(value == 'true') {
      target.attr('data-checked', false);
      target.removeClass('active');
      target.addClass('mui-btn--flat');
    } else {
      target.attr('data-checked', true);
      target.addClass('active');
      target.removeClass('mui-btn--flat')
    }

    var newArray = array.filter(function(element, index) {
     if($(element).attr('data-checked') == 'true') {
       return true;
     }
    }).map(function(element, index, array) {
      if($(element).attr('data-checked')) {
        return {
          key: $(element).attr('data-index'),
          value: $(element).text().trim()
        }
      }
    });

    model.set({
      answer: newArray
    })
  },

  nextButton: function(event) {
    var nextQuestionTriggered = viewNextQuestion(this);
    if (!nextQuestionTriggered) {
      // error handling
    }
  }

});

var YesNoQuestionView = Backbone.View.extend({
  className: 'question-container'
});

var RatingQuestionView = Backbone.View.extend({
  template: _.template($('#starRatingTemplate').html()),

  tagName: 'div',

  className: 'question-container rating-question-container mui-container',

  events: {
     'click input': 'validateRating',
     'click .next-question-button': 'nextButton'
  },

  intialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  validateRating: function(event) {
    var value = $('input[name=rate-group--' + this.model.attributes.code + ']').val();
    var model = getModelFromCollection(this.model.cid);
    model.set({
      answer: value,
      validated: true,
    });
  },

  nextButton: function(event) {
    var nextQuestionTriggered = viewNextQuestion(this);
    if (!nextQuestionTriggered) {
      // error handling
    }
  }
});

var FormQuestionView = Backbone.View.extend({
  className: 'question-container'
});
