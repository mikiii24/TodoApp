package com.udemy.todo1.exception;

public class TodoNotFoundException extends RuntimeException{
	private static final long serialVersionUID = 1L;
	
	public TodoNotFoundException(Long id) {
		super ("タスク：" + id + "は見つかりません");
	}

}
