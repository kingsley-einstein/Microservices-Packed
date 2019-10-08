package com.spring.thread.errors;

@SuppressWarnings("serial")
public class ClientError extends RuntimeException {
  private int code;

  public ClientError(String message, int code) {
    super(message);
    this.code = code;
  }

  public int getCode() {
    return code;
  }
}
