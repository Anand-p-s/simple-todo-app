import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    CalendarModule,
    FormsModule,
    CardModule,
    CommonModule,
    DialogModule
  ],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.css',
})
export class TaskModalComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() editMode: boolean = false;
  @Input() userId!: string | null;
  @Output() close = new EventEmitter();
  dueDate!: Date | null;
  @Input() task!: Task;

  constructor(private ts: TaskService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
   
  }

  closeModal() {
    this.task.title = '';
    this.visible = false;
    this.close.emit();
  }

  onSubmit() {
    // console.log('due date before', this.dueDate); 
    // console.log('create date', this.task.createDate);
    
    this.task.dueDate = this.dueDate;  
    console.log('due date after assigning', this.task.dueDate);
    

    if (this.editMode) {
      this.editTask();
    } else {
      this.addTask();
    }
  }

  addTask() {    
    this.task.userId = this.userId;

    this.ts.addTask(this.task).subscribe((result) => {
      // console.log(this.task);
      this.task.title = '';
      this.dueDate = null;
      alert('Task added');
      this.closeModal();
    });
  }

  editTask() {
    this.task.editedDate = new Date();
    this.ts.updateTask(this.task).subscribe(() => {
      this.task.title = '';
      this.dueDate = null;
      alert('Task Edited');
      this.closeModal();
    });
  }
}
