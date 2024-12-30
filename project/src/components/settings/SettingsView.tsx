import React from 'react';
import { Settings } from 'lucide-react';
import { PageHeader } from '../PageHeader';
import { ThemeSettings } from './ThemeSettings';
import { DateFormatSettings } from './DateFormatSettings';
import { WeekStartSettings } from './WeekStartSettings';
import { DefaultViewSettings } from './DefaultViewSettings';
import { NotificationSettings } from './NotificationSettings';

export function SettingsView() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Settings}
        title="Settings"
        tagline="Personalize your experience"
      />

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg divide-y dark:divide-gray-700">
        <div className="p-6">
          <ThemeSettings />
        </div>
        <div className="p-6">
          <DateFormatSettings />
        </div>
        <div className="p-6">
          <WeekStartSettings />
        </div>
        <div className="p-6">
          <DefaultViewSettings />
        </div>
        <div className="p-6">
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
}