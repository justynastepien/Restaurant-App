import { Component, ElementRef, ViewChild } from '@angular/core';
import { Dish } from '../app.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-menu-changer',
  templateUrl: './menu-changer.component.html',
  styleUrls: ['./menu-changer.component.css']
})
export class MenuChangerComponent {
  @ViewChild('books') books: ElementRef;
  @ViewChild('name1') name:ElementRef;
  @ViewChild('type') type:ElementRef;
  @ViewChild('category') category:ElementRef; 
  @ViewChild('ingredients') ingredients:ElementRef;
  @ViewChild('max_number') max_number:ElementRef;
  @ViewChild('price') price:ElementRef;
  @ViewChild('description') description:ElementRef;
  @ViewChild('link') link:ElementRef;
  objects:Dish[];


  getUser: Function;
  postOrder: Function;
  remove: Function;
  postDish: Function;

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

  removeDish(id:number){
    this.objects = this.objects.filter(dish => dish.id != id);
    let fun = this.remove(id);
    fun.subscribe(()=>{});    
  }

  addDish(){
    const dish: Dish=({
      id: 0,
      name: this.name.nativeElement.value,
      type: this.type.nativeElement.value,
      category: this.category.nativeElement.value,
      ingredients: [this.ingredients.nativeElement.value],
      max_number_per_day: this.max_number.nativeElement.value,
      price: this.price.nativeElement.value,
      description: this.description.nativeElement.value,
      link: [this.link.nativeElement.value]
    });

    let fun = this.postDish(dish);
    fun.subscribe((res:Dish)=>{
      console.log(res);
    })

  }

}
