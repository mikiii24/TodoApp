package com.udemy.todo1.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.udemy.todo1.model.Todo;
import com.udemy.todo1.service.TodoService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {
	
	@Autowired
	private TodoService todoService;
	
	@GetMapping("/todos")
	public List<Todo> findAll(){
		return todoService.findAll();
	}
	
	@GetMapping("/todos/{id}")
	public Todo findById(@PathVariable("id") Long id) {
		return todoService.findById(id);
	}
	
	@PostMapping("/todos")
	// 戻り値をvoidからResponseEntity<Todo>に変更すると、
	// POSTリクエストからJSONオブジェクトが返されることに成功した
	public ResponseEntity<Todo> addTodo(@RequestBody Todo todo) {
		try {
	        todoService.addTodo(todo);
	        return new ResponseEntity<>(todo, HttpStatus.OK);
	    } catch (Exception e) {
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
	
	@DeleteMapping("/todos/{id}")
	public void deleteTodo(@PathVariable("id") Long id) {
		todoService.deleteTodo(id);
	}
	
	@PutMapping("/todos/{id}")
	public void updateTodo(@PathVariable("id") Long id, @RequestBody Todo todo) {
		todoService.updateTodo(id, todo);
	}
	
	@GetMapping("/filtered-todos")
	public List<Todo> getFilteredTodos(
		@RequestParam(name = "status", required = false) boolean status,
		@RequestParam(name = "title", required = false) String title
	){
		return todoService.getTodos(title, status);
	}

}
