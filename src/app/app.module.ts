import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './component/board/board.component';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './module/routing/app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import { ListComponent } from './component/list/list.component';
import { EnterTokenComponent } from './component/enter-token/enter-token.component';

const routes: Routes = [
  { path: 'board/:id', component: BoardComponent},
  { path: 'enterToken', component: EnterTokenComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ListComponent,
    EnterTokenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
