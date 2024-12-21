import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PostListComponent } from './features/posts/post-list/post-list.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PostDetailsComponent } from './features/posts/post-details/post-details.component';
import { CreatePostComponent } from './features/posts/create-post/create-post.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ThemeListComponent } from './features/themes/theme-list/theme-list.component';
import { ThemeDetailsComponent } from './features/themes/theme-details/theme-details.component';
import { CreateThemeComponent } from './features/themes/create-theme/create-theme.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './features/contact/contact.component';
import { ProfileComponent } from './features/profile/profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'about', component: AboutComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/:id', component: PostDetailsComponent },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  { path: 'themes', component: ThemeListComponent },
  { path: 'themes/:id', component: ThemeDetailsComponent },
  {
    path: 'create-theme',
    component: CreateThemeComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
