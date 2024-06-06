import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-popup',
  standalone: true,
  imports: [DialogModule, CommonModule],
  templateUrl: './task-popup.component.html',
  styleUrl: './task-popup.component.css',
})
export class TaskPopupComponent {
  visible = true;
  @Input() tasks!:Task[];
}
