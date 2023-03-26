package com.example.test.service;

import com.example.test.model.Dish;
import com.example.test.model.DishRepository;
import com.example.test.model.Review;
import com.example.test.model.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DishService {
    private final DishRepository repository;
    private final ReviewRepository reviewRepository;

    public DishService(DishRepository repository, ReviewRepository reviewRepository){
        this.repository = repository;
        this.reviewRepository = reviewRepository;
    }

    public Dish gettingDataById(int id){

            if(repository.findById(id).isPresent()){
                return repository.findById(id).get();
            }
            return null;
    }

    public List<Dish> gettingData(){
        return repository.findAll();
    }

    public Dish createData(Dish toCreate){
        Dish result = repository.save(toCreate);
        return result;
    }

    public void removeDish(int id){
        repository.deleteById(id);
    }

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getReviews(int id) {
        return reviewRepository.findAllByDishId(id);
    }
}
