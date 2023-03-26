import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, Session } from '../app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  getOrders: Function;
  loggedUsers: Session[];
  orders: Order[] = [];
  removeById: Function;
  refresh: Function;
  goHistory: Function;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    
    let user_id = JSON.parse(localStorage.getItem("currentUser")|| '{}').id;
    let fun = this.getOrders(user_id);
    fun.subscribe((res:Order[])=>{
        let res1 = res.filter(item => item.bought != true);
        this.orders = res1;
    })
  }

  buy(){
    this.orders.forEach(order=>{
      order.bought = true;
      let fun = this.goHistory(order.id, order);
      fun.subscribe();
    })

    this.orders = this.orders.filter(item => item.bought != true);
    
  }

  remove(id: number | undefined){
    let fun = this.removeById(id);
    fun.subscribe((res:any)=>{
    });
    
    this.orders = this.orders.filter(item => item.id != id);
    
  }
}
