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


 var TextQuestionView = Backbone.View.extend({
   template: _.template($('#textInputQuestionTemplate').html()),

   className: 'text-question-container mui-container',

   initialize: function() {
     this.render();
   },

   events: {
      'keydown': 'inputText'
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
   }
 });

 var SingleChoiceQuestionView = Backbone.View.extend({
   template: _.template($('#singlePickDropdownTemplate').html()),

   tagName: 'div',

   className: 'single-choice-question-container mui-container',

   intialize: function() {

     this.render();
   },

   render: function() {
     this.$el.html(this.template(this.model.toJSON()));
     return this;
   },

   events: {
     'click li': 'selectAnswer'
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
   }
 });

 var MultiChoiceQuestionView = Backbone.View.extend({
   template: _.template($('#multiChoiceQuestionTemplate').html()),

   tagName:'div',

   intialize: function() {
     this.render();
   },

   render: function() {
     this.$el.html(this.template(this.model.toJSON()));
     return this;
   },

   events: {
     'click a': 'chooseOption'
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

     console.log(newArray);



     model.set({
       answer: newArray
     })
   }

 });

 var YesNoQuestionView = Backbone.View.extend({

 });

 var RatingQuestionView = Backbone.View.extend({
   template: _.template($('#starRatingTemplate').html()),

   tagName: 'div',

   className: 'rating-question-container mui-container',

   events: {
      'click input': 'validateRating'
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
      })
   }
 });

 var FormQuestionView = Backbone.View.extend({

 });

 function getModelFromCollection(id) {
   return questionsCollection.get(id);
 }

 var QuestionsCollection = Backbone.Collection.extend({
   model: QuestionModel,
 });

 var questionsCollection = new QuestionsCollection;

 var questions = mockData.data.questions.map(function(element, index, arr) {
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

     case 'multiChoice': {
       questionView = new MultiChoiceQuestionView({
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

     case 'singleChoice': {
       questionView = new SingleChoiceQuestionView({
         model:question,
         id:question.attributes.id
       });
     } break;

     default: {
       null;
     } break;
   }

   $("#container").append(questionView.render().$el);
 });
