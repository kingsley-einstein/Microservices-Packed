package com.spring.thread.errors.handlers;

import com.spring.thread.errors.NotFound;
import com.spring.thread.responses.ResponseWithError;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class NotFoundHandler {
  @ExceptionHandler(NotFound.class)
  public ResponseEntity<Object> exception(NotFound error) {
    return new ResponseEntity<>(new ResponseWithError<String>((long) 404, error.getMessage()), HttpStatus.NOT_FOUND);
  }
}
