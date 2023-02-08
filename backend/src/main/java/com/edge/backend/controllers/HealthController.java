package com.edge.backend.controllers;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/")
    public String ping() {
        return "Hello & Welcome to Car-trader Service !!!";
    }

}
