import { Component, OnInit, Input } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Dish, Order, User } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { Session } from '../app.component';
// import {Observable} from "rxjs/Observable";
// import {HttpClient} from "@angular/common/http";
// import dishes_data from 'dishes_data.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{
  @ViewChild('books') books: ElementRef;
  // ngAfterViewInit(){
  //   this.div.nativeElement.setAttribute('highlight', '');
  // } 
  
  // object = new Dish(1, "Kotlet schabowy", "Danie obiadowe", "Danie mięsne", ["mięso schabowe", "ziemniaki"], 12, 13.20, "Pyszny domowy kotlecik!", "link");
  // objects:Dish[] = [this.object];

  // @Input() 
  objects:Dish[];


  getUser: Function;
  postOrder: Function;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(){
    
  }

  concate(a:string[]){
    let str = "";
    for(let i = 0; i < a.length; i++){
      if(str.length != 0){
        str = str + ", "
      }
      str = str + a[i];
    }
    return str;
  }

  concateTwoStrings(a:string[], b:string[]){
    let str = "";
    str = str + a + b;
    return str
  }

  add_to_cart(id:number){
    let dish_1 = this.objects.filter(dish => dish.id == id);
    // let tok = this.route.snapshot.paramMap.get('token');
    // let user_id = this.loggedUsers.filter(user=> user.token == tok)[0].id;
    localStorage.getItem('currentUser')
    var iden = JSON.parse(localStorage.getItem("currentUser")|| '{}').id;
    
    
    let fun = this.getUser(iden);
    let user_1:User;

    fun.subscribe((res:User)=>{
      user_1 = res;
      const order: Order=({
        id: undefined,
        user: user_1,
        dish: dish_1[0],
        number: 1,
        bought: false
      });
      let fun1 = this.postOrder(order);
      fun1.subscribe((res1:Order)=>{
        console.log(res1);
      })
      
    })
    
    

    
  }
}

  // class Dish {
  //   id: number;
  //   name: string;
  //   type: string;
  //   category: string;
  //   ingredients: string[];
  //   max_number_per_day: number;
  //   price: number;
  //   description: string;
  //   link: string;
  
  //   constructor(id: number, name: string, type: string, category: string, ingredients: string[], max_number_per_day: number, price: number, description: string, link: string){
  //     this.id = id;
  //     this.name = name;
  //     this.type = type;
  //     this.category = category;
  //     this.ingredients = ingredients;
  //     this.max_number_per_day = max_number_per_day;
  //     this.price = price;
  //     this.description = description;
  //     this.link = link;
  //   }
  // }













