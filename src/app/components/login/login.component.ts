import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CheckboxModule,
    StyleClassModule,
    ButtonModule,
    InputTextModule,
    RouterModule,
    PasswordModule,
    FormsModule,
    FloatLabelModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';

  constructor(private us: UserService, private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('userId')) {
      this.router.navigate([`/todos/${localStorage.getItem('userId')}`]);
    }
  }

  login() {
    this.us.getUserByUsername(this.userName).subscribe((result: User[]) => {
      console.log(result);

      if (result.length > 0) {
        if (this.password === result[0].password) {
          if (result[0].id) {
            localStorage.setItem('userId', result[0].id);
            this.router.navigate([`/todos/${result[0].id}`]);
          }
        } else {
          alert('Invalid credentials!');
          this.userName = '';
          this.password = '';
        }
      } else {
        alert('Invalid credentials!');
        this.userName = '';
        this.password = '';
      }
    });
  }
}
