import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { LoadEmpleados } from './load-empleados/load-empleados';
import { LoadEstatus } from './load-estatus/load-estatus';
import { Empleados } from './empleados/empleados';
import { EstatusComponent } from './estatus/estatus';
import { Profile } from './profile/profile';
import { DashboardComponent } from './dashboard/dashboard'; // 🔥 FALTABA
import { authGuard } from './guards/auth-guard';
import { Register } from './register/register';
import { Unidades } from './unidades/unidades'; // 👈 Importa tu componente de unidades
import { MadresComponent } from './madre/madre'; 
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: Register },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'empleados', component: Empleados },
      { path: 'madre', component: MadresComponent },
      { path: 'estatus', component: EstatusComponent },
      { path: 'unidades', component: Unidades },
      { path: 'profile', component: Profile }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }