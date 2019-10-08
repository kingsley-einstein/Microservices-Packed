package com.spring.thread.errors.handlers;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import feign.Response;
import feign.codec.ErrorDecoder;

@Component
public class FeignErrorHandler implements ErrorDecoder {
  @Override
  public Exception decode(String methodKey, Response response) {
    switch(response.status()) {
      case 401:
        return new ResponseStatusException(HttpStatus.UNAUTHORIZED, response.body().toString());
      case 500:
        return new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, response.body().toString());
      default:
        return new ResponseStatusException(HttpStatus.valueOf(response.status()));
    }
  }
}
