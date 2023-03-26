package com.example.test.model;

import java.util.List;
import java.util.Optional;

public interface DishRepository {

    Optional<Dish> findById(Integer id);
    Dish save(Dish entity);
    List<Dish> findAll();
    void deleteById(int id);
}
