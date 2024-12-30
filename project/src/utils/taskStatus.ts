import { isAfter, isSameDay, startOfDay } from 'date-fns';

export function getDueDateStatus(dueDate: Date | undefined): 'overdue' | 'dueToday' | 'upcoming' | 'none' {
  if (!dueDate) return 'none';
  
  const now = new Date();
  const today = startOfDay(now);
  const dueDateStart = startOfDay(dueDate);

  if (isSameDay(dueDateStart, today)) {
    return 'dueToday';
  }
  
  return isAfter(today, dueDateStart) ? 'overdue' : 'upcoming';
}