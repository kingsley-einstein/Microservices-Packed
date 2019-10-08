package com.spring.thread.repository;

import java.util.List;

import com.spring.thread.model.Thread;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, Long> {
  public List<Thread> findByAuthor(Long author);
}
