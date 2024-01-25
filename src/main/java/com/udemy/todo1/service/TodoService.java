package com.udemy.todo1.service;


import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.udemy.todo1.model.Todo;
import com.udemy.todo1.repository.TodoRepository;

@Service
public class TodoService {
	
	private final TodoRepository todoRepository;
	
	@Autowired
	public TodoService(TodoRepository todoRepository) {
		this.todoRepository = todoRepository;
	}
	
	public List<Todo> findAll(){
		List<Todo> allTodos = new ArrayList<>();
		todoRepository.findAll().forEach(allTodos::add);
		return allTodos;
	}
	
	public Todo findById(Long id) {
		return todoRepository.findById(id);
	}
	
	public void addTodo(Todo todo) {
		todoRepository.addTodo(todo);
	}
	
	public void deleteTodo(Long id) {
		todoRepository.deleteTodo(id);
	}
	
	public void updateTodo(Long id, Todo todo) {
		if (todo.getId() != null) {
			todoRepository.updateTodo(todo);
		}
	}
	
	public List<Todo> getTodos(String title, boolean status){
		List<Todo> allTodos = findAll();
		if (status) {
	        allTodos = allTodos.stream()
	                .filter(todo -> todo.getStatus()) // Completed tasks
	                .collect(Collectors.toList());
	    } else {
	        allTodos = allTodos.stream()
	                .filter(todo -> !todo.getStatus()) // Incomplete tasks
	                .collect(Collectors.toList());
	    }
		return allTodos;
//		if(status != false ) {
//			allTodos = allTodos.stream()
//					.filter(todo -> todo.getTodoStatus().equalsIgnoreCase(status))
//					.collect(Collectors.toList());
//		}
//		
//		if(title != null && !title.isEmpty()) {
//			allTodos = allTodos.stream()
//					.filter(todo -> todo.getTodoTitle().equalsIgnoreCase(title))
//					.collect(Collectors.toList());
//		}
//		
//		return allTodos;
		
	}

}
