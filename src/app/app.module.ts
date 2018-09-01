import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BoardComponent} from './component/board/board.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './module/routing/app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {EnterTokenComponent} from './component/enter-token/enter-token.component';
import {DragulaModule, DragulaService} from 'ng2-dragula';
import {UserCabinetComponent} from './component/user-cabinet/user-cabinet.component';
import {TicketComponent} from './component/ticket/ticket.component';
import {SprintComponent} from './component/sprint/sprint.component';
import {HeaderComponent} from './component/header/header.component';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from './service/login/authentication.service';
import {JwtInterceptor} from './service/login/jwt.interceptor';
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule
} from 'angular-6-social-login';
import {TeamComponent} from './component/team/team.component';
import {SignupComponent} from './component/signup/signup.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('474548896537-cbiv8soh6l7h7fnj812krnms33qvrprg.apps.googleusercontent.com')
  }]);

  return config;
}

const routes: Routes = [
  {path: 'board/:id', component: BoardComponent},
  {path: 'cabinet', component: UserCabinetComponent},
  {path: 'teams/:id', component: TeamComponent},
  {path: 'enterToken', component: EnterTokenComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: UserProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    EnterTokenComponent,
    TicketComponent,
    UserCabinetComponent,
    SprintComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    TeamComponent,
    SignupComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DragulaModule,
    FormsModule,
    SocialLoginModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DragulaService,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
