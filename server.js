// node.jsを使用してバックエンドを作成した場合

var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');



// var cors = require('cors');
var { Sequelize, DataTypes} = require('sequelize');

var sequelize = new Sequelize('itemdb3', 'root', 'pass', {
  host: 'localhost',
  dialect: 'mysql'
});

var Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
   tableName: 'm_todo',
   timestamps: false
});

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    return Todo.findAll();
  })
  .then(todos => {
    console.log('Fetched todos:', todos);
  })
  .catch((err) => {
    console.log('error: ', err);
  });

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var port = 3000;

app.listen(port, () =>console.log('server on ' + port));

app.post('/todos', async function(req, res) {

  try {
    var todo = new Todo(req.body);

    const saveTodo = await todo.save();

    res.send(saveTodo);
  } catch (error) {
    console.log('Error saving todo: ', error);
    res.status(500).send('Internal Server Error');
  }
});

// すべての Todo を取得
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/todos/:id', async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    await todo.destroy();
    res.json({ id: todoId });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/todos/:id', async (req, res) => {
  console.log('Received an PUT id: ' + req.params.id);
  // 変更１ リクエストのボディからTodoの情報を取得
  var todo = new Todo(req.body);
  const todoId = todo.id;
  
  try {
    const todo = await Todo.findByPk(todoId);

    if(!todo) {
      res.status(404).json({ error: 'Todo not found'});
      return;
    }

    const { title, status } = req.body;

    // 変更２ where句でリクエストボディからidを取得
    var updatedTodo = await todo.update (
      {
        title: title || todo.title,
        status: status !== undefined ? status : todo.status,
      },
      {
        where: {
          id: todoId,
        },
        returning: true,
      }
    );
    res.send(updatedTodo);
    // res.json({ id: todoId });
  } catch (error) {
    console.log('ERROR updating todo: ', error);
    res.status(500).send('Internal Server Error');
  }
});