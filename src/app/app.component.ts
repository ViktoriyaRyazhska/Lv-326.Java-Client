import {Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    const language = localStorage.getItem('language');
    if (language) {
      translate.setDefaultLang(language);
    } else {
      translate.setDefaultLang('en');
    }
  }

  closeForm() {
    document.getElementById('myForm').style.display = 'none';
    document.getElementById('closeForm').style.display = 'none';
  }
}
