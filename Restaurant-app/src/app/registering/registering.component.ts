import { Component } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { User } from '../app.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registering',
  templateUrl: './registering.component.html',
  styleUrls: ['./registering.component.css']
})
export class RegisteringComponent {
  @ViewChild('name') name:ElementRef;
  @ViewChild('mail') mail:ElementRef;
  @ViewChild('pass') pass:ElementRef;

  callbackRequest:Function;
  load:Function;

  private router: ActivatedRoute;

    constructor(r: ActivatedRoute) {
        this.router = r;
    }



  validate(name:string, mail:string){
    const expression: RegExp = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    let test = expression.test(mail);
    return test;
  }

  register(){

    let test = this.validate(this.name.nativeElement.value, this.mail.nativeElement.value)
    console.log(test);
    if(test == true){
      const us: User=({
        nick: this.name.nativeElement.value,
        email: this.mail.nativeElement.value,
        password: this.pass.nativeElement.value
      });

      let fun = this.callbackRequest(us);
      fun.subscribe((res:User)=>{
          console.log(res);
      })
      this.name.nativeElement.value = "";
      this.mail.nativeElement.value = "";
      this.pass.nativeElement.value = "";

      alert("Zarejestrowano poprawnie!");
      this.load();
      
    }
    else{
      alert("Walidacja niepoprawna!");
    }
  }
}
