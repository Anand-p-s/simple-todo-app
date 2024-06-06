import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';
import { TaskModalComponent } from '../../shared/task-modal/task-modal.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { CheckboxModule } from 'primeng/checkbox';
import { TaskComponent } from '../../shared/task/task.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../../interfaces/task';
import { DividerModule } from 'primeng/divider';
import { TaskPopupComponent } from '../../shared/task-popup/task-popup.component';
import { ChartComponent } from '../../shared/chart/chart.component';

export interface Filter {
  name: string;
  value: string;
}

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    TabViewModule,
    CommonModule,
    TaskModalComponent,
    ButtonModule,
    DropdownModule,
    FormsModule,
    AccordionModule,
    CheckboxModule,
    TaskComponent,
    SidebarComponent,
    DividerModule,
    TaskPopupComponent,
    ChartComponent,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent implements OnInit {
  tasks: Task[] = [];
  pendingTasks!: Task[];
  completedTasks: Task[] = [];
  todayTasks: Task[] = [];
  task: Task = {
    title: '',
    dueDate: new Date(),
    createDate: new Date(),
    editedDate: new Date(),
    completed: false,
    userId: '',
  };

  userId!: string | null;
  visible: boolean = false;
  editMode: boolean = false;
  chart: boolean = false;

  filters: Filter[] | undefined;
  selectedFilter: Filter = {
    name: 'All',
    value: 'all',
  };

  constructor(private ts: TaskService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.filters = [
      {
        name: 'All',
        value: 'all',
      },
      {
        name: 'This week',
        value: 'this week',
      },
      {
        name: 'This month',
        value: 'this month',
      },
    ];
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('userId');
      this.getTaskByUserId();
    });
  }

  onCheck(e: Task) {
    this.ts.updateTask(e).subscribe(() => {
      this.getTaskByUserId();
    });
  }

  showModal(): void {
    this.visible = true;
  }

  closeModal(): void {
    this.visible = false;
    this.editMode = false;
    this.getTaskByUserId();
  }

  getTaskByUserId() {
    this.ts.getTasksByUserId(this.userId).subscribe((result: Task[]) => {
      this.tasks = result;
      this.pendingTasks = this.tasks.filter((task) => task.completed == false);
      this.completedTasks = this.tasks.filter((task) => task.completed == true);

      const today = new Date().setHours(0, 0, 0, 0);
      this.todayTasks = this.tasks.filter((task) => {
        if (task.dueDate) {
          return new Date(task.dueDate).setHours(0, 0, 0, 0) === today;
        } else {
          return;
        }        
      });
    });
  }

  addTask(e: Task) {
    e.id = undefined;
    console.log(e.id);
    
    this.ts.addTask(e).subscribe(() => {
      this.getTaskByUserId();
    });
  }

  deleteTask(e: string) {
    if (confirm('Do you want to delete?')) {
      this.ts.deleteTask(e).subscribe(() => {
        alert('Task deleted');
        this.getTaskByUserId();
      });
    }
  }

  editTask(e: Task) {
    this.showModal();
    this.editMode = true;
    this.task = e;
  }

  showWhichPanel(e: any) {    
    if (e == 'todo') {
      this.chart = false;
    } else {
      this.chart = true;
    }
  }
}
