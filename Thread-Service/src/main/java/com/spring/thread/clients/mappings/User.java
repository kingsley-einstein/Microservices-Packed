package com.spring.thread.clients.mappings;

@SuppressWarnings("serial")
public class User implements java.io.Serializable {
  private Long id;

  private String username;

  public User() {}

  public User(Long id, String username) {
    this.id = id;
    this.username = username;
  }

  public Long getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }
}
