package com.spring.thread.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@SuppressWarnings("serial")
@Table(name = "threads")
@Entity
public class Thread implements java.io.Serializable {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotNull(message = "Thread title cannot be null")
  @NotEmpty(message = "Thread title cannot be empty")
  @Column(name = "title", nullable = false)
  private String title;

  @NotNull(message = "Thread content cannot be null")
  @NotEmpty(message = "Thread content cannot be empty")
  @Column(name = "content", nullable = false, columnDefinition = "TEXT")
  private String content;

  @Column(name = "author")
  private Long author;

  // For serialization
  public Thread() {}

  public Thread(final String title, final String content, final Long author) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getTitle() {
    return title;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public String getContent() {
    return content;
  }

  public void setAuthor(Long author) {
    this.author = author;
  }

  public Long getAuthor() {
    return author;
  }

  public Long getId() {
    return id;
  }
}
