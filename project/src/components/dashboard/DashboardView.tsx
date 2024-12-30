import React from 'react';
import { Layout } from 'lucide-react';
import { PageHeader } from '../PageHeader';
import { DashboardStats } from './DashboardStats';
import { DashboardTasks } from './DashboardTasks';
import { DashboardNutrition } from './DashboardNutrition';
import { DashboardShopping } from './DashboardShopping';

export function DashboardView() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Layout}
        title="Dashboard"
        tagline="Your personal command center, everything at a glance"
      />
      
      <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardTasks />
        <DashboardNutrition />
      </div>
      <DashboardShopping />
    </div>
  );
}