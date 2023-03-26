package com.example.test.controller;

import com.example.test.model.Dish;
import com.example.test.model.Review;
import com.example.test.service.DishService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
public class DishController {
    private final DishService service;

    public DishController(DishService service){
        this.service = service;
    }

    @GetMapping("/dish/{id}")
    ResponseEntity<?> readDish(@PathVariable int id){
        Dish dish = service.gettingDataById(id);
        if(dish != null){
            return ResponseEntity.ok(dish);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/dish")
    ResponseEntity<?> readDishes(){
        List<Dish> dishes = service.gettingData();
        if(!dishes.isEmpty()){
            return ResponseEntity.ok(dishes);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping("/dish")
    ResponseEntity<Dish> createData(@RequestBody Dish toCreate){
        Dish result = service.createData(toCreate);
        return ResponseEntity.created(URI.create("/" + result.getId())).body(result);
    }

    @DeleteMapping("dish/{id}")
    public void removeDish(@PathVariable int id){
        service.removeDish(id);
    }

    @PostMapping("/dish/review")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        return ResponseEntity.ok(service.createReview(review));
    }

    @GetMapping("dish/{id}/review")
    public ResponseEntity<List<Review>> getReviews(@PathVariable int id) {
        return ResponseEntity.ok(service.getReviews(id));
    }
}
