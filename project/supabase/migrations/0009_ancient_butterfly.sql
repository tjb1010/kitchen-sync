ALTER TABLE user_settings
ADD COLUMN theme text NOT NULL DEFAULT 'system',
ADD COLUMN date_format text NOT NULL DEFAULT 'MM/DD/YYYY',
ADD COLUMN week_starts_on smallint NOT NULL DEFAULT 0,
ADD COLUMN default_task_priority text NOT NULL DEFAULT 'medium',
ADD COLUMN default_view text NOT NULL DEFAULT 'dashboard',
ADD COLUMN shopping_list_sort text NOT NULL DEFAULT 'category',
ADD COLUMN notifications jsonb NOT NULL DEFAULT '{"taskReminders": true, "dueDateAlerts": true, "shoppingListUpdates": true}',
ADD CONSTRAINT valid_theme CHECK (theme IN ('light', 'dark', 'system')),
ADD CONSTRAINT valid_date_format CHECK (date_format IN ('MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD')),
ADD CONSTRAINT valid_week_starts_on CHECK (week_starts_on IN (0, 1)),
ADD CONSTRAINT valid_default_task_priority CHECK (default_task_priority IN ('low', 'medium', 'high')),
ADD CONSTRAINT valid_default_view CHECK (default_view IN ('dashboard', 'tasks', 'shopping', 'nutrition')),
ADD CONSTRAINT valid_shopping_list_sort CHECK (shopping_list_sort IN ('category', 'name', 'recent'));