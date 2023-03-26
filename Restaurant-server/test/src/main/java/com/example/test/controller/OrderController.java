package com.example.test.controller;

import com.example.test.model.Order;
import com.example.test.model.User;
import com.example.test.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@AllArgsConstructor
public class OrderController {

    OrderService service;

    @GetMapping("/orders/{id}")
    ResponseEntity<?> readOrders(@PathVariable int id){
        List<Order> order = service.gettingOrdersByUserId(id);
        if(order != null){
            return ResponseEntity.ok(order);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/orders")
    ResponseEntity<Order> createOrders(@RequestBody Order toCreate){
        Order result = service.createOrder(toCreate);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/orders/{id}")
    void deleteOrder(@PathVariable int id){
        service.deleteOrder(id);
    }

    @PutMapping("/orders/{id}")
    ResponseEntity<Order> historyOrders(@PathVariable int id, @RequestBody Order toCreate){
        Order result = service.historyOrders(id);
        return ResponseEntity.ok(result);
    }
}
