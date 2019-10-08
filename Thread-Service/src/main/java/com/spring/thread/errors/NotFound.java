package com.spring.thread.errors;

@SuppressWarnings("serial")
public class NotFound extends RuntimeException {
  public NotFound(String message) {
    super(message);
  }
}
