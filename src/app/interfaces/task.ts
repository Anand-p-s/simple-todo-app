export interface Task {
  id?: string;
  title: string;
  createDate: Date;
  dueDate: Date | null;
  editedDate: Date;
  completed: boolean;
  userId: string | null;
}
