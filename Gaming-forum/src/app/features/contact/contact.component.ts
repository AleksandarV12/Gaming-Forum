// src/app/features/contact/contact.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  successMessage: string = '';
  emailValid: boolean = true;

  onSubmit() {
    this.successMessage = '';

    this.emailValid = this.validateEmail(this.email);

    if (this.name && this.emailValid && this.message) {
      this.successMessage = 'Your message has been sent successfully!';

      this.name = '';
      this.email = '';
      this.message = '';
    } else {
      if (!this.name) {
        alert('Please enter your name.');
      }
      if (!this.emailValid) {
        alert('Please enter a valid email address.');
      }
      if (!this.message) {
        alert('Please enter your message.');
      }
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
