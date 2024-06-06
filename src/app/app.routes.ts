import { Routes } from '@angular/router';
import { TodosComponent } from './components/todos/todos.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'login'
    },
    {
        path: 'registration',
        component: RegistrationComponent,
        title: 'registration'
    },
    {
        path: 'todos/:userId',
        component: TodosComponent,
        title: 'To Dos',
        canActivate: [authGuard]
    }
];
