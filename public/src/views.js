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

    if(event.keyCode === 13) {
      this.nextButtonCheck(event);
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
    'click .next-question-button': 'nextButtonCheck'
  },

  nextButtonCheck: function(event) {
    var container = $(event.target).closest('.question-container');

    var select = container.find('select');
    var value = select.val();
    var model = getModelFromCollection(this.model.cid);

    model.set({
      answer: value,
      validated: !!value ? true : false
    });

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
    'click a.multi-choice-answer-button': 'chooseOption',
    'click .next-question-button': 'nextButton'
  },

  chooseOption: function(event) {
    var self = this;
    var model = getModelFromCollection(this.model.cid);
    var target = $(event.target);
    var link = target.find('a');

    var container = target.closest('.multiple-choice-list');
    var array = container.find('a').toArray();
    var listArray = container.find('li').toArray();

    listArray.map(function(element, index) {
      var child = $(element).find('a');
      if(child.attr('data-checked') == 'true') {
        child.attr('data-checked', false);
        child.removeClass('active');
        child.addClass('mui-btn--flat');
      }
    })

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

    var validated = false;

    if(newArray.length > 0) validated = true;

    model.set({
      answer: newArray,
      validated: validated
    })

    if (validated) {
      setTimeout(function() {
        viewNextQuestion(self);
      }, 200);
    }
  },

  nextButton: function(event) {
    var nextQuestionTriggered = viewNextQuestion(this);
    if (!nextQuestionTriggered) {
      // error handling
    }
  }

});

var YesNoQuestionView = Backbone.View.extend({
  className: 'question-container yes-no-question-container mui-container',


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
    var self = this;
    var value = $('input[name=rate-group--' + this.model.attributes.code + ']').val();
    var model = getModelFromCollection(this.model.cid);
    model.set({
      answer: value,
      validated: true,
    });

    setTimeout(function() {
      viewNextQuestion(self);
    }, 200);
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
