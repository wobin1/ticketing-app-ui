import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { EventDetailPageComponent } from './pages/event-detail-page/event-detail-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { ConfirmationPageComponent } from './pages/confirmation-page/confirmation-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { CheckinPageComponent } from './pages/checkin-page/checkin-page.component';
import { AdminDashboardPageComponent } from './pages/admin-dashboard-page/admin-dashboard-page.component';
import { EventCreatePageComponent } from './pages/event-create-page/event-create-page.component';
import { EventEditPageComponent } from './pages/event-edit-page/event-edit-page.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'events/:id', component: EventDetailPageComponent },
      { path: 'checkout', component: CheckoutPageComponent },
      { path: 'confirmation', component: ConfirmationPageComponent },
      {
        path: 'dashboard',
        component: DashboardPageComponent,
        canActivate: [AuthGuard]
      },
      { path: 'check-in', component: CheckinPageComponent },
      {
        path: 'admin',
        component: AdminDashboardPageComponent,
        // canActivate: [AdminGuard]
      },
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'signup',
        component: SignupPageComponent,
      },
      {
        path: 'admin/events/new',
        component: EventCreatePageComponent,
        // canActivate: [AdminGuard]
      },
        {
          path: 'admin/events/edit/:id',
          component: EventEditPageComponent,
          // canActivate: [AdminGuard]
        }
      ]
    }
  ];
