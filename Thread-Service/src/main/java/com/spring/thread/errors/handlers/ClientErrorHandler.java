package com.spring.thread.errors.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.spring.thread.errors.ClientError;
import com.spring.thread.responses.ResponseWithError;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@SuppressWarnings("unchecked")
@ControllerAdvice
public class ClientErrorHandler {
  @ExceptionHandler(ClientError.class)
  public ResponseEntity<Object> exception(ClientError error) throws Exception {
    ObjectMapper mapper = new ObjectMapper();
    ResponseWithError<Object> response = mapper.readValue(error.getMessage(), ResponseWithError.class);
    return new ResponseEntity<>(response, HttpStatus.valueOf(error.getCode()));
  }
}
