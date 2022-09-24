import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RouteguardService as RouteGuard } from '../app/services/routeGaurd/routeguard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    //canActivate: [RouteGuard] //checks if the user is authenticated, if not the user will be redirected to login
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'progress',
    loadChildren: () => import('./progress/progress.module').then( m => m.ProgressPageModule),
    //canActivate: [RouteGuard]
  },
  {
    path: 'upload',
    loadChildren: () => import('./upload/upload.module').then( m => m.UploadPageModule),
    //canActivate: [RouteGuard]
  },
  {
    path: 'forgot-password-email',
    loadChildren: () => import('./forgot-password-email/forgot-password-email.module').then( m => m.ForgotPasswordEmailPageModule)
  },
  {
    path: 'forgot-password-password',
    loadChildren: () => import('./forgot-password-password/forgot-password-password.module').then( m => m.ForgotPasswordPasswordPageModule)
  },

  {
    path: 'models',
    loadChildren: () => import('./models/models.module').then( m => m.ModelsPageModule),
    //canActivate: [RouteGuard]
  },
   {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    //canActivate: [RouteGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
