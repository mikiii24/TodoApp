package com.udemy.todo1.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.udemy.todo1.mapper.TodoMapper;
import com.udemy.todo1.model.Todo;

@Repository
public class TodoRepository {
	private final TodoMapper todoMapper;
	
	@Autowired
	public TodoRepository(TodoMapper todoMapper) {
	  this.todoMapper = todoMapper;
	}
	
	public List<Todo> findAll(){
		return todoMapper.findAll();
	}
	
	public Todo findById(Long id) {
		return todoMapper.findById(id);
	}
	
	public void addTodo(Todo todo) {
		todoMapper.addTodo(todo);
	}
	
	public void updateTodo(Todo todo) {
		todoMapper.updateTodo(todo);
	}
	
	public void deleteTodo(Long id) {
		todoMapper.deleteTodo(id);
	}
}