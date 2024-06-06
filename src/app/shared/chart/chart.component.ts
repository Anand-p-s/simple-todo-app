// import { AfterViewInit, Component, Input } from '@angular/core';
// import { ChartModule } from 'primeng/chart';
// import { Task } from '../../interfaces/task';

// @Component({
//   selector: 'app-chart',
//   standalone: true,
//   imports: [ChartModule],
//   templateUrl: './chart.component.html',
//   styleUrl: './chart.component.css',
// })
// export class ChartComponent implements AfterViewInit {
//   @Input() tasks: Task[] = [];
//   data: any;
//   options: any;
//   pendingTasks: Task[] = [];
//   completedTasks: Task[] = [];

//   ngOnInit() {
//     if (this.tasks) {
//       this.getStatistics();
//     }
//   }

//   ngAfterViewInit(): void {
//     let allTask = this.tasks.length;
//     let completedTask = this.completedTasks.length;
//     let PendingTask = this.pendingTasks.length;

//     const documentStyle = getComputedStyle(document.documentElement);
//     const textColor = documentStyle.getPropertyValue('--text-color');

//     this.data = {
//       labels: ['Total task', 'Completed', 'Pending'],
//       datasets: [
//         {
//           data: [allTask, completedTask, PendingTask],
//           backgroundColor: [
//             documentStyle.getPropertyValue('--blue-500'),
//             documentStyle.getPropertyValue('--green-500'),
//             documentStyle.getPropertyValue('--orange-500'),
//           ],
//           hoverBackgroundColor: [
//             documentStyle.getPropertyValue('--blue-400'),
//             documentStyle.getPropertyValue('--green-400'),
//             documentStyle.getPropertyValue('--orange-400'),
//           ],
//         },
//       ],
//     };

//     this.options = {
//       plugins: {
//         legend: {
//           labels: {
//             usePointStyle: true,
//             color: textColor,
//           },
//         },
//       },
//     };
//   }

//   getStatistics() {
//     this.pendingTasks = this.tasks.filter((task) => task.completed === false);
//     this.completedTasks = this.tasks.filter((task) => task.completed === true);
//   }
// }

import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Task } from '../../interfaces/task';
import { MeterGroupModule } from 'primeng/metergroup';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [ChartModule, MeterGroupModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() tasks: Task[] = [];
  data: any;
  options: any;
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];

  value: any = [ ];

  ngOnChanges(changes: SimpleChanges): void {
      if (this.tasks) {
        this.getStatistics();
      }
      
      let completedTask = this.completedTasks.length;
      let pendingTask = this.pendingTasks.length;

      this.value = [
        { label: 'Completed', color: '#34d399', value: completedTask },
        { label: 'Pending', color: '#fbbf24', value: pendingTask },
      ];
  }

  ngOnInit() {
    // if (this.tasks) {
    //   this.getStatistics();
    // }

    // console.log('chart init');
    
  }

  ngAfterViewInit(): void {
    console.log('chart after init');

    // if (this.tasks) {
    //   this.getStatistics();
    // }

    let allTask = this.tasks.length;
    let completedTask = this.completedTasks.length;
    let pendingTask = this.pendingTasks.length;

    // this.value = [
    //   { label: 'Completed', color: '#34d399', value: completedTask },
    //   { label: 'Pending', color: '#fbbf24', value: pendingTask },      
    // ];

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Tasks'],
      datasets: [
        {
          label: 'Total',
          data: [allTask],
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--blue-400'),
        },
        {
          label: 'Completed',
          data: [completedTask],
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--green-400'),
        },
        {
          label: 'Pending',
          data: [pendingTask],
          backgroundColor: documentStyle.getPropertyValue('--orange-500'),
          hoverBackgroundColor: documentStyle.getPropertyValue('--orange-400'),
        },
      ],
    };

    this.options = {
      indexAxis: 'y', // This makes the bar chart horizontal
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColor,
          },
        },
        y: {
          ticks: {
            color: textColor,
          },
        },
      },
    };
  }

  getStatistics() {
    this.pendingTasks = this.tasks.filter((task) => task.completed === false);
    this.completedTasks = this.tasks.filter((task) => task.completed === true);
  }
}
