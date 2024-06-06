import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  taskApiUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  addTask(data: Task) {
    return this.http.post(this.taskApiUrl, data);
  }

  deleteTask(taskId?: string) {
    return this.http.delete(this.taskApiUrl + '/' + taskId);
  }
  
  updateTask(task: Task) {
    return this.http.put(this.taskApiUrl + '/' + task.id, task);
  }

  getTasksByUserId(userId: string | null): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskApiUrl + '?userId=' + userId);
  }

  getTaskById(id?: string) {
    return this.http.get(this.taskApiUrl + '/' + id);
  }
}
