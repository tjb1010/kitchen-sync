export interface TaskGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  category: 'general' | 'personal' | 'work' | 'shopping';
  groupId?: string;
}

export type TaskCategory = Task['category'];
export type TaskPriority = Task['priority'];
export type TaskStatus = Task['status'];

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}