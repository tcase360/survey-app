var TextQuestionView = Backbone.View.extend({
  template: _.template($('#textInputQuestionTemplate').html()),

  className: 'question-container text-question-container mui-container',

  initialize: function() {
    this.render();
  },

  events: {
     'keyup': 'inputText',
     'click .next-question-button': 'nextButtonCheck'
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  inputText: function(event) {
    var target = $(event.target);
    var value = target.val();
    var container = target.closest('.question-container');
    var nextButton = container.find('.next-question-button');
    var model = getModelFromCollection(this.model.cid);

    model.set({ 'answer': value });

    if(value.trim() !== '') {
      model.set({ validated: true });
      nextButton.fadeIn('slow');
    } else {
      model.set({ validated: false });
      nextButton.fadeOut('slow');
    }

    if(event.keyCode === 13 || event.keyCode === 9) {
      event.preventDefault();
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
    'click .next-question-button': 'nextButtonCheck',
    'click .mui-select': 'setEventForDropdown',
    'select change': 'selectChangeHandle'
  },

  selectChangeHandle: function(event) {
    console.log(arguments);
  },

  setEventForDropdown: function(event) {
    var self = this;
    var target = $(event.currentTarget);
    var menuList = target.find('.mui-select__menu');
    var children = menuList.children();
    $(children[0]).remove();
    var height = menuList.height();
    menuList.css('height', height - 30 + 'px');

    children.unbind().one('click', function(event) {
      var target = $(event.target);
      var options = self.model.attributes.answers;
      var value = target.text().trim();

      var answer = options.filter(function(element, index) {
        if(value === element.value) {
          return element;
        }
      });

      self.model.set({
        answer: answer[0],
        validated: true
      });

      viewNextQuestion(self);
    });
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
    });

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
  template: _.template($('#yesNoQuestionTemplate').html()),

  tagName: 'div',

  className: 'question-container yes-no-question-container mui-container',

  events: {
    'click button': 'handleButtonClick',
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  handleButtonClick: function(event) {
    var self = this;
    var target = $(event.currentTarget);
    var value = target.data().answer;
    var model = self.model;
    var answer;

    if(value === 'yes') answer = true;
    if(value === 'no') answer = false;

    model.set({
      'answer': answer,
      'validated': true
    });

    setTimeout(function() {
      viewNextQuestion(self);
    }, 500);
  }


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
    var target = $(event.target);
    var value = $('input[name=rate-group--' + this.model.attributes.code + ']').val();
    var model = getModelFromCollection(this.model.cid);
    model.set({
      answer: parseInt(value),
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
  template: _.template($('#formTemplate').html()),

  className: 'question-container form-question-container mui-container',

  initialize: function() {
    this.render();
  },

  render: function() {
    console.log(this.model.toJSON());
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  events: {
    'keyup input': 'handleTyping',
    'click input': 'handleTyping',
  },

  handleTyping: function(event) {
    var self = this;
    var model = self.model;
    var target = $(event.target);
    var container = target.closest('.form-inputs-list');

    var radioValue = this.checkRadioValue(container);
    var birthDate = this.checkBirthdateInput(container);

    var validated = false;

    var list = container.find('li:not([data-writable="false"])').toArray();

    var validatedArray = list.filter(function(element, index, array) {
      var value = $(element).find('input').val();
      if(value.length > 0) {
        return true;
      }
    }).map(function(element, index) {
      return {
        value: $(element).find('input').val(),
        key: $(element).data().key,
      }
    });

    if(validatedArray.length === list.length && radioValue.validated && birthDate.validated) {
      if(radioValue.value) {
        validatedArray.push({
          value: radioValue.value,
          key: 'gender'
        });
      }
      if(birthDate.value) {
        validatedArray.push({
          value: birthDate.value,
          key: 'birth_date'
        })
      }
      validated = true;
      model.set({
        answer: validatedArray,
        validated: true
      });

      if(event.keyCode === 13) {
        viewNextQuestion(self);
      }
    }
  },

  checkRadioValue: function(container) {
    if(container.find('input:radio[name="gender"]').length) {
      var radioChecked = container.find('input:radio[name="gender"]:checked');
      var radioValue;

      if(radioChecked.length) {
        return {
          value: radioChecked.val(),
          validated: true
        }
      } else {
        return {
          value: undefined,
          validated: false
        }
      }

    } else {
      return {
        value: undefined,
        validated: true
      }
    }
  },

  checkBirthdateInput: function(container) {
    if(container.find('.dob--month-input').length) {
      var monthInput = container.find('.dob--month-input').val();
      var dayInput = container.find('.dob--day-input').val();
      var yearInput = container.find('.dob--year-input').val();
      var date;

      if((!!monthInput || !!dayInput || !!yearInput) &&
        ((1 <= monthInput <= 12) && (1 <= dayInput <= 31) && (1900 <= yearInput <= 2017 ))) {
        return {
          value: monthInput + '/' + dayInput + '/' + yearInput,
          validated: true
        }
        date = monthInput + '/' + dayInput + '/' + yearInput;
      } else {
        return {
          value: undefined,
          validated: false
        }
      }
    } else {
      return {
        value: undefined,
        validated: true
      };
    }
  }

});
