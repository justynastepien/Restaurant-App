import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Dish, Order, Review } from "./app.component";
import { User } from "./app.component";
import { LoginCredentails } from "./app.component";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class HttpService{
    constructor(private http: HttpClient){

    }

    public getDishes():Observable<Array<Dish>>{
 
        return this.http.get<Array<Dish>>("http://localhost:8080/dish");
    }

    // public getDish(userId: number): Observable<Dish>{
    //     // const param = new HttpParams().set('userId', userId);
    //     return this.http.get<Dish>("http://localhost:8080/dish" + userId);
    // }
    public getDish = (userId: number) => {
        return this.http.get("http://localhost:8080/dish/" + userId);
      }

    public postDish(dish: Dish):Observable<Dish>{
        return this.http.post<Dish>("http://localhost:8080/dish", dish);
    }

    public getUser(id: number):Observable<User>{
        return this.http.get<User>("http://localhost:8080/users/"+ id);
    }
    public postUser(user:User):Observable<User>{
        return this.http.post<User>("http://localhost:8080/users/register", user);
    }

    public loggUser(logcred:LoginCredentails):Observable<String>{
        return this.http.post<String>("http://localhost:8080/login", logcred);
        
    }

    public postOrder(order:Order):Observable<Order>{
        return this.http.post<Order>("http://localhost:8080/orders", order);
    }

    public getOrders(id: number):Observable<Array<Order>>{
        return this.http.get<Array<Order>>("http://localhost:8080/orders/" + id);
    }

    public deleteOrder(id: number){
        return this.http.delete("http://localhost:8080/orders/" + id);
    }

    public historicOrder(id: number, order: Order):Observable<Order>{
        return this.http.put<Order>("http://localhost:8080/orders/" + id, order);
    }

    public getReviews(id: number):Observable<Array<Review>>{
        return this.http.get<Array<Review>>("http://localhost:8080/dish/" + id + "/review");
    }

    public sendReview(review: Review):Observable<Review>{
        return this.http.post<Review>("http://localhost:8080/dish/review", review);
    }

    public logout(token:String){
        return this.http.delete("http://localhost:8080/logout/" + token);
    }

    public removeDish(id: number){
        return this.http.delete("http://localhost:8080/dish/" + id);
    }

    
   
}