package com.spring.thread.clients;

import com.spring.thread.clients.mappings.User;
import com.spring.thread.responses.ResponseWithData;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "auth-service")
public interface AuthClient {
  @GetMapping("/api/v1/auth/authenticate")
  public ResponseWithData<User> authenticate(@RequestHeader(value = "Authorization") String auth);
}
