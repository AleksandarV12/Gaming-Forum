import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // For ngModel
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './features/posts/post-list/post-list.component';
import { PostDetailsComponent } from './features/posts/post-details/post-details.component';
import { CreatePostComponent } from './features/posts/create-post/create-post.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ThemeListComponent } from './features/themes/theme-list/theme-list.component';
import { ThemeDetailsComponent } from './features/themes/theme-details/theme-details.component';
import { CreateThemeComponent } from './features/themes/create-theme/create-theme.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { ProfileComponent } from './features/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    PostListComponent,
    PostDetailsComponent,
    CreatePostComponent,
    DashboardComponent,
    ThemeListComponent,
    ThemeDetailsComponent,
    CreateThemeComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
