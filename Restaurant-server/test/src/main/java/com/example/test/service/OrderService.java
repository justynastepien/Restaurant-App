package com.example.test.service;

import com.example.test.model.Order;
import com.example.test.model.OrderRepository;
import com.example.test.model.User;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class OrderService {

    OrderRepository repository;

    public List<Order> gettingOrdersByUserId(int id){
            return repository.findAllByUserId(id);
    }


    public Order createOrder(Order newOrder){
        var orders = gettingOrdersByUserId(newOrder.getUser().getId())
                .stream()
                .filter(order -> order.getDish().getId() == newOrder.getDish().getId() && !order.isBought())
                .collect(Collectors.toList());

        if(orders.isEmpty()){
            Order result = repository.save(newOrder);
            return result;
        }
        else{
            var o = repository.findById(orders.get(0).getId()).get();
            o.setNumber(o.getNumber()+1);
//            int number = orders.get(0).getNumber();
//            var order = orders.get(0);
//            order.setNumber(number+1);
            return repository.save(o);
        }
    }

    public void deleteOrder(int id){
        repository.deleteById(id);
    }

    public Order historyOrders(int id){
        Order o = repository.findById(id).get();
        o.setBought(true);
        return repository.save(o);
    }
}
