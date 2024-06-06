import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { StyleClassModule } from 'primeng/styleclass';
import { Sidebar } from 'primeng/sidebar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    RouterModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  @Output() onSideBarChange = new EventEmitter<string>();
  sidebarVisible: boolean = false;

  constructor(private router: Router) {}

  showTodo(e: any) {
    console.log('show todo');

    this.onSideBarChange.emit('todo');
    this.sidebarRef.close(e);
  }

  showStatistics(e: any) {
    this.onSideBarChange.emit('statistics');
    this.sidebarRef.close(e);
  }

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  logOut() {
    localStorage.setItem('userId', '');
    this.router.navigate(['/login']);
  }
}
