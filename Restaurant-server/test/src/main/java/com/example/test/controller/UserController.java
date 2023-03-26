package com.example.test.controller;

import com.example.test.model.User;
import com.example.test.model.responses.SessionResponse;
import com.example.test.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.test.model.responses.LoginCredentials;
import com.example.test.utility.SessionTokenValidator;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class UserController {
    private final SessionTokenValidator sessionTokenValidator;
    private final UserService service;

    public UserController(UserService service, SessionTokenValidator sessionTokenValidator){

        this.service = service;
        this.sessionTokenValidator = sessionTokenValidator;
    }

    @GetMapping("/users/{id}")
    ResponseEntity<?> readUser(@PathVariable int id){
        User user = service.gettingUserById(id);
        if(user != null){
            return ResponseEntity.ok(user);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/users")
    ResponseEntity<?> readUsers(){
        List<User> dishes = service.gettingUsers();
        if(!dishes.isEmpty()){
            return ResponseEntity.ok(dishes);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/users/register")
    ResponseEntity<User> createData(@RequestBody User toCreate){
        User result = service.createUser(toCreate);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @PostMapping("/login")
    public SessionResponse login(@RequestBody final LoginCredentials credentials) {
        return service.login(credentials);
    }

    @DeleteMapping("/logout/{token}")
    public void logout(@PathVariable final String token) {
        sessionTokenValidator.validateUser(token);
        service.logout(token);
    }
}
