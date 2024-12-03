import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  onLogin() {
    console.log('Login button clicked');
  }

  onRegister() {
    console.log('Register button clicked');
  }
}
