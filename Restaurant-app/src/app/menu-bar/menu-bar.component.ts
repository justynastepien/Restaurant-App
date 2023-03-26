import { Component, Input } from '@angular/core';
import { Session } from '../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  loggedUsers: Session[];
  token: String = '';
  locked:boolean = false;
  storage: any = localStorage.getItem("currentUser");
  forAdmin: boolean = false;
  forUser: boolean = false;

  someSubscription: any;

  constructor(private route: ActivatedRoute) { 
    
    
  }

  ngOnInit(){
    if(this.storage != null){
      this.locked = true;
    }
    else{
      this.locked = false;
    }
    this.token = this.token + JSON.parse(localStorage.getItem('currentUser') || '{}').token;
    console.log(this.locked)

    console.log(this.storage);

    if(JSON.parse(localStorage.getItem('currentUser') || '{}').admin != null){
      this.forAdmin = true;
    }
    else{
      this.forAdmin = false;
    }

    if(JSON.parse(localStorage.getItem('currentUser') || '{}').token != null){
      this.forUser = true;
    }
    else{
      this.forUser = false;
    }
  }


  logout(){
    this.locked = false;
    this.storage = null;
    this.token = this.token + JSON.parse(localStorage.getItem('currentUser') || '{}').token;
    localStorage.clear();
    this.ngOnInit();
  }


  
}
