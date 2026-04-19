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
  errorMessage: string = '';

  onSubmit() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.name) {
      this.errorMessage = 'Please enter your name.';
      return;
    }

    if (!this.email || !this.validateEmail(this.email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (!this.message) {
      this.errorMessage = 'Please enter your message.';
      return;
    }

    this.successMessage = 'Your message has been sent successfully!';
    this.name = '';
    this.email = '';
    this.message = '';
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}