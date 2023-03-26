import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './http.service';
import { OneDishComponent } from './one-dish/one-dish.component';
import { CartComponent } from './cart/cart.component';
import { RegisteringComponent } from './registering/registering.component';
import { LoggingComponent } from './logging/logging.component';
import { LogoutComponent } from './logout/logout.component';
import { MenuChangerComponent } from './menu-changer/menu-changer.component';
// import * as dishes_data from 'dishes_data.json'

const appRoutes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: 'glowna', component: MenuComponent},
      { path: 'glowna/dish/:id', component: OneDishComponent},
      { path: 'cart/:token', component: CartComponent},
      { path: 'registering', component: RegisteringComponent},
      { path: 'logging', component: LoggingComponent},
      { path: 'loggout/:token', component: LogoutComponent},
      { path: 'menu-changer', component: MenuChangerComponent}
    ]
  },
  { path: '', component: MenuBarComponent, outlet:'secondary'}
]


@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    MenuComponent,
    OneDishComponent,
    CartComponent,
    RegisteringComponent,
    LoggingComponent,
    LogoutComponent,
    MenuChangerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [HttpService],
  bootstrap: [AppComponent, MenuBarComponent]
})


  // { path: 'testy', component: MenuBarComponent},
  // { path: '', redirectTo: '/testy', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }]

export class AppModule { }
export const routingComponents = [MenuBarComponent, MenuComponent]
