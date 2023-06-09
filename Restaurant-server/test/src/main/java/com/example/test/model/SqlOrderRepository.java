package com.example.test.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SqlOrderRepository extends OrderRepository, JpaRepository<Order, Integer> {
}
