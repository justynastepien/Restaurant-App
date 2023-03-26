import { Component } from '@angular/core';
import { HttpService } from './http.service';
import { OneDishComponent } from './one-dish/one-dish.component';
import { MenuComponent } from './menu/menu.component';
import { RegisteringComponent } from './registering/registering.component';
import { Router } from '@angular/router';
import { LoggingComponent } from './logging/logging.component';
import { CartComponent } from './cart/cart.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuChangerComponent } from './menu-changer/menu-changer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Restaurant-App';
  objectsList:Dish[] = [];
  loggedUsers:Session[] = [];
  token:String;
  barComponent: MenuBarComponent;

  constructor(private httpService: HttpService, private _router: Router){ 
    this.httpService.getDishes().subscribe(dishes=>{
          this.objectsList = dishes;
        })
    
  }
  
  reloadBar(){
    this._router.navigate(['']);
  }

  navigateToMain() {

    // this._router.navigate(['glowna']);
    // this.reloadBar();
    // this.barComponent.ngOnInit();
    this._router.navigate(['glowna']);
    // window.location.reload();
  }

  navigateToMainLog(token:String) {
    let tok = localStorage.getItem('currentUser');
    this._router.navigate(['glowna/', tok]);

  }

  navigateToCart() {
    this._router.navigate(['cart/', JSON.parse(localStorage.getItem("currentUser")|| '{}').token]);
  }
  // navigate = this.navigateToCart.bind(this);

  // navigate = (token:String)=>{
  //   this._router.navigate(['cart/', token]);
  // }
  // callbackFunction = this.httpService.getDish.bind(this.httpService);

  onOutletLoaded(component: OneDishComponent | MenuComponent|RegisteringComponent|LoggingComponent|CartComponent|MenuBarComponent|LogoutComponent|MenuChangerComponent) {
    if(component instanceof OneDishComponent){
      component.callbackRequest = this.httpService.getDish.bind(this.httpService);
      component.getReviews = this.httpService.getReviews.bind(this.httpService);
      component.getUser = this.httpService.getUser.bind(this.httpService);
      component.sendReview = this.httpService.sendReview.bind(this.httpService);
    }
    if(component instanceof MenuComponent){
      this.httpService.getDishes().subscribe(dishes=>{
        component.objects = dishes;
        component.getUser = this.httpService.getUser.bind(this.httpService);
        component.postOrder = this.httpService.postOrder.bind(this.httpService);
      })
    }
    if(component instanceof RegisteringComponent){
      component.callbackRequest = this.httpService.postUser.bind(this.httpService);
      component.load = this.navigateToMain.bind(this);
    }

    if(component instanceof LoggingComponent){
      component.callbackRequest = this.httpService.loggUser.bind(this.httpService);
      component.loggedUsers = this.loggedUsers;
      component.load = this.navigateToMain.bind(this);
      component.reloadBar = this.reloadBar.bind(this);
      // component.token = this.navigateToMainLog.bind(this);
    }

    if(component instanceof CartComponent){
      component.getOrders = this.httpService.getOrders.bind(this.httpService);
      component.loggedUsers = this.loggedUsers;
      component.removeById = this.httpService.deleteOrder.bind(this.httpService);
      component.refresh = this.navigateToCart.bind(this);
      component.goHistory = this.httpService.historicOrder.bind(this.httpService);
    }

    if(component instanceof MenuBarComponent){
      this.barComponent = component;
      component.loggedUsers = this.loggedUsers;    
    }

    if(component instanceof LogoutComponent){
      component.logout = this.httpService.logout.bind(this.httpService);
      component.load = this.navigateToMain.bind(this);   
    }

    // component.navtoCart = this.navigateToCart.bind(this);
    if(component instanceof MenuChangerComponent){
      this.httpService.getDishes().subscribe(dishes=>{
        component.objects = this.objectsList;
        component.getUser = this.httpService.getUser.bind(this.httpService);
        component.postOrder = this.httpService.postOrder.bind(this.httpService);
        component.remove = this.httpService.removeDish.bind(this.httpService);
        component.postDish = this.httpService.postDish.bind(this.httpService);
      })
    }
    
  } 
  
  
}

export interface Dish {
  id: number;
  name: string;
  type: string;
  category: string;
  ingredients: string[];
  max_number_per_day: number;
  price: number;
  description: string;
  link: string[];
}

export interface User {
  id?: number;
  nick: string;
  email: string;
  password: string;
  dishes?: Dish[];
  isActive?: boolean;
  isAdmin?: boolean;
}

export interface LoginCredentails{
  email: string;
  password: string;
}

export interface Session{
  id: number;
  token: string;
}

export interface Order{
  id?: number;
  user: User;
  dish?: Dish;
  number?: number;
  bought: boolean
}

export interface Review{
  id?: number;
  user: User;
  dish: Dish;
  rating: number;
  content: String
}