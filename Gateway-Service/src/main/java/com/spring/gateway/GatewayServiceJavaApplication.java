package com.spring.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableZuulProxy
@EnableEurekaClient
@SpringBootApplication
public class GatewayServiceJavaApplication {
	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceJavaApplication.class, args);
	}
}
