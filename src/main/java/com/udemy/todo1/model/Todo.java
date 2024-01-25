package com.udemy.todo1.model;

public class Todo {
	
	private Long id;
	private String title;
	private boolean status;

	public Todo() {
	}

	public Todo(String title, boolean status) {
		this.title = title;
		this.status = status;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
}
