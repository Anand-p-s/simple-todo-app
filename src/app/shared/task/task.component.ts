import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { CommonModule, DatePipe } from '@angular/common';
import { Task } from '../../interfaces/task';
import { FormsModule } from '@angular/forms';
import { Filter } from '../../components/todos/todos.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    CardModule,
    CheckboxModule,
    ButtonModule,
    TagModule,
    MenuModule,
    PanelModule,
    CommonModule,
    DatePipe,
    FormsModule,
    DividerModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnChanges, OnInit {
  tasksToDisplay!: Task[];
  @Input() tasks!: Task[];
  @Input() selectedFilter: Filter | undefined;
  @Output() onCheck = new EventEmitter<Task>();
  @Output() onDelete = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<Task>();
  @Output() onClone = new EventEmitter<Task>();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.applyFilter();
  }

  applyFilter() {
    switch (this.selectedFilter?.value) {
      case 'this week':
        this.tasksToDisplay = this.tasks.filter((task) => {
          const today = new Date();
          const endOfWeek = this.getEndOfWeek(today);

          if (task.dueDate) {
            return (
              new Date(task.dueDate).setHours(0, 0, 0, 0) >=
                today.setHours(0, 0, 0, 0) &&
              new Date(task.dueDate).setHours(0, 0, 0, 0) <=
                endOfWeek.setHours(0, 0, 0, 0)
            );
          } else {
            return;
          }
        });
        break;

      case 'this month':
        this.tasksToDisplay = this.tasks.filter((task) => {
          const today = new Date();
          const endOfMonth = this.getEndOfMonth(today);

          if (task.dueDate) {
            return (
              new Date(task.dueDate).setHours(0, 0, 0, 0) >=
                today.setHours(0, 0, 0, 0) &&
              new Date(task.dueDate).setHours(0, 0, 0, 0) <=
                endOfMonth.setHours(0, 0, 0, 0)
            );
          } else {
            return;
          }
        });
        break;

      case 'all':
        this.tasksToDisplay = this.tasks;
        break;
    }
  }

  getEndOfWeek(date: any) {
    let endOfWeek = new Date(date);
    let day = endOfWeek.getDay();
    let diff = 6 - day;
    endOfWeek.setDate(endOfWeek.getDate() + diff);
    endOfWeek.setHours(23, 59, 59, 999);
    return endOfWeek;
  }

  getEndOfMonth(date: any) {
    let endOfMonth = new Date(date);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);
    return endOfMonth;
  }

  onChange(taskId: string | undefined) {
    let task = this.tasks.filter((task) => task.id === taskId);
    this.onCheck.emit(task[0]);
  }

  edit(taskId?: string) {
    let task = this.tasks.filter((task) => task.id === taskId);
    this.onEdit.emit(task[0]);
  }

  clone(taskId?: string) {
    let task = this.tasks.filter((task) => task.id === taskId);
    this.onClone.emit(task[0]);
  }

  delete(taskId?: string) {
    this.onDelete.emit(taskId);
  }

  getMenuItems(taskId?: string): any[] {
    return [
      {
        label: 'Edit',
        icon: 'pi pi-pencil',
        command: () => this.edit(taskId),
      },
      {
        label: 'Clone',
        icon: 'pi pi-clone',
        command: () => this.clone(taskId),
      },
      {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => this.delete(taskId),
      },
    ];
  }

  onMenuButtonClick(menu: any, event: Event) {
    menu.toggle(event);
  }
}
