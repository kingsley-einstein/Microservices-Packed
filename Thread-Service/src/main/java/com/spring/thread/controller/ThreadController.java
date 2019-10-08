package com.spring.thread.controller;

import java.util.List;

import com.spring.thread.clients.AuthClient;
import com.spring.thread.clients.mappings.User;
import com.spring.thread.errors.ClientError;
import com.spring.thread.errors.NotFound;
import com.spring.thread.model.Thread;
import com.spring.thread.repository.ThreadRepository;
import com.spring.thread.responses.ResponseWithData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import feign.FeignException;

@RequestMapping("/api/v1")
@RestController
public class ThreadController {
  @Autowired
  private ThreadRepository repository;

  @Autowired
  private AuthClient client;

  @PostMapping("/thread")
  @ResponseBody
  public ResponseEntity<ResponseWithData<Thread>> createThread(@RequestHeader("Authorization") String auth, @RequestBody Thread thread) {
    try {
      ResponseWithData<User> response = client.authenticate(auth);
      thread.setAuthor(response.getData().getId());
      Thread newThread = repository.save(thread);
      ResponseWithData<Thread> mainResponse = new ResponseWithData<>((long) 201, newThread);
      return new ResponseEntity<>(mainResponse, HttpStatus.CREATED);
    } catch (FeignException exception) {
      throw new ClientError(exception.getMessage(), exception.status());
    } catch (Exception exception) {
      throw new ClientError(String.format("{%s: %d, %s: %s}", "status", 500, "error", exception.getMessage()), 500);
    }
  }

  @GetMapping("/threads/mine")
  @ResponseBody
  public ResponseWithData<List<Thread>> getThreads(@RequestHeader("Authorization") String auth) {
    try {
      ResponseWithData<User> user = client.authenticate(auth);
      List<Thread> threads = repository.findByAuthor(user.getData().getId());
      if (threads.size() == 0 || threads == null) {
        throw new NotFound("No record");
      }
      return new ResponseWithData<>((long) 200, threads);
    } catch (NotFound exception) {
      throw new NotFound(exception.getMessage());
    } catch (Exception exception) {
      throw new ClientError(String.format("{%s: %d, %s: %s}", "status", 500, "error", exception.getMessage()), 500);
    }
  }
}
