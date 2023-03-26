import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { LoginCredentails } from '../app.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Session } from '../app.component';

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent {
  @ViewChild('mail') mail:ElementRef;
  @ViewChild('pass') pass:ElementRef;

  callbackRequest: Function;
  load: Function;
  loggedUsers:Session[];
  reloadBar:Function;

  signin(){
    let email = this.mail.nativeElement.value;
    let password = this.pass.nativeElement.value;
    const lc: LoginCredentails=({
      email: this.mail.nativeElement.value,
      password: this.pass.nativeElement.value
    });
    let fun = this.callbackRequest(lc);
    fun.subscribe((res:Session)=>{
      this.loggedUsers.push(res);
      if(password != "admin"){
        localStorage.setItem('currentUser', JSON.stringify({id: res.id, token: res.token}));
      }
      else{
        localStorage.setItem('currentUser', JSON.stringify({id: res.id, token: res.token, admin: true}));
      }
      
      // window.location.reload();
      this.load();
      // window.location.reload();
      // this.reloadBar();
      
  },(err:HttpErrorResponse)=>{
    alert(err.error.message)});
  }
}
