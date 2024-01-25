package com.udemy.todo1.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.udemy.todo1.model.Todo;

@Mapper
public interface TodoMapper {
	
	List<Todo> findAll();
	
	Todo findById(Long id);
	
	void addTodo(Todo todo);
	
	void updateTodo(Todo todo);
	 
	void deleteTodo(Long id);

}
