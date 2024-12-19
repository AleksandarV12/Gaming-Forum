import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeMsgComponent } from './welcome-msg/welcome-msg.component';
import { RouterModule } from '@angular/router';
import { EmailDirective } from './validators/email.directive';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [WelcomeMsgComponent, EmailDirective, LoaderComponent],
  imports: [CommonModule, RouterModule],
  exports: [WelcomeMsgComponent, EmailDirective, LoaderComponent],
})
export class SharedModule {}
