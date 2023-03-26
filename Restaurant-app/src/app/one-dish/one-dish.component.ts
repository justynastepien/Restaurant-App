import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dish, Review, User } from '../app.component';
import { Observable } from 'rxjs';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-one-dish',
  templateUrl: './one-dish.component.html',
  styleUrls: ['./one-dish.component.css']
})
export class OneDishComponent {
  public id: string;
  constructor(private route: ActivatedRoute) {}
  dish:Dish
  @ViewChild('rating') rating:ElementRef;
  @ViewChild('content') content:ElementRef;

  getReviews: Function;
  reviews: Review[];
  getUser: Function;
  sendReview: Function;
  forUser: boolean = false;

  // @Input() callbackRequest:any;;
  public callbackRequest: any;;
  locked: boolean;

  ngOnInit(){
    let i = this.route.snapshot.paramMap.get('id');
    console.log(i)
    // this.callbackRequest.subscribe((res:Dish)=>{
    //   console.log(res);
    // })
    if(JSON.parse(localStorage.getItem('currentUser') || '{}').token != null){
      this.forUser = true;
    }
    else{
      this.forUser = false;
    }

    let fun = this.callbackRequest(1)
    fun.subscribe((res:Dish)=>{
        console.log(res);
        this.dish = res;
    })

    let fun1 = this.getReviews(i);
    fun1.subscribe((res:Review[])=>{
      this.reviews = res;
    })

    if(JSON.parse(localStorage.getItem("currentUser")|| '{}').id != '{}'){
      this.locked = true;
    }

  }
  
  addReview(){
    let rat = this.rating.nativeElement.value;
    let con = this.content.nativeElement.value;
    let user_id = JSON.parse(localStorage.getItem("currentUser")|| '{}').id;
    let fun = this.getUser(user_id);
    let user_1:User;

    fun.subscribe((res:User)=>{
      user_1 = res;
      const rev: Review=({
        user: user_1,
        dish: this.dish,
        rating: rat,
        content: con
      });
      console.log(rev);
      let fun1 = this.sendReview(rev);
      fun1.subscribe((res1:Review)=>{
        console.log(res1);
        this.reviews.push(res1);
      })
      
    })

    this.rating.nativeElement.value = '';
    this.content.nativeElement.value = '';
  }

}
