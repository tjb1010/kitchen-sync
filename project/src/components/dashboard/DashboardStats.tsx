import React from 'react';
import { CheckCircle2, ListTodo, ShoppingCart, Activity } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { useShoppingList } from '../../hooks/useShoppingList';
import { useNutrition } from '../../hooks/useNutrition';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../LoadingSpinner';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  name: string;
  value: number;
  total?: number;
  suffix?: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  path: string;
  loading?: boolean;
  onClick: () => void;
}

function StatCard({ name, value, total, suffix, icon: Icon, color, bgColor, loading, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-spotify-base rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center">
        <div className={`${bgColor} rounded-lg p-3`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{name}</p>
          {loading ? (
            <div className="mt-2">
              <LoadingSpinner size="sm" />
            </div>
          ) : (
            <p className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
              {total
                ? `${value}/${total}`
                : `${value}${suffix || ''}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function DashboardStats() {
  const { tasks, loading: tasksLoading } = useTasks();
  const { items: shoppingItems, loading: shoppingLoading } = useShoppingList();
  const { goal, loading: nutritionLoading } = useNutrition();
  const navigate = useNavigate();

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        name="Tasks Completed"
        value={tasks.filter(t => t.status === 'completed').length}
        total={tasks.length}
        icon={CheckCircle2}
        color="text-green-600 dark:text-green-400"
        bgColor="bg-green-100 dark:bg-green-900/50"
        path="/tasks"
        loading={tasksLoading}
        onClick={() => handleCardClick('/tasks')}
      />
      <StatCard
        name="Tasks In Progress"
        value={tasks.filter(t => t.status === 'in-progress').length}
        total={tasks.length}
        icon={ListTodo}
        color="text-blue-600 dark:text-blue-400"
        bgColor="bg-blue-100 dark:bg-blue-900/50"
        path="/tasks"
        loading={tasksLoading}
        onClick={() => handleCardClick('/tasks')}
      />
      <StatCard
        name="Shopping Items"
        value={shoppingItems.filter(item => item.completed).length}
        total={shoppingItems.length}
        icon={ShoppingCart}
        color="text-purple-600 dark:text-purple-400"
        bgColor="bg-purple-100 dark:bg-purple-900/50"
        path="/shopping"
        loading={shoppingLoading}
        onClick={() => handleCardClick('/shopping')}
      />
      <StatCard
        name="Daily Calories"
        value={goal?.dailyCalories || 0}
        suffix="kcal"
        icon={Activity}
        color="text-orange-600 dark:text-orange-400"
        bgColor="bg-orange-100 dark:bg-orange-900/50"
        path="/nutrition"
        loading={nutritionLoading}
        onClick={() => handleCardClick('/nutrition')}
      />
    </div>
  );
}