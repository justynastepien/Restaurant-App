package com.example.test.model;

import java.util.List;
import java.util.Optional;


public interface UserRepository {
    Optional<User> findById(Integer id);
    User save(User entity);
    List<User> findAll();

    Optional<User> findByEmail(String email);

}
