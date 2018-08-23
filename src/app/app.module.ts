import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './component/board/board.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './module/routing/app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import { EnterTokenComponent } from './component/enter-token/enter-token.component';
import {DragulaModule, DragulaService} from 'ng2-dragula';
import { TicketComponent } from './component/ticket/ticket.component';
import {SprintComponent} from './component/sprint/sprint.component';
import { HeaderComponent } from './header/header.component';
// import { CloudinaryModule } from '@cloudinary/angular-5.x';
// import * as  Cloudinary from 'cloudinary-core';

const routes: Routes = [
  { path: 'board/:id', component: BoardComponent},
  { path: 'enterToken', component: EnterTokenComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    EnterTokenComponent,
    TicketComponent,
    SprintComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DragulaModule,
    // CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'djx1z46bi'}),
    RouterModule.forRoot(routes)
  ],
  providers: [DragulaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
