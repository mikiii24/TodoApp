$(function() {
  Backbone.Model.prototype.idAttribute = 'id';

  var Todo = Backbone.Model.extend({
    idAttribute: 'id',
    urlRoot: 'http://localhost:8080/todos',
    defaults: {
      title: '',
      status: false
    },
    validate: function(attrs) {
      if(_.isEmpty(attrs.title)) {
        return '※タイトルを入力してください';
      }
    },
    initialize: function() {
      this.on('invalid', function(model, error) {
        $('#error').html(error);
      })
    }
  });

  var Todos = Backbone.Collection.extend({
    url: 'http://localhost:8080/todos',
    model: Todo
  });

  var todos = new Todos();


  var TodoView = Backbone.View.extend({
    model: new Todo(),
    tagName: 'li',
    initialize: function() {
      this.template = _.template($('#todo-template').html());
      this.model.on('destroy', this.todoRemove, this);
      this.render();
    },

    events: {
      'click .toggle': 'toggle',
      'dblclick .todo': 'edit',
      'keypress .edit': 'updateOnEnter',
      'blur .edit': 'close', 
      'click .batsu': 'todoDestroy',
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$title = this.$('.todoText');
      this.input = this.$('.edit');
      return this;
    },

    toggle: function(){
      var status = !this.model.get('status');
      this.model.save({ status: status});
      this.model.set('status', status);
    },

    close: function(){
      this.$el.removeClass("editing");
    },

    todoDestroy: function(){
      this.model.destroy({
        success: function(response) {
          
          console.log('success id:' + response.toJSON().id);
        },
        error: function () {
          console.log('error');
        }
      });
    },

    edit: function(){
      this.$el.addClass("editing");
      this.input.focus();
    },

    updateOnEnter: function(e) {
      if (e.keyCode === 13) { // Enterキーが押されたら
        this.update();
      }
    },

    update: function(){
      // this.model.set('title', $('.edit').val());
      // 上のコードを下のものに変更すると、正常にupdateができた。
      // titleだけでなく、idもsetしないと、insertになってしまう。
      this.model.set({
        title: this.input.val(),
        id: this.model.get('id')
      });

      
      this.model.save(null, {
        success: function(response) {
          console.log('Successful id: ' + response.toJSON().id);
        },
        error: function(response) {
          console.log('failed');
        },
      });
    },

    todoRemove: function() {
      this.$el.remove();
    },

    remove: function(){
      this.$el.remove();
    },
  });

  var TodosView = Backbone.View.extend({
    model: todos,
    el: $('#todoList'),
    initialize: function() {
      var self = this;
      this.model.on('add', this.renderTodo, this);
      this.model.on('change', function(){
        setTimeout(function(){
          self.render();
        }, 30);
      }, this);
      this.model.on('remove', this.render, this);
      this.model.fetch({
        success: function(response) {
          _.each(response.toJSON()
          , function(todo) {
            console.log(todo);
            console.log('success id:' + todo.id);
          });
        },
        error: function(){
          console.log('error');
        }
      });
    },

    render: function(){
      var self = this;
      this.$el.html('');
      _.each(this.model.toArray(), function(todo) {
        self.$el.append(new TodoView({model: todo}).render().$el);
      });
      return this;
    },

    renderTodo: function(todo){
      var self = this;
      console.log(todo);
      self.$el.append(new TodoView({model: todo}).render().$el);
      return this;
    }
  });

  var todosView = new TodosView();

  $(document).ready(function(){
    $('#addButton').on('click', function() {
      var todo = new Todo({
          title: $('#title').val()
      });

      if(!todo.isValid()) {
        return;
      }

      // JSONデータをPOSTするための設定
      var requestOptions = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo.toJSON()),
      };

      // fetchを使用してサーバーにリクエストを送信
      fetch('http://localhost:8080/todos', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('New todo created with id: ', todo.id);
            var newTodo = new Todo(data);
            todos.add(newTodo);
            todosView.render();
            $('#title').val('');
            $('#error').empty();
        })
        .catch(error => {
            console.error('Error creating todo', error);
        });
    });
  });
});