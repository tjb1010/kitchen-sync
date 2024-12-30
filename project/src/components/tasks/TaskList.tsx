import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Task, TaskGroup } from '../../types/tasks';
import { TaskCard } from './TaskCard';
import { useTaskGroups } from '../../hooks/useTaskGroups';

interface TaskUpdate {
  status?: Task['status'];
  groupId?: string | null;
}

interface TaskListProps {
  tasks: Task[];
  onStatusChange: (id: string, updates: TaskUpdate) => void;
  onEditTask: (task: Task) => void;
  selectedGroup?: TaskGroup;
}

export function TaskList({ tasks, onStatusChange, onEditTask, selectedGroup }: TaskListProps) {
  const [columns, setColumns] = useState<Record<string, Task[]>>({
    todo: [],
    'in-progress': [],
    completed: []
  });
  const { groups } = useTaskGroups();

  useEffect(() => {
    const filteredTasks = selectedGroup
      ? tasks.filter(task => task.groupId === selectedGroup.id)
      : tasks;

    setColumns({
      todo: filteredTasks.filter(task => task.status === 'todo'),
      'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
      completed: filteredTasks.filter(task => task.status === 'completed')
    });
  }, [tasks, selectedGroup]);

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    
    if (!destination) return;

    // Handle dragging between groups
    if (result.type === 'GROUP') {
      const task = tasks.find(t => t.id === result.draggableId);
      if (task) {
        onStatusChange(task.id, {
          groupId: destination.droppableId === 'no-group' ? null : destination.droppableId
        });
      }
      return;
    }
    
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];
    const task = start[source.index];

    // Moving within the same column
    if (source.droppableId === destination.droppableId) {
      const newTasks = Array.from(start);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, task);

      setColumns({
        ...columns,
        [source.droppableId]: newTasks
      });
    } else {
      // Moving to a different column
      const startTasks = Array.from(start);
      startTasks.splice(source.index, 1);
      const finishTasks = Array.from(finish);
      finishTasks.splice(destination.index, 0, task);

      setColumns({
        ...columns,
        [source.droppableId]: startTasks,
        [destination.droppableId]: finishTasks
      });

      // Update task status in backend
      onStatusChange(task.id, {
        status: destination.droppableId as Task['status'],
        groupId: selectedGroup?.id
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([status, statusTasks]) => (
            <div key={status} className="bg-gray-50 dark:bg-spotify-base p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-4 capitalize text-gray-900 dark:text-gray-100">
                {status.replace('-', ' ')}
              </h2>
              <Droppable droppableId={status} type="STATUS">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`space-y-4 min-h-[200px] transition-colors ${
                      snapshot.isDraggingOver ? 'bg-spotify-hover rounded-lg p-4' : ''
                    }`}
                  >
                    {statusTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`${snapshot.isDragging ? 'opacity-50' : ''} transition-all`}
                          >
                            <TaskCard
                              task={task}
                              onStatusChange={(id, status) => onStatusChange(id, { status })}
                              onEdit={onEditTask}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    {statusTasks.length === 0 && !snapshot.isDraggingOver && (
                      <p className="text-center text-spotify-light py-4">
                        No tasks
                      </p>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Droppable droppableId="no-group" type="GROUP">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-gray-50 dark:bg-spotify-base p-4 rounded-lg ${
                  snapshot.isDraggingOver ? 'ring-2 ring-spotify-green' : ''
                }`}
              >
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                  Ungrouped Tasks
                </h3>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {groups.map(group => (
            <Droppable key={group.id} droppableId={group.id} type="GROUP">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-gray-50 dark:bg-spotify-base p-4 rounded-lg ${
                    snapshot.isDraggingOver ? 'ring-2 ring-spotify-green' : ''
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    {group.name}
                  </h3>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </DragDropContext>
  );
}