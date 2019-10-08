package com.spring.thread.responses;

import com.fasterxml.jackson.annotation.JsonProperty;

@SuppressWarnings("serial")
public class ResponseWithError<T> implements java.io.Serializable {
  @JsonProperty("status")
  private Long status;

  @JsonProperty("error")
  private T error;

  public ResponseWithError() {}

  public ResponseWithError(Long status, T error) {
    this.status = status;
    this.error = error;
  }

  public Long getStatus() {
    return status;
  }

  public T getError() {
    return error;
  }
}
