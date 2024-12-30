import { useState, useEffect } from 'react';
import { UserSettings, getUserSettings, updateUserSettings } from '../lib/settings';

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await getUserSettings();
      setSettings(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load settings'));
    } finally {
      setLoading(false);
    }
  }

  async function updateSettings(newSettings: Partial<UserSettings>) {
    try {
      const updated = await updateUserSettings(newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update settings'));
      throw err;
    }
  }

  return {
    settings,
    loading,
    error,
    updateSettings
  };
}