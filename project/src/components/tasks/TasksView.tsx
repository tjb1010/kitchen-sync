import React, { useState } from 'react';
import { Task } from '../../types/tasks';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { ClipboardList, FolderPlus } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useTaskGroups } from '../../hooks/useTaskGroups';
import { PageHeader } from '../PageHeader';
import { LoadingSpinner } from '../LoadingSpinner';
import { TaskGroupSelector } from './TaskGroupSelector';
import { TaskGroupForm } from './TaskGroupForm';
import { Tooltip } from '../ui/Tooltip';
import { QuickAddTask } from './QuickAddTask';

export function TasksView() {
  const { tasks, loading, error, createTask, updateTask } = useTasks();
  const { groups, loading: groupsLoading, createGroup, updateGroup } = useTaskGroups();
  const [showForm, setShowForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingGroup, setEditingGroup] = useState<TaskGroup | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<string>();

  const handleStatusChange = (id: string, updates: { status?: Task['status']; groupId?: string | null }) => {
    updateTask(id, updates);
  };

  const handleCreateTask = async (taskData: Omit<Task, 'id'>) => {
    await createTask({ ...taskData, groupId: selectedGroupId });
    setShowForm(false);
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id'>) => {
    if (!editingTask) return;
    await updateTask(editingTask.id, taskData);
    setEditingTask(null);
  };

  const handleCreateGroup = async (name: string, description: string, color: string) => {
    await createGroup(name, description, color);
    setShowGroupForm(false);
    setEditingGroup(null);
  };

  const handleUpdateGroup = async (name: string, description: string, color: string) => {
    if (!editingGroup) return;
    await updateGroup(editingGroup.id, { name, description, color });
    setEditingGroup(null);
  };

  if (loading || groupsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/50 p-4 rounded-md">
        <div className="text-red-700 dark:text-red-200">Error: {error.message}</div>
      </div>
    );
  }

  const filteredTasks = selectedGroupId
    ? tasks.filter(task => task.groupId === selectedGroupId)
    : tasks;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader
          icon={ClipboardList}
          title="Tasks"
          tagline="Stay organized and track your progress"
        />
        <div className="flex items-center space-x-2">
          <Tooltip content="Create new task group">
            <button
              onClick={() => setShowGroupForm(true)}
              className="btn-spotify-outline"
            >
              <FolderPlus className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
      </div>

      <TaskGroupSelector
        groups={groups}
        selectedGroupId={selectedGroupId}
        onSelectGroup={setSelectedGroupId}
        onCreateGroup={() => setShowGroupForm(true)}
        onEditGroup={setEditingGroup}
      />

      <QuickAddTask
        onAdd={async (title) => {
          await createTask({
            title,
            status: 'todo',
            priority: 'medium',
            category: 'general',
            groupId: selectedGroupId
          });
        }}
        placeholder="Add new task..."
      />

      {(showForm || editingTask) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h3>
            <TaskForm
              selectedGroupId={selectedGroupId}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
              initialTask={editingTask || undefined}
            />
          </div>
        </div>
      )}

      {(showGroupForm || editingGroup) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 dark:bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              {editingGroup ? 'Edit Task Group' : 'Create Task Group'}
            </h3>
            <TaskGroupForm
              onSubmit={editingGroup ? handleUpdateGroup : handleCreateGroup}
              onCancel={() => {
                setShowGroupForm(false);
                setEditingGroup(null);
              }}
              initialGroup={editingGroup || undefined}
            />
          </div>
        </div>
      )}

      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onEditTask={setEditingTask}
        selectedGroup={groups.find(g => g.id === selectedGroupId)}
      />
    </div>
  );
}