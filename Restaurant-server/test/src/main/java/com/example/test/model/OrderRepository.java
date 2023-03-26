package com.example.test.model;

import java.util.List;
import java.util.Optional;

public interface OrderRepository {
    Optional<Order> findById(Integer id);
    Order save(Order entity);
    List<Order> findAll();
    void deleteById(int id);

    List<Order> findAllByUserId(Integer id);

}
