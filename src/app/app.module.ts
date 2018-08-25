import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BoardComponent} from './component/board/board.component';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './module/routing/app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {EnterTokenComponent} from './component/enter-token/enter-token.component';
import {DragulaModule, DragulaService} from 'ng2-dragula';
import {TicketComponent} from './component/ticket/ticket.component';
import {SprintComponent} from './component/sprint/sprint.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "./service/login/authentication.service";
// import { CloudinaryModule } from '@cloudinary/angular-5.x';
// import * as  Cloudinary from 'cloudinary-core';

const routes: Routes = [
  {path: 'board/:id', component: BoardComponent},
  {path: 'enterToken', component: EnterTokenComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    EnterTokenComponent,
    TicketComponent,
    SprintComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DragulaModule,
    FormsModule,
    // CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'djx1z46bi'}),
    RouterModule.forRoot(routes)
  ],
  providers: [DragulaService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
