import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user/user.service';
import {UserDto} from '../../models/UserDto';

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

  constructor(private userService: UserService) {
    this.userService.getUserByToken().subscribe(user => {
      this.currentUser = user;
      this.username = user.username;
      this.firstName = user.firstname;
      this.lastName = user.lastname;
      this.email = user.email;
    });
  }

}
