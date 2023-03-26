import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  logout:Function;
  load:Function;
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    let token = this.route.snapshot.paramMap.get('token');
    console.log(token);
    let fun = this.logout(token);
    fun.subscribe(()=>{
      // localStorage.clear();
      this.load();
      // window.location.reload();
    });


  }
}
