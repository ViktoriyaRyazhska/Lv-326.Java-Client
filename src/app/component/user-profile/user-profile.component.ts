import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {UserDto} from '../../models/UserDto';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  currentUser: UserDto;

  username: string;

  firstName: string;

  lastName: string;

  email: string;

  isFirstAndLastNameEditable = false;

  isChangePasswordEditable = false;

  passwordNotEquals = false;

  constructor(private userService: UserService,
              private translate: TranslateService) {
    this.userService.getUserByToken().subscribe(user => {
      this.currentUser = user;
      this.username = user.username;
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
    });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    this.userService.changeChosenLanguage(language);
    localStorage.setItem('language', language);
  }

  changeIsFirstAndLastNameEditable() {
    this.isFirstAndLastNameEditable = !(this.isFirstAndLastNameEditable);
  }

  changeIsChangePasswordEditable() {
    this.isChangePasswordEditable = !(this.isChangePasswordEditable);
  }

  changeFirstAndLastName(newFirstName: string, newLastName: string) {
    this.userService.changeFirstAndLastName(newFirstName, newLastName);
    this.firstName = newFirstName;
    this.lastName = newLastName;
    this.changeIsFirstAndLastNameEditable();
  }

  changePassword(currentPass: string, newPass: string, repeatPass: string) {
    if(newPass !== repeatPass) {
      this.passwordNotEquals = true;
      return;
    } else {
      this.userService.changePassword(currentPass, newPass);
      this.changeIsChangePasswordEditable();
    }
  }
}
