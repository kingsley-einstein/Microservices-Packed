package com.spring.thread.responses;

import com.fasterxml.jackson.annotation.JsonProperty;

@SuppressWarnings("serial")
public class ResponseWithData<T> implements java.io.Serializable {
  @JsonProperty("status")
  private Long status;
  
  @JsonProperty("data")
  private T data;

  public ResponseWithData() {}

  public ResponseWithData(Long status, T data) {
    this.status = status;
    this.data = data;
  }

  public Long getStatus() {
    return status;
  }

  public T getData() {
    return data;
  }
}