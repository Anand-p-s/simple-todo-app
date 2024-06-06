import { Component, EventEmitter, Output } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CheckboxModule,
    StyleClassModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  user: User = {
    userName: '',
    email: '',
    password: '',
  };
  confirmPwd!: string;

  constructor(private us: UserService, private router: Router) {}

  onSubmit() {
    if (this.user) {
      this.us
        .getUserByUsername(this.user.userName)
        .subscribe((result: User[]) => {
          if (result.length > 0) {
            alert('username already exists');
            this.user.userName = '';
          } else {
            if (this.user.password === this.confirmPwd) {
              this.us.userReg(this.user).subscribe(() => {
                alert('Successfully registered');
                this.router.navigate(['/login']);
              });
            } else {
              alert('check password');
              this.user.password = '';
              this.confirmPwd = '';
            }
          }
        });
    }
  }
}
